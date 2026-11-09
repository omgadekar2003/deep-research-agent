// "use client";

// import { useEffect, useState } from "react";
// import { Loader2, Check, AlertCircle, ChevronRight } from "lucide-react";
// import { SSEEvent } from "@/lib/types";
// import { getAccessToken, API_URL } from "@/lib/api";

// interface Props {
//   runId: number;
//   onComplete: (status: string) => void;
// }

// export default function ProgressStream({ runId, onComplete }: Props) {
//   const [events, setEvents] = useState<SSEEvent[]>([]);
//   const [done, setDone] = useState(false);

//   useEffect(() => {
//     let cancelled = false;
//     const token = getAccessToken();
//     if (!token) return;

//     (async () => {
//       try {
//         const r = await fetch(`${API_URL}/research/${runId}/stream`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!r.ok || !r.body) {
//           setEvents((prev) => [
//             ...prev,
//             { node: "error", message: `Stream failed: ${r.status}`, fatal: true },
//           ]);
//           setDone(true);
//           onComplete("failed");
//           return;
//         }

//         const reader = r.body.getReader();
//         const decoder = new TextDecoder();
//         let buffer = "";

//         while (!cancelled) {
//           const { done: streamDone, value } = await reader.read();
//           if (streamDone) break;
//           buffer += decoder.decode(value, { stream: true });

//           const parts = buffer.split("\n\n");
//           buffer = parts.pop() || "";

//           for (const chunk of parts) {
//             const line = chunk.trim();
//             if (!line.startsWith("data: ")) continue;
//             try {
//               const event: SSEEvent = JSON.parse(line.slice(6));
//               setEvents((prev) => [...prev, event]);
//               if (event.node === "done") {
//                 setDone(true);
//                 onComplete(event.status || "completed");
//                 return;
//               }
//               if (event.node === "error" && event.fatal) {
//                 setDone(true);
//                 onComplete("failed");
//                 return;
//               }
//             } catch {}
//           }
//         }
//       } catch (e) {
//         if (!cancelled) {
//           setEvents((prev) => [
//             ...prev,
//             {
//               node: "error",
//               message: e instanceof Error ? e.message : "Stream error",
//               fatal: true,
//             },
//           ]);
//           setDone(true);
//           onComplete("failed");
//         }
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, [runId, onComplete]);

//   return (
//     <div className="flex flex-col gap-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
//       <div className="flex items-center gap-2 text-sm font-medium">
//         {!done ? (
//           <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
//         ) : (
//           <Check className="w-4 h-4 text-green-500" />
//         )}
//         {done ? "Complete" : "Running pipeline..."}
//       </div>

//       <div className="flex flex-col gap-1 pl-6 text-sm">
//         {events.map((ev, i) => {
//           const isFatal = ev.node === "error" && ev.fatal;
//           const Icon = isFatal ? AlertCircle : ChevronRight;
//           const color = isFatal
//             ? "text-red-500"
//             : ev.node === "done"
//             ? "text-green-500"
//             : "text-zinc-400";
//           return (
//             <div key={i} className="flex items-start gap-2">
//               <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${color}`} />
//               <span>
//                 <span className="font-mono text-xs text-zinc-500">
//                   [{ev.node}]
//                 </span>{" "}
//                 <span>{ev.message || ""}</span>
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }





// "use client";

// import { useEffect, useState } from "react";
// import {
//   Loader2,
//   Check,
//   AlertCircle,
//   Brain,
//   Search,
//   BookOpen,
//   ShieldCheck,
//   GitBranch,
//   FileText,
//   XCircle,
// } from "lucide-react";
// import { SSEEvent } from "@/lib/types";
// import { getAccessToken, API_URL } from "@/lib/api";

// interface Props {
//   runId: number;
//   onComplete: (status: string) => void;
// }

