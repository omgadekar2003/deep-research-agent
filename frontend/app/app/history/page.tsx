// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { api } from "@/lib/api";
// import { ResearchRunSummary } from "@/lib/types";
// import { Loader2, FileText, Clock, CheckCircle2, XCircle } from "lucide-react";

// const STATUS_ICON = {
//   pending: Clock,
//   running: Loader2,
//   completed: CheckCircle2,
//   failed: XCircle,
// } as const;

// const STATUS_COLOR = {
//   pending: "text-zinc-400",
//   running: "text-blue-500 animate-spin",
//   completed: "text-green-500",
//   failed: "text-red-500",
// } as const;

// export default function HistoryPage() {
//   const [runs, setRuns] = useState<ResearchRunSummary[] | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await api.history();
//         setRuns(data);
//       } catch (e: any) {
//         setError(e.message);
//       }
//     })();
//   }, []);

//   return (
//     <div className="max-w-3xl mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-6">History</h1>

//       {error && (
//         <div className="text-red-600 dark:text-red-400 mb-4">{error}</div>
//       )}

//       {runs === null && (
//         <div className="flex justify-center py-12">
//           <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
//         </div>
//       )}

//       {runs && runs.length === 0 && (
//         <div className="text-center py-12 text-zinc-500">
//           No research yet.{" "}
//           <Link href="/app" className="text-blue-500 hover:underline">
//             Start one
//           </Link>
//           .
//         </div>
//       )}

//       {runs && runs.length > 0 && (
//         <div className="flex flex-col gap-2">
//           {runs.map((r) => {
//             const Icon = STATUS_ICON[r.status];
//             const color = STATUS_COLOR[r.status];
//             return (
//               <Link
//                 key={r.id}
//                 href={`/report/${r.id}`}
//                 className="flex items-start gap-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
//               >
//                 <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${color}`} />
//                 <div className="flex-1 min-w-0">
//                   <p className="font-medium truncate">{r.question}</p>
//                   <p className="text-xs text-zinc-500 mt-1">
//                     {new Date(r.created_at).toLocaleString()} · {r.status}
//                   </p>
//                 </div>
//                 <FileText className="w-4 h-4 text-zinc-400 shrink-0" />
//               </Link>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }











// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { api } from "@/lib/api";
// import { ResearchRunSummary } from "@/lib/types";
// import {
//   Loader2,
//   FileText,
//   Clock,
//   CheckCircle2,
//   XCircle,
//   Plus,
//   Search,
// } from "lucide-react";

// const STATUS_ICON = {
//   pending: Clock,
//   running: Loader2,
//   completed: CheckCircle2,
//   failed: XCircle,
// } as const;

// const STATUS_COLOR = {
//   pending: "text-zinc-400",
//   running: "text-blue-500 animate-spin",
//   completed: "text-green-500",
//   failed: "text-red-500",
// } as const;

// export default function HistoryPage() {
//   const [runs, setRuns] = useState<ResearchRunSummary[] | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await api.history();
//         setRuns(data);
//       } catch (e: any) {
//         setError(e.message);
//       }
//     })();
//   }, []);

//   return (
//     <div className="relative max-w-4xl mx-auto px-6 py-12">
//       {/* Background gradient */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
//         <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-purple-400/10 blur-3xl" />
//         <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
//       </div>

//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight mb-1">History</h1>
//           <p className="text-sm text-zinc-600 dark:text-zinc-400">
//             All your past research runs
//           </p>
//         </div>
//         <Link
//           href="/app"
//           className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
//         >
//           <Plus className="w-4 h-4" />
//           New research
//         </Link>
//       </div>

//       {error && (
//         <div className="mb-4 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/50 px-4 py-3 text-sm text-red-700 dark:text-red-400">
//           {error}
//         </div>
//       )}

//       {runs === null && (
//         <div className="flex justify-center py-20">
//           <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
//         </div>
//       )}

