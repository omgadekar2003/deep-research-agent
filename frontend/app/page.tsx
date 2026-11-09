// // version 2nd for the new landing page

// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import {
//   Sparkles,
//   ArrowRight,
//   Search,
//   BookOpen,
//   ShieldCheck,
//   FileText,
//   Zap,
//   Globe,
//   Brain,
// } from "lucide-react";

// export default function Home() {
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-white dark:bg-zinc-950">
//       {/* Animated gradient background */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl animate-pulse-slow" />
//         <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl animate-pulse-slow" />
//         <div className="absolute top-1/3 left-1/3 h-72 w-72 rounded-full bg-pink-400/10 blur-3xl animate-pulse-slower" />
//       </div>

//       {/* Navbar */}
//       <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
//         <div className="flex items-center gap-2 font-bold text-lg">
//           <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
//             <Sparkles className="w-5 h-5 text-white" />
//           </div>
//           Deep Research
//         </div>
//         <div className="flex items-center gap-3">
//           <Link
//             href="/login"
//             className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
//           >
//             Login
//           </Link>
//           <Link
//             href="/signup"
//             className="px-4 py-2 text-sm font-medium rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
//           >
//             Sign Up
//           </Link>
//         </div>
//       </nav>

//       {/* Hero */}
//       <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center">
//         {/* Badge */}
//         <div
//           className={`inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur px-4 py-1.5 text-sm mb-8 transition-all duration-700 ${
//             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//           }`}
//         >
//           <span className="relative flex h-2 w-2">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
//             <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
//           </span>
//           Powered by LangGraph + Gemini
//         </div>

//         {/* Headline */}
//         <h1
//           className={`text-5xl md:text-7xl font-bold tracking-tight max-w-4xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent transition-all duration-700 delay-100 ${
//             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//           }`}
//         >
//           Research anything.
//           <br />
//           <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//             Get cited answers.
//           </span>
//         </h1>

//         {/* Subheadline */}
//         <p
//           className={`mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl transition-all duration-700 delay-200 ${
//             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//           }`}
//         >
//           Ask any question. Our AI agent plans searches, reads multiple web
//           sources, verifies claims across them, and writes a fully cited report
//           — in under 2 minutes.
//         </p>

//         {/* CTA buttons */}
//         <div
//           className={`mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${
//             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//           }`}
//         >
//           <Link
//             href="/signup"
//             className="group inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-4 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-zinc-900/10"
//           >
//             Start Researching
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//           </Link>
//           <Link
//             href="/login"
//             className="inline-flex items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-700 px-8 py-4 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all hover:scale-[1.02] active:scale-[0.98]"
//           >
//             I have an account
//           </Link>
//         </div>

//         {/* Feature cards */}
//         <div
//           className={`mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl transition-all duration-700 delay-500 ${
//             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//           }`}
//         >
//           {[
//             {
//               icon: Brain,
//               title: "Plans Its Own Research",
//               desc: "Breaks your question into focused sub-queries and searches each one.",
//               color: "from-blue-500 to-cyan-500",
//             },
//             {
//               icon: BookOpen,
//               title: "Reads Multiple Sources",
//               desc: "Fetches full pages, strips noise, and extracts only verifiable facts.",
//               color: "from-purple-500 to-pink-500",
//             },
//             {
//               icon: ShieldCheck,
//               title: "Verifies Claims",
//               desc: "Cross-checks facts across sources and flags contradictions.",
//               color: "from-green-500 to-emerald-500",
//             },
//           ].map((f, i) => {
//             const Icon = f.icon;
//             return (
//               <div
//                 key={f.title}
//                 className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 text-left hover:shadow-xl hover:shadow-zinc-900/5 transition-all hover:-translate-y-1"
//               >
//                 <div
//                   className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${f.color} mb-4`}
//                 >
//                   <Icon className="w-5 h-5 text-white" />
//                 </div>
//                 <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
//                 <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
//                   {f.desc}
//                 </p>
//               </div>
//             );
//           })}
//         </div>

