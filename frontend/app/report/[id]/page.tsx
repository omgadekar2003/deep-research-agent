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


"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { api, getAccessToken } from "@/lib/api";
import { ResearchRun } from "@/lib/types";
import ReportView from "@/components/ReportView";
import { Loader2, ArrowLeft, Download, AlertCircle } from "lucide-react";

// 1. INNER component: this is where useParams lives.
// It is a Client Component, but it is rendered INSIDE Suspense below.
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
        setError(e.message);
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
      if (!r.ok) throw new Error(`PDF failed: ${r.status}`);
      const blob = await r.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `research_report_${run.id}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      alert(e.message || "PDF download failed");
    } finally {
      setDownloading(false);
    }
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-8">
        <Link href="/app/history" className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to history
        </Link>
        <div className="flex items-start gap-3 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 p-4 text-red-700 dark:text-red-400">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">Failed to load report</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
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

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <Link href="/app/history" className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        {run.status === "completed" && run.report_md && (
          <button onClick={handleDownloadPdf} disabled={downloading} className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 text-sm font-medium disabled:opacity-50">
            {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {downloading ? "Generating..." : "Download PDF"}
          </button>
        )}
      </div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{run.question}</h1>
        <p className="text-sm text-zinc-500">
          {new Date(run.created_at).toLocaleString()} · Status:{" "}
          <span className={run.status === "completed" ? "text-green-600 dark:text-green-400" : run.status === "failed" ? "text-red-600 dark:text-red-400" : "text-zinc-600"}>
            {run.status}
          </span>
        </p>
      </div>
      {run.status === "failed" && (
        <div className="rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 p-4 text-red-700 dark:text-red-400 mb-6">
          <p className="font-medium">Research failed</p>
          <p className="text-sm mt-1 whitespace-pre-wrap">{run.error || "Unknown error"}</p>
        </div>
      )}
      {run.status === "completed" && run.report_md && <ReportView markdown={run.report_md} />}
      {run.status !== "completed" && run.status !== "failed" && (
        <div className="text-center py-12 text-zinc-500">This run is still {run.status}. Refresh to check again.</div>
      )}
    </div>
  );
}

// 2. OUTER component: this is the actual page.
// It renders Suspense, which contains the inner component.
export default function ReportPage() {
  return (
    <Suspense fallback={<div className="flex flex-1 items-center justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-zinc-400" /></div>}>
      <ReportContent />
    </Suspense>
  );
}