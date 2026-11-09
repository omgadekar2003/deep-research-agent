// "use client";

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { api, getAccessToken } from "@/lib/api";
// import { ResearchRun } from "@/lib/types";
// import ReportView from "@/components/ReportView";
// import { Loader2, ArrowLeft, Download, AlertCircle } from "lucide-react";
// // 
// // export const instant = false;

// export default function ReportPage() {
//   const params = useParams();
//   const runId = Number(params.id);
//   const [run, setRun] = useState<ResearchRun | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [downloading, setDownloading] = useState(false);

//   useEffect(() => {
//     if (!runId) return;
//     (async () => {
//       try {
//         const data = await api.getRun(runId);
//         setRun(data);
//       } catch (e: any) {
//         setError(e.message);
//       }
//     })();
//   }, [runId]);

//   async function handleDownloadPdf() {
//     if (!run) return;
//     setDownloading(true);
//     try {
//       const token = getAccessToken();
//       const r = await fetch(api.pdfUrl(run.id), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!r.ok) throw new Error(`PDF failed: ${r.status}`);
//       const blob = await r.blob();
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `research_report_${run.id}.pdf`;
//       a.click();
//       URL.revokeObjectURL(url);
//     } catch (e: any) {
//       alert(e.message || "PDF download failed");
//     } finally {
//       setDownloading(false);
//     }
//   }

//   if (error) {
//     return (
//       <div className="max-w-3xl mx-auto p-8">
//         <Link
//           href="/app/history"
//           className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-6"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Back to history
//         </Link>
//         <div className="flex items-start gap-3 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 p-4 text-red-700 dark:text-red-400">
//           <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
//           <div>
//             <p className="font-medium">Failed to load report</p>
//             <p className="text-sm mt-1">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!run) {
//     return (
//       <div className="flex flex-1 items-center justify-center py-20">
//         <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-8">
//       <div className="flex items-center justify-between mb-6">
//         <Link
//           href="/app/history"
//           className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Back
//         </Link>

//         {run.status === "completed" && run.report_md && (
//           <button
//             onClick={handleDownloadPdf}
//             disabled={downloading}
//             className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium disabled:opacity-50"
//           >
//             {downloading ? (
//               <Loader2 className="w-4 h-4 animate-spin" />
//             ) : (
//               <Download className="w-4 h-4" />
//             )}
//             {downloading ? "Generating..." : "Download PDF"}
//           </button>
//         )}
//       </div>

//       <div className="mb-6">
//         <h1 className="text-2xl font-bold mb-2">{run.question}</h1>
//         <p className="text-sm text-zinc-500">
//           {new Date(run.created_at).toLocaleString()} · Status:{" "}
//           <span
//             className={
//               run.status === "completed"
//                 ? "text-green-600 dark:text-green-400"
//                 : run.status === "failed"
//                 ? "text-red-600 dark:text-red-400"
//                 : "text-zinc-600"
//             }
//           >
//             {run.status}
//           </span>
//         </p>
//       </div>

//       {run.status === "failed" && (
//         <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 p-4 text-red-700 dark:text-red-400 mb-6">
//           <p className="font-medium">Research failed</p>
//           <p className="text-sm mt-1 whitespace-pre-wrap">
//             {run.error || "Unknown error"}
//           </p>
//         </div>
//       )}

//       {run.status === "completed" && run.report_md && (
//         <ReportView markdown={run.report_md} />
//       )}

//       {run.status !== "completed" && run.status !== "failed" && (
//         <div className="text-center py-12 text-zinc-500">
//           This run is still {run.status}. Refresh to check again.
//         </div>
//       )}
//     </div>
//   );
// }




// v2:


// "use client";

// import { Suspense, useEffect, useState, useLayoutEffect } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { api, getAccessToken } from "@/lib/api";
// import { ResearchRun } from "@/lib/types";
// import ReportView from "@/components/ReportView";
// import { Loader2, ArrowLeft, Download, AlertCircle } from "lucide-react";