// const NODE_META: Record<
//   string,
//   { icon: any; label: string; color: string }
// > = {
//   planner: { icon: Brain, label: "Planning", color: "text-blue-500" },
//   searcher: { icon: Search, label: "Searching", color: "text-purple-500" },
//   reader: { icon: BookOpen, label: "Reading", color: "text-orange-500" },
//   verifier: { icon: ShieldCheck, label: "Verifying", color: "text-green-500" },
//   decider: { icon: GitBranch, label: "Deciding", color: "text-cyan-500" },
//   writer: { icon: FileText, label: "Writing", color: "text-pink-500" },
//   done: { icon: Check, label: "Complete", color: "text-green-500" },
//   error: { icon: XCircle, label: "Error", color: "text-red-500" },
// };

// export default function ProgressStream({ runId, onComplete }: Props) {
//   const [events, setEvents] = useState<SSEEvent[]>([]);
//   const [done, setDone] = useState(false);

//   useEffect(() => {
//     let cancelled = false;
//     const token = getAccessToken();
//     if (!token) return;

//     (async () => {
//       try {
//         const r = await fetch(`${API_URL}/research/${runId}/stream`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!r.ok || !r.body) {
//           setEvents((prev) => [
//             ...prev,
//             { node: "error", message: `Stream failed (${r.status})`, fatal: true },
//           ]);
//           setDone(true);
//           onComplete("failed");
//           return;
//         }

//         const reader = r.body.getReader();
//         const decoder = new TextDecoder();
//         let buffer = "";

//         while (!cancelled) {
//           const { done: streamDone, value } = await reader.read();
//           if (streamDone) break;
//           buffer += decoder.decode(value, { stream: true });

//           const parts = buffer.split("\n\n");
//           buffer = parts.pop() || "";

//           for (const chunk of parts) {
//             const line = chunk.trim();
//             if (!line.startsWith("data: ")) continue;
//             try {
//               const event: SSEEvent = JSON.parse(line.slice(6));
//               setEvents((prev) => [...prev, event]);
//               if (event.node === "done") {
//                 setDone(true);
//                 onComplete(event.status || "completed");
//                 return;
//               }
//               if (event.node === "error" && event.fatal) {
//                 setDone(true);
//                 onComplete("failed");
//                 return;
//               }
//             } catch {}
//           }
//         }
//       } catch (e) {
//         if (!cancelled) {
//           setEvents((prev) => [
//             ...prev,
//             {
//               node: "error",
//               message: e instanceof Error ? e.message : "Stream error",
//               fatal: true,
//             },
//           ]);
//           setDone(true);
//           onComplete("failed");
//         }
//       }
//     })();

//     return () => {
//       cancelled = true;
//     };
//   }, [runId, onComplete]);

//   return (
//     <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
//       {/* Header */}
//       <div className="flex items-center gap-2 px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
//         {!done ? (
//           <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
//         ) : (
//           <Check className="w-4 h-4 text-green-500" />
//         )}
//         <span className="text-sm font-medium">
//           {done ? "Pipeline complete" : "Agent is working..."}
//         </span>
//       </div>

//       {/* Timeline */}
//       <div className="p-6 space-y-3">
//         {events.map((ev, i) => {
//           const meta = NODE_META[ev.node] || NODE_META.error;
//           const Icon = meta.icon;
//           const isFatal = ev.node === "error" && ev.fatal;
//           return (
//             <div
//               key={i}
//               className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
//               style={{ animationDelay: `${i * 30}ms` }}
//             >
//               <div
//                 className={`shrink-0 mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 ${
//                   isFatal ? "text-red-500" : meta.color
//                 }`}
//               >
//                 <Icon className="w-4 h-4" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
//                   {meta.label}
//                 </p>
//                 <p className="text-sm text-zinc-900 dark:text-zinc-100 leading-snug">
//                   {ev.message || ""}
//                 </p>
//                 {ev.errors && ev.errors.length > 0 && (
//                   <div className="mt-1 space-y-0.5">
//                     {ev.errors.map((err, j) => (
//                       <div
//                         key={j}
//                         className="flex items-start gap-1.5 text-xs text-amber-600 dark:text-amber-400"
//                       >
//                         <AlertCircle className="w-3 h-3 shrink-0 mt-0.5" />
//                         <span>
//                           {err.node}: {err.error}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }




// v3:

"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  Check,
  Brain,
  Search,
  BookOpen,
  ShieldCheck,
  GitBranch,
  FileText,
  XCircle,
} from "lucide-react";
import { SSEEvent } from "@/lib/types";
import { getAccessToken, API_URL } from "@/lib/api";

interface Props {
  runId: number;
  onComplete: (status: string) => void;
}

const NODE_META: Record<
  string,
  { icon: any; label: string; color: string }
> = {
  planner: { icon: Brain, label: "Planning", color: "text-blue-500" },
  searcher: { icon: Search, label: "Searching", color: "text-purple-500" },
  reader: { icon: BookOpen, label: "Reading", color: "text-orange-500" },
  verifier: { icon: ShieldCheck, label: "Verifying", color: "text-green-500" },
  decider: { icon: GitBranch, label: "Deciding", color: "text-cyan-500" },
  writer: { icon: FileText, label: "Writing", color: "text-pink-500" },
  done: { icon: Check, label: "Complete", color: "text-green-500" },
  error: { icon: XCircle, label: "Error", color: "text-red-500" },
};

export default function ProgressStream({ runId, onComplete }: Props) {
  const [events, setEvents] = useState<SSEEvent[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const token = getAccessToken();
    if (!token) return;

    (async () => {
      try {
        const r = await fetch(`${API_URL}/research/${runId}/stream`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!r.ok || !r.body) {
          setEvents((prev) => [
            ...prev,
            { node: "error", message: "Unable to connect to research service.", fatal: true },
          ]);
          setDone(true);
          onComplete("failed");
          return;
        }

        const reader = r.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (!cancelled) {
          const { done: streamDone, value } = await reader.read();
          if (streamDone) break;
          buffer += decoder.decode(value, { stream: true });

          const parts = buffer.split("\n\n");
          buffer = parts.pop() || "";

          for (const chunk of parts) {
            const line = chunk.trim();
            if (!line.startsWith("data: ")) continue;
            try {
              const event: SSEEvent = JSON.parse(line.slice(6));
              setEvents((prev) => [...prev, event]);
              if (event.node === "done") {
                setDone(true);
                onComplete(event.status || "completed");
                return;
              }
              if (event.node === "error" && event.fatal) {
                setDone(true);
                onComplete("failed");
                return;
              }
            } catch {}
          }
        }
      } catch (e) {
        if (!cancelled) {
          setEvents((prev) => [
            ...prev,
            {
              node: "error",
              message: "The research run could not complete. Please try again.",
              fatal: true,
            },
          ]);
          setDone(true);
          onComplete("failed");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [runId, onComplete]);

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50">
        {!done ? (
          <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
        ) : (
          <Check className="w-4 h-4 text-green-500" />
        )}
        <span className="text-sm font-medium">
          {done ? "Pipeline complete" : "Agent is working..."}
        </span>
      </div>

      {/* Timeline */}
      <div className="p-6 space-y-3">
        {events.map((ev, i) => {
          const meta = NODE_META[ev.node] || NODE_META.error;
          const Icon = meta.icon;
          const isFatal = ev.node === "error" && ev.fatal;

          // Friendly message — never show raw backend error text
          const displayMessage =
            ev.node === "error"
              ? "Something went wrong. Please try again."
              : ev.message || "";

          return (
            <div
              key={i}
              className="flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div
                className={`shrink-0 mt-0.5 w-7 h-7 rounded-lg flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 ${
                  isFatal ? "text-red-500" : meta.color
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                  {meta.label}
                </p>
                <p className="text-sm text-zinc-900 dark:text-zinc-100 leading-snug">
                  {displayMessage}
                </p>
                {/* Raw errors intentionally hidden — no ev.errors rendering */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}