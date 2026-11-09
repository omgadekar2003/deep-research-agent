// import Link from "next/link";
// import { Sparkles, ArrowRight } from "lucide-react";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center px-6">
//       <main className="max-w-2xl w-full flex flex-col items-center gap-8 py-24">
//         <div className="flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-1.5 text-sm">
//           <Sparkles className="w-4 h-4 text-blue-500" />
//           <span>Autonomous AI research</span>
//         </div>

//         <h1 className="text-5xl font-bold text-center tracking-tight">
//           Deep Research Agent
//         </h1>

//         <p className="text-lg text-zinc-600 dark:text-zinc-400 text-center max-w-xl">
//           Ask any question. The agent plans searches, reads multiple sources,
//           verifies claims, and produces a cited report — automatically.
//         </p>

//         <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//           <Link
//             href="/signup"
//             className="flex items-center justify-center gap-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-3 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
//           >
//             Get Started
//             <ArrowRight className="w-4 h-4" />
//           </Link>
//           <Link
//             href="/login"
//             className="flex items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-700 px-6 py-3 font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
//           >
//             Login
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-12">
//           {[
//             { title: "Plan", desc: "Breaks questions into sub-queries" },
//             { title: "Verify", desc: "Cross-checks claims across sources" },
//             { title: "Cite", desc: "Every fact linked to a source" },
//           ].map((f) => (
//             <div
//               key={f.title}
//               className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900"
//             >
//               <h3 className="font-semibold mb-1">{f.title}</h3>
//               <p className="text-sm text-zinc-600 dark:text-zinc-400">{f.desc}</p>
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }

// "use client";
// // export const instant = false;

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import ResearchForm from "@/components/ResearchForm";
// import ProgressStream from "@/components/ProgressStream";
// import { ResearchRun } from "@/lib/types";

// export default function NewResearchPage() {
//   const router = useRouter();
//   const [run, setRun] = useState<ResearchRun | null>(null);

//   function handleComplete(status: string) {
//     if (status === "completed" && run) {
//       // Small delay so the user sees "Complete"
//       setTimeout(() => router.push(`/report/${run.id}`), 800);
//     }
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-8 flex flex-col gap-6">
//       <div>
//         <h1 className="text-3xl font-bold mb-2">New Research</h1>
//         <p className="text-zinc-600 dark:text-zinc-400">
//           Ask anything. The agent will plan, search, read, verify, and write a
//           cited report.
//         </p>
//       </div>

//       {!run && <ResearchForm onStarted={setRun} />}

//       {run && (
//         <div className="flex flex-col gap-4">
//           <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4">
//             <p className="text-sm text-zinc-500 mb-1">Question</p>
//             <p className="font-medium">{run.question}</p>
//           </div>

//           <ProgressStream runId={run.id} onComplete={handleComplete} />
//         </div>
//       )}
//     </div>
//   );
// }



// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import ResearchForm from "@/components/ResearchForm";
// import ProgressStream from "@/components/ProgressStream";
// import { ResearchRun } from "@/lib/types";
// import { Search, FileText, ShieldCheck, BookOpen } from "lucide-react";

// export default function NewResearchPage() {
//   const router = useRouter();
//   const [run, setRun] = useState<ResearchRun | null>(null);

//   function handleComplete(status: string) {
//     if (status === "completed" && run) {
//       setTimeout(() => router.push(`/report/${run.id}`), 900);
//     }
//   }

//   return (
//     <div className="relative max-w-4xl mx-auto px-6 py-12">
//       {/* Background gradient */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
//         <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
//         <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-purple-400/10 blur-3xl" />
//       </div>

//       {!run && (
//         <>
//           {/* Header */}
//           <div className="mb-10 text-center">
//             <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur px-3 py-1 text-xs font-medium mb-4">
//               <span className="relative flex h-1.5 w-1.5">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
//                 <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
//               </span>
//               Agent ready
//             </div>
//             <h1 className="text-4xl font-bold tracking-tight mb-3 bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
//               What do you want to research?
//             </h1>
//             <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
//               Ask any question. The agent searches, reads, verifies, and writes a
//               cited report in 1–2 minutes.
//             </p>
//           </div>