// // 1. INNER component: this is where useParams lives.
// // It is a Client Component, but it is rendered INSIDE Suspense below.
// function ReportContent() {
//   const params = useParams();
//   const runId = Number(params.id);
//   const [run, setRun] = useState<ResearchRun | null>(null);
  
//   // Reset the run when this page is hidden (navigating away)
//   useLayoutEffect(() => {
//     return () => {
//       setRun(null);
//     };
//   }, []);


//   const [error, setError] = useState<string | null>(null);
//   const [downloading, setDownloading] = useState(false);

//   useEffect(() => {
//     if (!runId) return;
//     (async () => {
//       try {
//         const data = await api.getRun(runId);
//         setRun(data);
//       } catch (e: any) {
//         setError(e.message);
//       }
//     })();
//   }, [runId]);

//   async function handleDownloadPdf() {
//     if (!run) return;
//     setDownloading(true);
//     try {
//       const token = getAccessToken();
//       const r = await fetch(api.pdfUrl(run.id), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!r.ok) throw new Error(`PDF failed: ${r.status}`);
//       const blob = await r.blob();
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `research_report_${run.id}.pdf`;
//       a.click();
//       URL.revokeObjectURL(url);
//     } catch (e: any) {
//       alert(e.message || "PDF download failed");
//     } finally {
//       setDownloading(false);
//     }
//   }

//   if (error) {
//     return (
//       <div className="max-w-3xl mx-auto p-8">
//         <Link href="/app/history" className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-6">
//           <ArrowLeft className="w-4 h-4" /> Back to history
//         </Link>
//         <div className="flex items-start gap-3 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 p-4 text-red-700 dark:text-red-400">
//           <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
//           <div>
//             <p className="font-medium">Failed to load report</p>
//             <p className="text-sm mt-1">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!run) {
//     return (
//       <div className="flex flex-1 items-center justify-center py-20">
//         <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-3xl mx-auto p-8">
//       <div className="flex items-center justify-between mb-6">
//         <Link href="/app/history" className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
//           <ArrowLeft className="w-4 h-4" /> Back
//         </Link>
//         {run.status === "completed" && run.report_md && (
//           <button onClick={handleDownloadPdf} disabled={downloading} className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium disabled:opacity-50">
//             {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
//             {downloading ? "Generating..." : "Download PDF"}
//           </button>
//         )}
//       </div>
//       <div className="mb-6">
//         <h1 className="text-2xl font-bold mb-2">{run.question}</h1>
//         <p className="text-sm text-zinc-500">
//           {new Date(run.created_at).toLocaleString()} · Status:{" "}
//           <span className={run.status === "completed" ? "text-green-600 dark:text-green-400" : run.status === "failed" ? "text-red-600 dark:text-red-400" : "text-zinc-600"}>
//             {run.status}
//           </span>
//         </p>
//       </div>
//       {run.status === "failed" && (
//         <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 p-4 text-red-700 dark:text-red-400 mb-6">
//           <p className="font-medium">Research failed</p>
//           <p className="text-sm mt-1 whitespace-pre-wrap">{run.error || "Unknown error"}</p>
//         </div>
//       )}
//       {run.status === "completed" && run.report_md && <ReportView markdown={run.report_md} />}
//       {run.status !== "completed" && run.status !== "failed" && (
//         <div className="text-center py-12 text-zinc-500">This run is still {run.status}. Refresh to check again.</div>
//       )}
//     </div>
//   );
// }

// // 2. OUTER component: this is the actual page.
// // It renders Suspense, which contains the inner component.
// export default function ReportPage() {
//   return (
//     <Suspense fallback={<div className="flex flex-1 items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-zinc-400" /></div>}>
//       <ReportContent />
//     </Suspense>
//   );
// }




// v3:

// "use client";

// import { Suspense, useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import { api, getAccessToken } from "@/lib/api";
// import { ResearchRun } from "@/lib/types";
// import ReportView from "@/components/ReportView";
// import {
//   Loader2,
//   ArrowLeft,
//   Download,
//   CheckCircle2,
//   XCircle,
//   Clock,
// } from "lucide-react";