//       {runs && runs.length === 0 && (
//         <div className="text-center py-20 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
//           <Search className="w-10 h-10 text-zinc-400 mx-auto mb-4" />
//           <h3 className="font-semibold mb-1">No research yet</h3>
//           <p className="text-sm text-zinc-500 mb-6">
//             Start your first question to see it here.
//           </p>
//           <Link
//             href="/app"
//             className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium"
//           >
//             <Plus className="w-4 h-4" />
//             Start researching
//           </Link>
//         </div>
//       )}

//       {runs && runs.length > 0 && (
//         <div className="space-y-2">
//           {runs.map((r, i) => {
//             const Icon = STATUS_ICON[r.status];
//             const color = STATUS_COLOR[r.status];
//             return (
//               <Link
//                 key={r.id}
//                 href={`/report/${r.id}`}
//                 className="group flex items-start gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all animate-in"
//                 style={{ animationDelay: `${i * 40}ms` }}
//               >
//                 <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${color}`} />
//                 <div className="flex-1 min-w-0">
//                   <p className="font-medium leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                     {r.question}
//                   </p>
//                   <p className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
//                     <span>{new Date(r.created_at).toLocaleString()}</span>
//                     <span>·</span>
//                     <span
//                       className={
//                         r.status === "completed"
//                           ? "text-green-600 dark:text-green-400"
//                           : r.status === "failed"
//                           ? "text-red-600 dark:text-red-400"
//                           : ""
//                       }
//                     >
//                       {r.status}
//                     </span>
//                   </p>
//                 </div>
//                 <FileText className="w-4 h-4 text-zinc-400 shrink-0 mt-1 group-hover:text-blue-500 transition-colors" />
//               </Link>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }



//v4:

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { ResearchRunSummary } from "@/lib/types";
import {
  Loader2,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Search,
} from "lucide-react";

const STATUS_ICON = {
  pending: Clock,
  running: Loader2,
  completed: CheckCircle2,
  failed: XCircle,
} as const;

const STATUS_COLOR = {
  pending: "text-zinc-400",
  running: "text-blue-500 animate-spin",
  completed: "text-green-500",
  failed: "text-red-500",
} as const;

export default function HistoryPage() {
  const [runs, setRuns] = useState<ResearchRunSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await api.history();
        setRuns(data);
      } catch (e: any) {
        setError("Could not load history. Please try again.");
      }
    })();
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-purple-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">History</h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            All your past research runs
          </p>
        </div>
        <Link
          href="/app"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New research
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
          {error}
        </div>
      )}

      {runs === null && (
        <div className="flex justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
        </div>
      )}

      {runs && runs.length === 0 && (
        <div className="text-center py-12 sm:py-20 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700">
          <Search className="w-8 h-8 sm:w-10 sm:h-10 text-zinc-400 mx-auto mb-4" />
          <h3 className="font-semibold mb-1 text-sm sm:text-base">No research yet</h3>
          <p className="text-xs sm:text-sm text-zinc-500 mb-6 px-4">
            Start your first question to see it here.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Start researching
          </Link>
        </div>
      )}

      {runs && runs.length > 0 && (
        <div className="space-y-2">
          {runs.map((r, i) => {
            const Icon = STATUS_ICON[r.status];
            const color = STATUS_COLOR[r.status];
            return (
              <Link
                key={r.id}
                href={`/report/${r.id}`}
                className="group flex items-start gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 sm:p-4 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md transition-all animate-in"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 mt-0.5 shrink-0 ${color}`} />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {r.question}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 flex flex-wrap items-center gap-2">
                    <span>{new Date(r.created_at).toLocaleString()}</span>
                    <span className="hidden xs:inline">·</span>
                    <span
                      className={
                        r.status === "completed"
                          ? "text-green-600 dark:text-green-400"
                          : r.status === "failed"
                          ? "text-red-600 dark:text-red-400"
                          : ""
                      }
                    >
                      {r.status}
                    </span>
                  </p>
                </div>
                <FileText className="w-4 h-4 text-zinc-400 shrink-0 mt-1 group-hover:text-blue-500 transition-colors hidden sm:block" />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}