//           {/* Form */}
//           <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 shadow-xl shadow-zinc-900/5">
//             <ResearchForm onStarted={setRun} />
//           </div>

//           {/* Suggestion chips */}
//           <div className="mt-6">
//             <p className="text-xs font-medium text-zinc-500 mb-3">
//               Try one of these:
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {[
//                 "What are the latest breakthroughs in solid-state batteries?",
//                 "How does quantum error correction work?",
//                 "What is the state of fusion energy in 2026?",
//                 "How do multi-agent AI systems coordinate?",
//               ].map((s) => (
//                 <button
//                   key={s}
//                   onClick={() => {
//                     // Fills the textarea — needs ResearchForm to accept a value prop
//                     const textarea = document.querySelector(
//                       "textarea"
//                     ) as HTMLTextAreaElement;
//                     if (textarea) {
//                       const setter = Object.getOwnPropertyDescriptor(
//                         window.HTMLTextAreaElement.prototype,
//                         "value"
//                       )?.set;
//                       setter?.call(textarea, s);
//                       textarea.dispatchEvent(
//                         new Event("input", { bubbles: true })
//                       );
//                     }
//                   }}
//                   className="rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
//                 >
//                   {s}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Feature strip */}
//           <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
//             {[
//               { icon: Search, label: "Web search" },
//               { icon: BookOpen, label: "Multi-source reading" },
//               { icon: ShieldCheck, label: "Claim verification" },
//               { icon: FileText, label: "Cited reports" },
//             ].map((f) => {
//               const Icon = f.icon;
//               return (
//                 <div
//                   key={f.label}
//                   className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur p-3"
//                 >
//                   <Icon className="w-4 h-4 text-zinc-500 shrink-0" />
//                   <span className="text-xs font-medium">{f.label}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </>
//       )}

//       {run && (
//         <div className="space-y-6">
//           {/* Question card */}
//           <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
//             <div className="flex items-center gap-2 mb-2">
//               <Search className="w-4 h-4 text-blue-500" />
//               <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
//                 Research question
//               </p>
//             </div>
//             <p className="text-lg font-medium">{run.question}</p>
//           </div>

//           {/* Live progress */}
//           <ProgressStream runId={run.id} onComplete={handleComplete} />
//         </div>
//       )}
//     </div>
//   );
// }



// v3:

// "use client";

// import { useState, useLayoutEffect } from "react";
// import { useRouter } from "next/navigation";
// import ResearchForm from "@/components/ResearchForm";
// import ProgressStream from "@/components/ProgressStream";
// import { ResearchRun } from "@/lib/types";
// import { Search, FileText, ShieldCheck, BookOpen } from "lucide-react";

// export default function NewResearchPage() {
//   const router = useRouter();
//   const [run, setRun] = useState<ResearchRun | null>(null);

//   // Reset the run when this page is hidden (navigating away)
//   useLayoutEffect(() => {
//     return () => {
//       setRun(null);
//     };
//   }, []);

//   function handleComplete(status: string) {
//     if (status === "completed" && run) {
//       setTimeout(() => router.push(`/report/${run.id}`), 900);
//     } else if (status === "failed") {
//       // Reset the form so the user can try again
//       setTimeout(() => setRun(null), 1500);
//     }
//   }

//   return (
//     <div className="relative max-w-4xl mx-auto px-6 py-12">
//       {/* Background gradient */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
//         <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
//         <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-purple-400/10 blur-3xl" />
//       </div>

//       {!run && (
//         <>
//           {/* Header */}
//           <div className="mb-10 text-center">
//             <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur px-3 py-1 text-xs font-medium mb-4">
//               <span className="relative flex h-1.5 w-1.5">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
//                 <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
//               </span>
//               Agent ready
//             </div>
//             <h1 className="text-4xl font-bold tracking-tight mb-3 bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
//               What do you want to research?
//             </h1>
//             <p className="text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto">
//               Ask any question. The agent searches, reads, verifies, and writes a
//               cited report in 1–2 minutes.
//             </p>
//           </div>

//           {/* Form */}
//           <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 shadow-xl shadow-zinc-900/5">
//             <ResearchForm onStarted={setRun} />
//           </div>

//           {/* Feature strip */}
//           <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
//             {[
//               { icon: Search, label: "Web search" },
//               { icon: BookOpen, label: "Multi-source reading" },
//               { icon: ShieldCheck, label: "Claim verification" },
//               { icon: FileText, label: "Cited reports" },
//             ].map((f) => {
//               const Icon = f.icon;
//               return (
//                 <div
//                   key={f.label}
//                   className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur p-3"
//                 >
//                   <Icon className="w-4 h-4 text-zinc-500 shrink-0" />
//                   <span className="text-xs font-medium">{f.label}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </>
//       )}

//       {run && (
//         <div className="space-y-6">
//           {/* Question card */}
//           <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
//             <div className="flex items-center gap-2 mb-2">
//               <Search className="w-4 h-4 text-blue-500" />
//               <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
//                 Research question
//               </p>
//             </div>
//             <p className="text-lg font-medium">{run.question}</p>
//           </div>

//           {/* Live progress */}
//           <ProgressStream runId={run.id} onComplete={handleComplete} />
//         </div>
//       )}
//     </div>
//   );
// }



//v4:

"use client";

import { useState, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import ResearchForm from "@/components/ResearchForm";
import ProgressStream from "@/components/ProgressStream";
import { ResearchRun } from "@/lib/types";
import { Search, FileText, ShieldCheck, BookOpen } from "lucide-react";

export default function NewResearchPage() {
  const router = useRouter();
  const [run, setRun] = useState<ResearchRun | null>(null);

  useLayoutEffect(() => {
    return () => {
      setRun(null);
    };
  }, []);

  function handleComplete(status: string) {
    if (status === "completed" && run) {
      setTimeout(() => router.push(`/report/${run.id}`), 900);
    } else if (status === "failed") {
      setTimeout(() => setRun(null), 1500);
    }
  }

  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-purple-400/10 blur-3xl" />
      </div>

      {!run && (
        <>
          {/* Header */}
          <div className="mb-6 sm:mb-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur px-3 py-1 text-xs font-medium mb-3 sm:mb-4">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
              </span>
              Agent ready
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-2 sm:mb-3 bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
              What do you want to research?
            </h1>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto px-2">
              Ask any question. The agent searches, reads, verifies, and writes a
              cited report in 1–2 minutes.
            </p>
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-4 sm:p-6 shadow-xl shadow-zinc-900/5">
            <ResearchForm onStarted={setRun} />
          </div>

          {/* Feature strip */}
          <div className="mt-10 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { icon: Search, label: "Web search" },
              { icon: BookOpen, label: "Multi-source reading" },
              { icon: ShieldCheck, label: "Claim verification" },
              { icon: FileText, label: "Cited reports" },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.label}
                  className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur p-2.5 sm:p-3"
                >
                  <Icon className="w-4 h-4 text-zinc-500 shrink-0" />
                  <span className="text-xs font-medium">{f.label}</span>
                </div>
              );
            })}
          </div>
        </>
      )}

      {run && (
        <div className="space-y-4 sm:space-y-6">
          {/* Question card */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Search className="w-4 h-4 text-blue-500" />
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
                Research question
              </p>
            </div>
            <p className="text-base sm:text-lg font-medium">{run.question}</p>
          </div>

          {/* Live progress */}
          <ProgressStream runId={run.id} onComplete={handleComplete} />
        </div>
      )}
    </div>
  );
}