// function ReportContent() {
//   const params = useParams();
//   const runId = Number(params.id);
//   const [run, setRun] = useState<ResearchRun | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [downloading, setDownloading] = useState(false);

//   useEffect(() => {
//     if (!runId) return;
//     (async () => {
//       try {
//         const data = await api.getRun(runId);
//         setRun(data);
//       } catch (e: any) {
//         setError("failed");
//       }
//     })();
//   }, [runId]);

//   async function handleDownloadPdf() {
//     if (!run) return;
//     setDownloading(true);
//     try {
//       const token = getAccessToken();
//       const r = await fetch(api.pdfUrl(run.id), {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!r.ok) throw new Error("pdf failed");
//       const blob = await r.blob();
//       const url = URL.createObjectURL(blob);
//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `research_report_${run.id}.pdf`;
//       a.click();
//       URL.revokeObjectURL(url);
//     } catch (e: any) {
//       alert("PDF download is not available right now. Please try again.");
//     } finally {
//       setDownloading(false);
//     }
//   }

//   if (error) {
//     return (
//       <div className="max-w-3xl mx-auto p-8">
//         <Link
//           href="/app/history"
//           className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-6"
//         >
//           <ArrowLeft className="w-4 h-4" /> Back to history
//         </Link>
//         <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6 text-zinc-600 dark:text-zinc-400">
//           <p className="font-medium mb-1">Report not available</p>
//           <p className="text-sm">This report could not be loaded. Please try again later.</p>
//         </div>
//       </div>
//     );
//   }

//   if (!run) {
//     return (
//       <div className="flex flex-1 items-center justify-center py-20">
//         <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
//       </div>
//     );
//   }

//   const statusMeta = {
//     completed: { icon: CheckCircle2, color: "text-green-500", label: "Completed" },
//     failed: { icon: XCircle, color: "text-red-500", label: "Failed" },
//     running: { icon: Loader2, color: "text-blue-500 animate-spin", label: "Running" },
//     pending: { icon: Clock, color: "text-zinc-400", label: "Pending" },
//   } as const;
//   const sm = statusMeta[run.status] || statusMeta.pending;
//   const StatusIcon = sm.icon;

//   return (
//     <div className="relative max-w-3xl mx-auto px-6 py-12">
//       {/* Background gradient */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
//         <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
//         <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-pink-400/10 blur-3xl" />
//       </div>

//       {/* Top bar */}
//       <div className="flex items-center justify-between mb-8">
//         <Link
//           href="/app/history"
//           className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           Back
//         </Link>

//         {run.status === "completed" && run.report_md && (
//           <button
//             onClick={handleDownloadPdf}
//             disabled={downloading}
//             className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium hover:from-blue-500 hover:to-purple-500 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 shadow-lg shadow-blue-500/20"
//           >
//             {downloading ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 Generating...
//               </>
//             ) : (
//               <>
//                 <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
//                 Download PDF
//               </>
//             )}
//           </button>
//         )}
//       </div>

//       {/* Header card */}
//       <div className="mb-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 shadow-sm">
//         <div className="flex items-center gap-2 mb-2">
//           <StatusIcon className={`w-4 h-4 ${sm.color}`} />
//           <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
//             {sm.label}
//           </span>
//         </div>
//         <h1 className="text-2xl font-bold tracking-tight leading-snug mb-2">
//           {run.question}
//         </h1>
//         <p className="text-sm text-zinc-500">
//           {new Date(run.created_at).toLocaleString()}
//           {run.finished_at && (
//             <>
//               {" · Finished "}
//               {new Date(run.finished_at).toLocaleTimeString()}
//             </>
//           )}
//         </p>
//       </div>

//       {/* Failed banner — friendly, no raw error */}
//       {run.status === "failed" && (
//         <div className="mb-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-5 text-zinc-600 dark:text-zinc-400">
//           <p className="font-medium mb-1">This research run didn't complete</p>
//           <p className="text-sm">
//             Please try a new question. If the problem persists, try again in a few minutes.
//           </p>
//         </div>
//       )}

//       {/* Report */}
//       {run.status === "completed" && run.report_md && (
//         <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 shadow-sm">
//           <ReportView markdown={run.report_md} />
//         </article>
//       )}