//         {/* Secondary features */}
//         <div
//           className={`mt-16 grid grid-cols-1 md:grid-cols-4 gap-4 w-full max-w-5xl transition-all duration-700 delay-700 ${
//             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//           }`}
//         >
//           {[
//             { icon: Zap, label: "Live progress streaming" },
//             { icon: Globe, label: "Multi-source web search" },
//             { icon: FileText, label: "PDF export" },
//             { icon: Sparkles, label: "No hallucinations" },
//           ].map((f) => {
//             const Icon = f.icon;
//             return (
//               <div
//                 key={f.label}
//                 className="flex items-center gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur p-4"
//               >
//                 <Icon className="w-4 h-4 text-zinc-500 shrink-0" />
//                 <span className="text-sm font-medium">{f.label}</span>
//               </div>
//             );
//           })}
//         </div>

//         {/* Footer */}
//         <footer className="mt-24 text-sm text-zinc-500">
//           Built with Next.js, FastAPI, LangGraph, Gemini, and Tavily
//         </footer>
//       </main>
//     </div>
//   );
// }


//Version 2:

// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import {
//   Sparkles,
//   ArrowRight,
//   Search,
//   BookOpen,
//   ShieldCheck,
//   FileText,
//   Zap,
//   Globe,
//   Brain,
//   GitBranch,
//   Download,
//   Lock,
//   Layers,
//   CheckCircle2,
//   X,
//   Mic,
//   Database,
//   BarChart3,
//   Clock,
//   Users,
//   Server,
// } from "lucide-react";

// export default function Home() {
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);

//   return (
//     <div className="relative min-h-screen overflow-x-hidden bg-white dark:bg-zinc-950">
//       {/* Animated gradient blobs (fixed to viewport so they don't stretch) */}
//       <div className="pointer-events-none fixed inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl animate-pulse-slow" />
//         <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl animate-pulse-slower" />
//         <div className="absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-pink-400/10 blur-3xl animate-pulse-slow" />
//       </div>

//       {/* Navbar */}
//       <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200/50 dark:border-zinc-800/50">
//         <div className="flex items-center justify-between px-6 py-3.5 max-w-7xl mx-auto">
//           <Link href="/" className="flex items-center gap-2 font-bold text-lg">
//             <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
//               <Sparkles className="w-5 h-5 text-white" />
//             </div>
//             Deep Research
//           </Link>
//           <div className="flex items-center gap-3">
//             <Link
//               href="/login"
//               className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
//             >
//               Login
//             </Link>
//             <Link
//               href="/signup"
//               className="px-4 py-2 text-sm font-medium rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
//             >
//               Sign Up
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* ================= HERO ================= */}
//       <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-24 flex flex-col items-center text-center">
//         <div
//           className={`inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur px-4 py-1.5 text-sm mb-8 transition-all duration-700 ${
//             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//           }`}
//         >
//           <span className="relative flex h-2 w-2">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
//             <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
//           </span>
//           Powered by Om Gadekar
//         </div>

//         <h1
//           className={`text-5xl md:text-7xl font-bold tracking-tight max-w-4xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent transition-all duration-700 delay-100 ${
//             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//           }`}
//         >
//           Research anything.
//           <br />
//           <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//             Get cited answers.
//           </span>
//         </h1>

//         <p
//           className={`mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl transition-all duration-700 delay-200 ${
//             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//           }`}
//         >
//           Ask any question. Our AI agent plans searches, reads multiple web
//           sources, verifies claims across them, and writes a fully cited report
//           — in under 2 minutes.
//         </p>

//         <div
//           className={`mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-300 ${
//             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//           }`}
//         >
//           <Link
//             href="/signup"
//             className="group inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-4 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-zinc-900/10"
//           >
//             Start Researching
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//           </Link>
//           <Link
//             href="/login"
//             className="inline-flex items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-700 px-8 py-4 font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all hover:scale-[1.02] active:scale-[0.98]"
//           >
//             I have an account
//           </Link>
//         </div>

