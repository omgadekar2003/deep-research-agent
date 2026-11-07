// "use client";

// import { useState } from "react";
// import { Search, Loader2 } from "lucide-react";
// import { api } from "@/lib/api";
// import { ResearchRun } from "@/lib/types";


// import { Mic, Loader2, Square } from "lucide-react"; // Add icons
// import { useRef, useState } from "react";


// interface Props {
//   onStarted: (run: ResearchRun) => void;
//   disabled?: boolean;
// }

// export default function ResearchForm({ onStarted, disabled }: Props) {
//   const [question, setQuestion] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (question.trim().length < 10) {
//       setError("Question must be at least 10 characters");
//       return;
//     }
//     setError(null);
//     setLoading(true);
//     try {
//       const run = await api.startResearch(question.trim());
//       onStarted(run);
//       setQuestion("");
//     } catch (e: any) {
//       setError(e.message || "Failed to start research");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-3">
//       <textarea
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//         placeholder="Ask a research question... e.g. What are the latest breakthroughs in solid-state batteries?"
//         rows={4}
//         disabled={disabled || loading}
//         className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-60"
//       />

//       {error && (
//         <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
//       )}

//       <div className="flex items-center gap-2">
//         <button
//           type="submit"
//           disabled={disabled || loading || question.trim().length < 10}
//           className="flex items-center gap-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-5 py-2.5 font-medium disabled:opacity-50"
//         >
//           {loading ? (
//             <Loader2 className="w-4 h-4 animate-spin" />
//           ) : (
//             <Search className="w-4 h-4" />
//           )}
//           {loading ? "Starting..." : "Start Research"}
//         </button>
//         <span className="text-xs text-zinc-500">
//           Takes 1–3 minutes. Uses live web search.
//         </span>
//       </div>
//     </form>
//   );
// }



"use client";

import { useState, useRef } from "react";
import { Search, Loader2, Mic } from "lucide-react";
import { api } from "@/lib/api";
import { ResearchRun } from "@/lib/types";
import { getAccessToken, API_URL } from "@/lib/api";

interface Props {
  onStarted: (run: ResearchRun) => void;
  disabled?: boolean;
}

export default function ResearchForm({ onStarted, disabled }: Props) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (question.trim().length < 10) {
      setError("Question must be at least 10 characters");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const run = await api.startResearch(question.trim());
      onStarted(run);
      setQuestion("");
    } catch (e: any) {
      setError(e.message || "Failed to start research");
    } finally {
      setLoading(false);
    }
  }

  // --- Voice Recording Logic ---

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        setIsTranscribing(true);

        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("file", audioBlob, "recording.webm");

        try {
          const token = getAccessToken();
          const res = await fetch(`${API_URL}/research/transcribe`, {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            const errText = await res.text();
            throw new Error(errText || "Transcription failed");
          }

          const data = await res.json();
          if (data.text) {
            setQuestion((prev) => (prev ? `${prev} ${data.text}` : data.text));
          }
        } catch (err: any) {
          setError(err.message || "Voice transcription failed");
        } finally {
          setIsTranscribing(false);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError(null);
    } catch (err) {
      setError("Microphone access denied. Please allow mic permissions.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current?.stream.getTracks().forEach((track) => track.stop());
  };

  // --- Render ---

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <div className="relative">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a research question... e.g. What are the latest breakthroughs in solid-state batteries?"
          rows={4}
          disabled={disabled || loading || isTranscribing}
          className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none disabled:opacity-60"
        />

        {/* Microphone Button (Absolute positioned inside textarea area) */}
        <button
  type="button"
  onClick={isRecording ? stopRecording : startRecording}
  disabled={disabled || loading || isTranscribing}
  aria-label={isRecording ? "Stop recording" : "Start voice input"}
  className={`absolute bottom-3 right-3 flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-zinc-900 disabled:opacity-50 ${
    isRecording
      ? "bg-red-500 hover:bg-red-600 text-white ring-2 ring-red-500/40 focus:ring-red-500 shadow-lg shadow-red-500/30"
      : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 focus:ring-zinc-400"
  }`}
  title={isRecording ? "Stop recording" : "Start voice input"}
>
  {isTranscribing ? (
    <Loader2 className="w-5 h-5 animate-spin text-zinc-500 dark:text-zinc-400" />
  ) : isRecording ? (
    // Solid white square (stop icon) with a subtle pulse ring around the button
    <span className="relative flex items-center justify-center w-full h-full">
      <span className="absolute inline-flex w-full h-full rounded-full bg-red-500 opacity-60 animate-ping" />
      <span className="relative inline-flex w-3 h-3 rounded-[2px] bg-white" />
    </span>
  ) : (
    <Mic className="w-5 h-5" />
  )}
</button>
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
      )}

      <div className="flex items-center gap-2">
        <button
          type="submit"
          disabled={disabled || loading || question.trim().length < 10}
          className="flex items-center gap-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-5 py-2.5 font-medium disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
          {loading ? "Starting..." : "Start Research"}
        </button>
        <span className="text-xs text-zinc-500">
          Takes 1–3 minutes. Uses live web search.
        </span>
      </div>
    </form>
  );
}