//       {run.status !== "completed" && run.status !== "failed" && (
//         <div className="text-center py-16 text-zinc-500">
//           This run is still {run.status}. Refresh to check again.
//         </div>
//       )}
//     </div>
//   );
// }

// export default function ReportPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="flex flex-1 items-center justify-center py-20">
//           <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
//         </div>
//       }
//     >
//       <ReportContent />
//     </Suspense>
//   );
// }



//v4:

"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api, getAccessToken } from "@/lib/api";
import { ResearchRun } from "@/lib/types";
import ReportView from "@/components/ReportView";
import {
  Loader2,
  ArrowLeft,
  Download,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

function ReportContent() {
  const params = useParams();
  const runId = Number(params.id);
  const [run, setRun] = useState<ResearchRun | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!runId) return;
    (async () => {
      try {
        const data = await api.getRun(runId);
        setRun(data);
      } catch (e: any) {
        setError("failed");
      }
    })();
  }, [runId]);

  async function handleDownloadPdf() {
    if (!run) return;
    setDownloading(true);
    try {
      const token = getAccessToken();
      const r = await fetch(api.pdfUrl(run.id), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!r.ok) throw new Error("pdf failed");
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `research_report_${run.id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      alert("PDF download is not available right now. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-8">
        <Link
          href="/app/history"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to history
        </Link>
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6 text-zinc-600 dark:text-zinc-400">
          <p className="font-medium mb-1">Report not available</p>
          <p className="text-sm">This report could not be loaded. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (!run) {
    return (
      <div className="flex flex-1 items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
      </div>
    );
  }

  const statusMeta = {
    completed: { icon: CheckCircle2, color: "text-green-500", label: "Completed" },
    failed: { icon: XCircle, color: "text-red-500", label: "Failed" },
    running: { icon: Loader2, color: "text-blue-500 animate-spin", label: "Running" },
    pending: { icon: Clock, color: "text-zinc-400", label: "Pending" },
  } as const;
  const sm = statusMeta[run.status] || statusMeta.pending;
  const StatusIcon = sm.icon;

  return (
    <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-pink-400/10 blur-3xl" />
      </div>

      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 mb-6 sm:mb-8">
        <Link
          href="/app/history"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        {run.status === "completed" && run.report_md && (
          <button
            onClick={handleDownloadPdf}
            disabled={downloading}
            className="group inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium hover:from-blue-500 hover:to-purple-500 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 shadow-lg shadow-blue-500/20"
          >
            {downloading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline">Generating...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                <span className="hidden xs:inline sm:inline">Download PDF</span>
                <span className="xs:hidden sm:hidden">PDF</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Header card */}
      <div className="mb-6 sm:mb-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <StatusIcon className={`w-4 h-4 ${sm.color}`} />
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
            {sm.label}
          </span>
        </div>
        <h1 className="text-lg sm:text-2xl font-bold tracking-tight leading-snug mb-2">
          {run.question}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500">
          {new Date(run.created_at).toLocaleString()}
          {run.finished_at && (
            <>
              {" · Finished "}
              {new Date(run.finished_at).toLocaleTimeString()}
            </>
          )}
        </p>
      </div>

      {/* Failed banner */}
      {run.status === "failed" && (
        <div className="mb-6 sm:mb-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4 sm:p-5 text-zinc-600 dark:text-zinc-400">
          <p className="font-medium mb-1 text-sm sm:text-base">This research run didn't complete</p>
          <p className="text-xs sm:text-sm">
            Please try a new question. If the problem persists, try again in a few minutes.
          </p>
        </div>
      )}

      {/* Report */}
      {run.status === "completed" && run.report_md && (
        <article className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 md:p-8 shadow-sm">
          <ReportView markdown={run.report_md} />
        </article>
      )}

      {run.status !== "completed" && run.status !== "failed" && (
        <div className="text-center py-12 sm:py-16 text-sm sm:text-base text-zinc-500">
          This run is still {run.status}. Refresh to check again.
        </div>
      )}
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}