//         {/* Stats strip */}
//         <div
//           className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl transition-all duration-700 delay-500 ${
//             mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//           }`}
//         >
//           {[
//             { value: "20+", label: "Sources per run" },
//             { value: "<2 min", label: "Typical run time" },
//             { value: "100%", label: "Cited claims" },
//             { value: "0", label: "Hallucinations" },
//           ].map((s) => (
//             <div key={s.label} className="text-center">
//               <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
//                 {s.value}
//               </div>
//               <div className="text-xs md:text-sm text-zinc-500 mt-1">
//                 {s.label}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ================= THE PROBLEM ================= */}
//       <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
//             Research is broken today
//           </h2>
//           <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
//             You open 15 tabs, skim 30 articles, and still aren't sure what's
//             true. AI chatbots make it worse — they hallucinate facts with
//             confident-sounding prose.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {[
//             {
//               icon: Clock,
//               title: "Hours of manual work",
//               desc: "Reading multiple sources, cross-checking facts, and formatting citations takes hours.",
//             },
//             {
//               icon: X,
//               title: "AI makes things up",
//               desc: "Standard chatbots invent sources and hallucinate facts. You can't trust the output.",
//             },
//             {
//               icon: Layers,
//               title: "No verification",
//               desc: "Even good answers don't tell you which source said what, or where sources disagree.",
//             },
//           ].map((p) => {
//             const Icon = p.icon;
//             return (
//               <div
//                 key={p.title}
//                 className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur p-6"
//               >
//                 <div className="inline-flex p-2.5 rounded-lg bg-red-50 dark:bg-red-950/50 mb-4">
//                   <Icon className="w-5 h-5 text-red-500" />
//                 </div>
//                 <h3 className="font-semibold mb-2">{p.title}</h3>
//                 <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
//                   {p.desc}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       {/* ================= HOW IT WORKS ================= */}
//       <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur px-3 py-1 text-xs font-medium mb-4">
//             How it works
//           </div>
//           <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
//             Six agents. One answer.
//           </h2>
//           <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
//             Every question runs through a LangGraph pipeline of six specialized
//             agents. Each one has one job — and passes verified facts to the
//             next.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[
//             {
//               step: "01",
//               icon: Brain,
//               title: "Planner",
//               desc: "Breaks your question into 3–5 focused sub-queries that cover different angles.",
//               color: "from-blue-500 to-cyan-500",
//             },
//             {
//               step: "02",
//               icon: Search,
//               title: "Searcher",
//               desc: "Runs each sub-query through Tavily, deduplicates URLs, and filters irrelevant results.",
//               color: "from-purple-500 to-pink-500",
//             },
//             {
//               step: "03",
//               icon: BookOpen,
//               title: "Reader",
//               desc: "Fetches full pages, strips HTML noise, and extracts 3–7 concrete verifiable facts per source.",
//               color: "from-orange-500 to-red-500",
//             },
//             {
//               step: "04",
//               icon: ShieldCheck,
//               title: "Verifier",
//               desc: "Groups facts across sources, marks which are supported by 2+ sources, and flags contradictions.",
//               color: "from-green-500 to-emerald-500",
//             },
//             {
//               step: "05",
//               icon: GitBranch,
//               title: "Decider",
//               desc: "Checks if there's enough information. If not, refines the queries and loops again (max 2 rounds).",
//               color: "from-cyan-500 to-blue-500",
//             },
//             {
//               step: "06",
//               icon: FileText,
//               title: "Writer",
//               desc: "Generates a markdown report with inline citations, thematic sections, and a sources list.",
//               color: "from-pink-500 to-rose-500",
//             },
//           ].map((s) => {
//             const Icon = s.icon;
//             return (
//               <div
//                 key={s.step}
//                 className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:shadow-xl hover:shadow-zinc-900/5 transition-all hover:-translate-y-1"
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div
//                     className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${s.color}`}
//                   >
//                     <Icon className="w-5 h-5 text-white" />
//                   </div>
//                   <span className="text-xs font-mono text-zinc-400">
//                     {s.step}
//                   </span>
//                 </div>
//                 <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
//                 <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
//                   {s.desc}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       {/* ================= FEATURES ================= */}
//       <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur px-3 py-1 text-xs font-medium mb-4">
//             Features
//           </div>
//           <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
//             Built for serious research
//           </h2>
//           <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
//             Every feature exists because a real research workflow needs it.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {[
//             {
//               icon: Zap,
//               title: "Live progress streaming",
//               desc: "Watch the agent think in real time via Server-Sent Events. No staring at a spinner.",
//             },
//             {
//               icon: ShieldCheck,
//               title: "Cross-source verification",
//               desc: "Facts marked supported (2+ sources), single-source, or contradicted. Know what to trust.",
//             },
//             {
//               icon: FileText,
//               title: "Inline citations",
//               desc: "Every claim links to its source with a [1], [2] marker. Click to see where it came from.",
//             },
//             {
//               icon: GitBranch,
//               title: "Self-correcting loop",
//               desc: "If the agent decides it doesn't have enough info, it refines queries and searches again.",
//             },
//             {
//               icon: Download,
//               title: "PDF export",
//               desc: "Download any completed report as a clean, formatted PDF for sharing or printing.",
//             },
//             {
//               icon: Mic,
//               title: "Voice input",
//               desc: "Speak your question in English or Hindi. Sarvam handles transcription with 300ms latency.",
//             },
//             {
//               icon: Lock,
//               title: "User accounts",
//               desc: "JWT auth with bcrypt password hashing and rotating refresh tokens. Your data is yours.",
//             },
//             {
//               icon: Database,
//               title: "Full history",
//               desc: "Every run is saved. Revisit any past report — no re-search, no re-read.",
//             },
//             {
//               icon: Server,
//               title: "Multi-key failover",
//               desc: "Multiple Gemini and Tavily keys rotate automatically. One provider fails, the others take over.",
//             },
//           ].map((f) => {
//             const Icon = f.icon;
//             return (
//               <div
//                 key={f.title}
//                 className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
//               >
//                 <Icon className="w-6 h-6 text-blue-500 mb-4" />
//                 <h3 className="font-semibold mb-2">{f.title}</h3>
//                 <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
//                   {f.desc}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       {/* ================= COMPARISON ================= */}
//       <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
//             How we compare
//           </h2>
//           <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
//             Same question, different tools.
//           </p>
//         </div>

//         <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
//           <table className="w-full text-sm">
//             <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
//               <tr>
//                 <th className="text-left p-4 font-semibold">Capability</th>
//                 <th className="text-center p-4 font-semibold">Google</th>
//                 <th className="text-center p-4 font-semibold">ChatGPT</th>
//                 <th className="text-center p-4 font-semibold text-blue-600 dark:text-blue-400">
//                   Deep Research
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {[
//                 { label: "Reads multiple sources", google: true, gpt: true, us: true },
//                 { label: "Inline citations", google: false, gpt: true, us: true },
//                 { label: "Cross-source verification", google: false, gpt: false, us: true },
//                 { label: "Flags contradictions", google: false, gpt: false, us: true },
//                 { label: "Live progress stream", google: false, gpt: true, us: true },
//                 { label: "Self-correcting loops", google: false, gpt: false, us: true },
//                 { label: "Downloadable PDF", google: false, gpt: false, us: true },
//                 { label: "Voice input (Indian languages)", google: false, gpt: false, us: true },
//                 { label: "Open API access", google: false, gpt: false, us: true },
//               ].map((row, i) => (
//                 <tr
//                   key={row.label}
//                   className={`border-b border-zinc-100 dark:border-zinc-800/50 ${
//                     i % 2 === 0
//                       ? "bg-white dark:bg-zinc-950"
//                       : "bg-zinc-50/50 dark:bg-zinc-900/30"
//                   }`}
//                 >
//                   <td className="p-4">{row.label}</td>
//                   <td className="text-center p-4">
//                     {row.google ? (
//                       <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
//                     ) : (
//                       <X className="w-4 h-4 text-zinc-300 dark:text-zinc-700 mx-auto" />
//                     )}
//                   </td>
//                   <td className="text-center p-4">
//                     {row.gpt ? (
//                       <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
//                     ) : (
//                       <X className="w-4 h-4 text-zinc-300 dark:text-zinc-700 mx-auto" />
//                     )}
//                   </td>
//                   <td className="text-center p-4 bg-blue-50/30 dark:bg-blue-950/10">
//                     {row.us ? (
//                       <CheckCircle2 className="w-4 h-4 text-blue-500 mx-auto" />
//                     ) : (
//                       <X className="w-4 h-4 text-zinc-300 dark:text-zinc-700 mx-auto" />
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>

//       {/* ================= HOW IT WORKS FOR USER ================= */}
//       <section className="relative z-10 max-w-5xl mx-auto px-6 py-20">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
//             Up and running in 30 seconds
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {[
//             {
//               n: "1",
//               title: "Sign up",
//               desc: "Create an account with email and password. No credit card.",
//             },
//             {
//               n: "2",
//               title: "Ask a question",
//               desc: "Type it, paste it, or click the mic and speak it. Any topic, any language.",
//             },
//             {
//               n: "3",
//               title: "Get your report",
//               desc: "Watch live progress. When it's done, read the cited report or download as PDF.",
//             },
//           ].map((step) => (
//             <div key={step.n} className="relative">
//               <div className="flex items-center gap-4 mb-3">
//                 <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold flex items-center justify-center">
//                   {step.n}
//                 </div>
//                 <h3 className="font-semibold text-lg">{step.title}</h3>
//               </div>
//               <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-14">
//                 {step.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ================= USE CASES ================= */}
//       <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
//             Built for
//           </h2>
//         </div>
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           {[
//             { icon: BarChart3, label: "Market research" },
//             { icon: BookOpen, label: "Academic work" },
//             { icon: Globe, label: "Competitive analysis" },
//             { icon: Users, label: "Content writers" },
//             { icon: Brain, label: "Technical deep-dives" },
//             { icon: FileText, label: "Report writing" },
//             { icon: Layers, label: "Product research" },
//             { icon: Sparkles, label: "Anything else" },
//           ].map((c) => {
//             const Icon = c.icon;
//             return (
//               <div
//                 key={c.label}
//                 className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur p-6 text-center"
//               >
//                 <Icon className="w-6 h-6 text-zinc-500" />
//                 <span className="text-sm font-medium">{c.label}</span>
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       {/* ================= FAQ ================= */}
//       <section className="relative z-10 max-w-3xl mx-auto px-6 py-20">
//         <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 text-center">
//           Frequently asked
//         </h2>
//         <div className="space-y-3">
//           {[
//             {
//               q: "How long does a research run take?",
//               a: "Between 45 and 120 seconds, depending on how many sources the agent reads. You can watch every step live.",
//             },
//             {
//               q: "Where does the information come from?",
//               a: "Web search via Tavily, which returns results from Google and curated news sources. Every fact is traced to its source URL.",
//             },
//             {
//               q: "Can I trust the output?",
//               a: "Every claim is tagged as supported (2+ sources), single-source, or contradicted. You know exactly what's well-established and what's isolated.",
//             },
//             {
//               q: "What languages does voice input support?",
//               a: "Sarvam handles Indian languages (Hindi, Tamil, Telugu, and 8 more) plus English and Hinglish code-switching.",
//             },
//             {
//               q: "Do you store my questions?",
//               a: "Yes — to your account only. Every run is saved in your history so you can revisit it. We never share it with other users.",
//             },
//             {
//               q: "Can I download the reports?",
//               a: "Yes. Any completed report can be downloaded as a formatted PDF directly from the report view.",
//             },
//           ].map((faq) => (
//             <details
//               key={faq.q}
//               className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4"
//             >
//               <summary className="flex items-center justify-between cursor-pointer list-none">
//                 <span className="font-medium pr-4">{faq.q}</span>
//                 <span className="text-zinc-400 group-open:rotate-180 transition-transform">
//                   ▼
//                 </span>
//               </summary>
//               <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
//                 {faq.a}
//               </p>
//             </details>
//           ))}
//         </div>
//       </section>

//       {/* ================= FINAL CTA ================= */}
//       <section className="relative z-10 max-w-4xl mx-auto px-6 py-24">
//         <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 p-12 text-center shadow-xl">
//           <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
//             Start your first research
//           </h2>
//           <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg mx-auto">
//             Free to try. No credit card. The agent will plan, search, read,
//             verify, and write — while you watch.
//           </p>
//           <Link
//             href="/signup"
//             className="group inline-flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-4 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
//           >
//             Get Started Free
//             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
//           </Link>
//         </div>
//       </section>

//       {/* ================= FOOTER ================= */}
//       <footer className="relative z-10 border-t border-zinc-200 dark:border-zinc-800">
//         <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
//           <div className="flex items-center gap-2">
//             <div className="p-1 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
//               <Sparkles className="w-4 h-4 text-white" />
//             </div>
//             <span>Deep Research Agent</span>
//           </div>
//           <p>Built by Om Gadekar</p>
//         </div>
//       </footer>
//     </div>
//   );
// }



// v4:

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Search,
  BookOpen,
  ShieldCheck,
  FileText,
  Zap,
  Globe,
  Brain,
  GitBranch,
  Download,
  Lock,
  Layers,
  CheckCircle2,
  X,
  Mic,
  Database,
  BarChart3,
  Clock,
  Users,
  Server,
} from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-white dark:bg-zinc-950">
      {/* Animated gradient blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-purple-400/20 blur-3xl animate-pulse-slower" />
        <div className="absolute bottom-0 right-1/3 h-72 w-72 rounded-full bg-pink-400/10 blur-3xl animate-pulse-slow" />
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-zinc-950/70 border-b border-zinc-200/50 dark:border-zinc-800/50">
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 font-bold text-base sm:text-lg">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <span className="hidden xs:inline sm:inline">Deep Research</span>
            <span className="xs:hidden sm:hidden">DR</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-16 sm:pb-24 flex flex-col items-center text-center">
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur px-3 sm:px-4 py-1.5 text-xs sm:text-sm mb-6 sm:mb-8 transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          Powered by Om Gadekar
        </div>

        <h1
          className={`text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight max-w-4xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-600 dark:from-white dark:via-zinc-200 dark:to-zinc-400 bg-clip-text text-transparent transition-all duration-700 delay-100 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Research anything.
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Get cited answers.
          </span>
        </h1>

        <p
          className={`mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl px-2 transition-all duration-700 delay-200 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Ask any question. Our AI agent plans searches, reads multiple web
          sources, verifies claims across them, and writes a fully cited report
          — in under 2 minutes.
        </p>

        <div
          className={`mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-2 transition-all duration-700 delay-300 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="/signup"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-zinc-900/10"
          >
            Start Researching
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-300 dark:border-zinc-700 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            I have an account
          </Link>
        </div>

        {/* Stats strip */}
        <div
          className={`mt-12 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl transition-all duration-700 delay-500 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {[
            { value: "20+", label: "Sources per run" },
            { value: "<2 min", label: "Typical run time" },
            { value: "100%", label: "Cited claims" },
            { value: "0", label: "Hallucinations" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {s.value}
              </div>
              <div className="text-xs sm:text-sm text-zinc-500 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE PROBLEM */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            Research is broken today
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            You open 15 tabs, skim 30 articles, and still aren't sure what's
            true. AI chatbots make it worse — they hallucinate facts with
            confident-sounding prose.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              icon: Clock,
              title: "Hours of manual work",
              desc: "Reading multiple sources, cross-checking facts, and formatting citations takes hours.",
            },
            {
              icon: X,
              title: "AI makes things up",
              desc: "Standard chatbots invent sources and hallucinate facts. You can't trust the output.",
            },
            {
              icon: Layers,
              title: "No verification",
              desc: "Even good answers don't tell you which source said what, or where sources disagree.",
            },
          ].map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur p-5 sm:p-6"
              >
                <div className="inline-flex p-2.5 rounded-lg bg-red-50 dark:bg-red-950/50 mb-3 sm:mb-4">
                  <Icon className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">{p.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur px-3 py-1 text-xs font-medium mb-3 sm:mb-4">
            How it works
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            Six agents. One answer.
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Every question runs through a LangGraph pipeline of six specialized
            agents. Each one has one job — and passes verified facts to the
            next.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              step: "01",
              icon: Brain,
              title: "Planner",
              desc: "Breaks your question into 3–5 focused sub-queries that cover different angles.",
              color: "from-blue-500 to-cyan-500",
            },
            {
              step: "02",
              icon: Search,
              title: "Searcher",
              desc: "Runs each sub-query through Tavily, deduplicates URLs, and filters irrelevant results.",
              color: "from-purple-500 to-pink-500",
            },
            {
              step: "03",
              icon: BookOpen,
              title: "Reader",
              desc: "Fetches full pages, strips HTML noise, and extracts 3–7 concrete verifiable facts per source.",
              color: "from-orange-500 to-red-500",
            },
            {
              step: "04",
              icon: ShieldCheck,
              title: "Verifier",
              desc: "Groups facts across sources, marks which are supported by 2+ sources, and flags contradictions.",
              color: "from-green-500 to-emerald-500",
            },
            {
              step: "05",
              icon: GitBranch,
              title: "Decider",
              desc: "Checks if there's enough information. If not, refines the queries and loops again (max 2 rounds).",
              color: "from-cyan-500 to-blue-500",
            },
            {
              step: "06",
              icon: FileText,
              title: "Writer",
              desc: "Generates a markdown report with inline citations, thematic sections, and a sources list.",
              color: "from-pink-500 to-rose-500",
            },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="group relative rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 hover:shadow-xl hover:shadow-zinc-900/5 transition-all hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-3 sm:mb-4">
                  <div className={`inline-flex p-2.5 sm:p-3 rounded-xl bg-gradient-to-br ${s.color}`}>
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-xs font-mono text-zinc-400">{s.step}</span>
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-2">{s.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-8 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur px-3 py-1 text-xs font-medium mb-3 sm:mb-4">
            Features
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            Built for serious research
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Every feature exists because a real research workflow needs it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            { icon: Zap, title: "Live progress streaming", desc: "Watch the agent think in real time via Server-Sent Events. No staring at a spinner." },
            { icon: ShieldCheck, title: "Cross-source verification", desc: "Facts marked supported (2+ sources), single-source, or contradicted. Know what to trust." },
            { icon: FileText, title: "Inline citations", desc: "Every claim links to its source with a [1], [2] marker. Click to see where it came from." },
            { icon: GitBranch, title: "Self-correcting loop", desc: "If the agent decides it doesn't have enough info, it refines queries and searches again." },
            { icon: Download, title: "PDF export", desc: "Download any completed report as a clean, formatted PDF for sharing or printing." },
            { icon: Mic, title: "Voice input", desc: "Speak your question in English or Hindi. Sarvam handles transcription with 300ms latency." },
            { icon: Lock, title: "User accounts", desc: "JWT auth with bcrypt password hashing and rotating refresh tokens. Your data is yours." },
            { icon: Database, title: "Full history", desc: "Every run is saved. Revisit any past report — no re-search, no re-read." },
            { icon: Server, title: "Multi-key failover", desc: "Multiple Gemini and Tavily keys rotate automatically. One provider fails, the others take over." },
          ].map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur p-5 sm:p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 mb-3 sm:mb-4" />
                <h3 className="font-semibold mb-2 text-sm sm:text-base">{f.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* COMPARISON */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            How we compare
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Same question, different tools.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-xs sm:text-sm min-w-[480px]">
            <thead className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="text-left p-3 sm:p-4 font-semibold">Capability</th>
                <th className="text-center p-3 sm:p-4 font-semibold">Google</th>
                <th className="text-center p-3 sm:p-4 font-semibold">ChatGPT</th>
                <th className="text-center p-3 sm:p-4 font-semibold text-blue-600 dark:text-blue-400">
                  Deep Research
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { label: "Reads multiple sources", google: true, gpt: true, us: true },
                { label: "Inline citations", google: false, gpt: true, us: true },
                { label: "Cross-source verification", google: false, gpt: false, us: true },
                { label: "Flags contradictions", google: false, gpt: false, us: true },
                { label: "Live progress stream", google: false, gpt: true, us: true },
                { label: "Self-correcting loops", google: false, gpt: false, us: true },
                { label: "Downloadable PDF", google: false, gpt: false, us: true },
                { label: "Voice input (Indian languages)", google: false, gpt: false, us: true },
                { label: "Open API access", google: false, gpt: false, us: true },
              ].map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-b border-zinc-100 dark:border-zinc-800/50 ${
                    i % 2 === 0
                      ? "bg-white dark:bg-zinc-950"
                      : "bg-zinc-50/50 dark:bg-zinc-900/30"
                  }`}
                >
                  <td className="p-3 sm:p-4">{row.label}</td>
                  <td className="text-center p-3 sm:p-4">
                    {row.google ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-zinc-300 dark:text-zinc-700 mx-auto" />
                    )}
                  </td>
                  <td className="text-center p-3 sm:p-4">
                    {row.gpt ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-zinc-300 dark:text-zinc-700 mx-auto" />
                    )}
                  </td>
                  <td className="text-center p-3 sm:p-4 bg-blue-50/30 dark:bg-blue-950/10">
                    {row.us ? (
                      <CheckCircle2 className="w-4 h-4 text-blue-500 mx-auto" />
                    ) : (
                      <X className="w-4 h-4 text-zinc-300 dark:text-zinc-700 mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* HOW IT WORKS FOR USER */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            Up and running in 30 seconds
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            { n: "1", title: "Sign up", desc: "Create an account with email and password. No credit card." },
            { n: "2", title: "Ask a question", desc: "Type it, paste it, or click the mic and speak it. Any topic, any language." },
            { n: "3", title: "Get your report", desc: "Watch live progress. When it's done, read the cited report or download as PDF." },
          ].map((step) => (
            <div key={step.n} className="relative">
              <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm sm:text-base font-bold flex items-center justify-center">
                  {step.n}
                </div>
                <h3 className="font-semibold text-base sm:text-lg">{step.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pl-12 sm:pl-14">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* USE CASES */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            Built for
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {[
            { icon: BarChart3, label: "Market research" },
            { icon: BookOpen, label: "Academic work" },
            { icon: Globe, label: "Competitive analysis" },
            { icon: Users, label: "Content writers" },
            { icon: Brain, label: "Technical deep-dives" },
            { icon: FileText, label: "Report writing" },
            { icon: Layers, label: "Product research" },
            { icon: Sparkles, label: "Anything else" },
          ].map((c) => {
            const Icon = c.icon;
            return (
              <div
                key={c.label}
                className="flex flex-col items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur p-4 sm:p-6 text-center"
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-500" />
                <span className="text-xs sm:text-sm font-medium">{c.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-8 sm:mb-12 text-center">
          Frequently asked
        </h2>
        <div className="space-y-3">
          {[
            { q: "How long does a research run take?", a: "Between 45 and 120 seconds, depending on how many sources the agent reads. You can watch every step live." },
            { q: "Where does the information come from?", a: "Web search via Tavily, which returns results from Google and curated news sources. Every fact is traced to its source URL." },
            { q: "Can I trust the output?", a: "Every claim is tagged as supported (2+ sources), single-source, or contradicted. You know exactly what's well-established and what's isolated." },
            { q: "What languages does voice input support?", a: "Sarvam handles Indian languages (Hindi, Tamil, Telugu, and 8 more) plus English and Hinglish code-switching." },
            { q: "Do you store my questions?", a: "Yes — to your account only. Every run is saved in your history so you can revisit it. We never share it with other users." },
            { q: "Can I download the reports?", a: "Yes. Any completed report can be downloaded as a formatted PDF directly from the report view." },
          ].map((faq) => (
            <details
              key={faq.q}
              className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3 sm:p-4"
            >
              <summary className="flex items-center justify-between cursor-pointer list-none">
                <span className="font-medium pr-4 text-sm sm:text-base">{faq.q}</span>
                <span className="text-zinc-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 p-8 sm:p-12 text-center shadow-xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            Start your first research
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-6 sm:mb-8 max-w-lg mx-auto">
            Free to try. No credit card. The agent will plan, search, read,
            verify, and write — while you watch.
          </p>
          <Link
            href="/signup"
            className="group inline-flex items-center gap-2 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span>Deep Research Agent</span>
          </div>
          <p>Built by Om Gadekar</p>
        </div>
      </footer>
    </div>
  );
}
