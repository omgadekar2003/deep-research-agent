// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { signupUser } from "@/lib/auth";
// import { Loader2 } from "lucide-react";

// export default function SignupPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);
//     try {
//       await signupUser(email, password, fullName || undefined);
//       router.push("/app");
//     } catch (err: any) {
//       setError(err.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="flex flex-1 items-center justify-center px-6">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-sm flex flex-col gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8"
//       >
//         <h1 className="text-2xl font-bold">Create account</h1>
//         <p className="text-sm text-zinc-600 dark:text-zinc-400">
//           Start researching in seconds
//         </p>

//         {error && (
//           <div className="rounded-md bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900 px-3 py-2 text-sm text-red-700 dark:text-red-400">
//             {error}
//           </div>
//         )}

//         <input
//           type="text"
//           placeholder="Full name (optional)"
//           value={fullName}
//           onChange={(e) => setFullName(e.target.value)}
//           className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <input
//           type="email"
//           required
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <input
//           type="password"
//           required
//           minLength={8}
//           placeholder="Password (min 8 chars)"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="rounded-md border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="flex items-center justify-center gap-2 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-3 py-2 font-medium disabled:opacity-50"
//         >
//           {loading && <Loader2 className="w-4 h-4 animate-spin" />}
//           {loading ? "Creating..." : "Sign up"}
//         </button>

//         <p className="text-sm text-zinc-600 dark:text-zinc-400 text-center">
//           Already have an account?{" "}
//           <Link href="/login" className="text-blue-500 hover:underline">
//             Login
//           </Link>
//         </p>
//       </form>
//     </div>
//   );
// }

// v2:


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { signupUser } from "@/lib/auth";
// import {
//   Loader2,
//   Mail,
//   Lock,
//   User,
//   ArrowRight,
//   Sparkles,
//   Eye,
//   EyeOff,
//   AlertCircle,
//   Check,
// } from "lucide-react";

// export default function SignupPage() {
//   const router = useRouter();
//   const [mounted, setMounted] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => setMounted(true), []);

//   const passwordChecks = {
//     length: password.length >= 8,
//     hasUpper: /[A-Z]/.test(password),
//     hasNumber: /[0-9]/.test(password),
//   };
//   const passwordStrength =
//     Object.values(passwordChecks).filter(Boolean).length;

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setError(null);
//     if (!passwordChecks.length) {
//       setError("Password must be at least 8 characters");
//       return;
//     }
//     setLoading(true);
//     try {
//       await signupUser(email, password, fullName || undefined);
//       router.push("/app");
//     } catch (err: any) {
//       setError(err.message || "Signup failed");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-white dark:bg-zinc-950 flex items-center justify-center px-4 sm:px-6 py-16">
//       {/* Animated gradient background */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-green-400/20 blur-3xl animate-pulse-slow" />
//         <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl animate-pulse-slow" />
//         <div className="absolute top-1/2 right-1/3 h-72 w-72 rounded-full bg-purple-400/10 blur-3xl animate-pulse-slower" />
//       </div>

//       {/* Logo top-left */}
//       <Link
//         href="/"
//         className="absolute top-6 left-6 z-10 flex items-center gap-2 font-bold text-lg"
//       >
//         <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
//           <Sparkles className="w-5 h-5 text-white" />
//         </div>
//         Deep Research
//       </Link>

//       <div
//         className={`relative z-10 w-full max-w-md transition-all duration-700 ${
//           mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
//         }`}
//       >
//         <form
//           onSubmit={handleSubmit}
//           className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-zinc-900/10"
//         >
//           <div className="mb-8">
//             <h1 className="text-2xl font-bold tracking-tight mb-2">
//               Create your account
//             </h1>
//             <p className="text-sm text-zinc-600 dark:text-zinc-400">
//               Start researching in seconds — no credit card required
//             </p>
//           </div>

//           {error && (
//             <div className="mb-5 flex items-start gap-2 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 px-3 py-2.5 text-sm text-red-700 dark:text-red-400">
//               <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
//               <span>{error}</span>
//             </div>
//           )}

//           {/* Full name */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1.5">
//               Full name{" "}
//               <span className="text-zinc-400 font-normal">(optional)</span>
//             </label>
//             <div className="relative">
//               <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
//               <input
//                 type="text"
//                 placeholder="Your name"
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 disabled={loading}
//                 className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-60"
//               />
//             </div>
//           </div>

//           {/* Email */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1.5">Email</label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
//               <input
//                 type="email"
//                 required
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 disabled={loading}
//                 className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-60"
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div className="mb-2">
//             <label className="block text-sm font-medium mb-1.5">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 required
//                 minLength={8}
//                 placeholder="At least 8 characters"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 disabled={loading}
//                 className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-60"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
//                 tabIndex={-1}
//               >
//                 {showPassword ? (
//                   <EyeOff className="w-4 h-4" />
//                 ) : (
//                   <Eye className="w-4 h-4" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Password strength bar */}
//           {password && (
//             <div className="mb-4">
//               <div className="flex gap-1 mb-2">
//                 {[0, 1, 2].map((i) => (
//                   <div
//                     key={i}
//                     className={`h-1 flex-1 rounded-full transition-colors ${
//                       passwordStrength > i
//                         ? passwordStrength === 1
//                           ? "bg-red-500"
//                           : passwordStrength === 2
//                           ? "bg-yellow-500"
//                           : "bg-green-500"
//                         : "bg-zinc-200 dark:bg-zinc-800"
//                     }`}
//                   />
//                 ))}
//               </div>
//               <div className="space-y-1 text-xs">
//                 <CheckItem label="At least 8 characters" ok={passwordChecks.length} />
//                 <CheckItem label="Contains uppercase letter" ok={passwordChecks.hasUpper} />
//                 <CheckItem label="Contains a number" ok={passwordChecks.hasNumber} />
//               </div>
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="group mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 font-semibold hover:from-blue-500 hover:to-purple-500 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100 shadow-lg shadow-blue-500/20"
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 Creating account...
//               </>
//             ) : (
//               <>
//                 Create account
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
//               </>
//             )}
//           </button>

//           <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400 text-center">
//             Already have an account?{" "}
//             <Link
//               href="/login"
//               className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
//             >
//               Log in
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// function CheckItem({ label, ok }: { label: string; ok: boolean }) {
//   return (
//     <div
//       className={`flex items-center gap-1.5 transition-colors ${
//         ok ? "text-green-600 dark:text-green-400" : "text-zinc-400"
//       }`}
//     >
//       <div
//         className={`w-3 h-3 rounded-full flex items-center justify-center ${
//           ok ? "bg-green-500" : "bg-zinc-300 dark:bg-zinc-700"
//         }`}
//       >
//         {ok && <Check className="w-2 h-2 text-white" strokeWidth={3} />}
//       </div>
//       {label}
//     </div>
//   );
// }



//v4:
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signupUser } from "@/lib/auth";
import {
  Loader2,
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  AlertCircle,
  Check,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => setMounted(true), []);

  const passwordChecks = {
    length: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
  };
  const passwordStrength = Object.values(passwordChecks).filter(Boolean).length;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!passwordChecks.length) {
      setError("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      await signupUser(email, password, fullName || undefined);
      router.push("/app");
    } catch (err: any) {
      setError("Could not create account. The email may already be in use.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-zinc-950 flex items-center justify-center px-4 sm:px-6 py-8 sm:py-16">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-green-400/20 blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 right-1/3 h-72 w-72 rounded-full bg-purple-400/10 blur-3xl animate-pulse-slower" />
      </div>

      {/* Logo top-left */}
      <Link
        href="/"
        className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 flex items-center gap-2 font-bold text-base sm:text-lg"
      >
        <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        Deep Research
      </Link>

      <div
        className={`relative z-10 w-full max-w-md transition-all duration-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-zinc-900/10"
        >
          <div className="mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
              Create your account
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Start researching in seconds — no credit card required
            </p>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-2 rounded-lg bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 px-3 py-2.5 text-sm text-red-700 dark:text-red-400">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Full name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1.5">
              Full name <span className="text-zinc-400 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-60"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-60"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Password strength bar */}
          {password && (
            <div className="mb-4">
              <div className="flex gap-1 mb-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      passwordStrength > i
                        ? passwordStrength === 1
                          ? "bg-red-500"
                          : passwordStrength === 2
                          ? "bg-yellow-500"
                          : "bg-green-500"
                        : "bg-zinc-200 dark:bg-zinc-800"
                    }`}
                  />
                ))}
              </div>
              <div className="space-y-1 text-xs">
                <CheckItem label="At least 8 characters" ok={passwordChecks.length} />
                <CheckItem label="Contains uppercase letter" ok={passwordChecks.hasUpper} />
                <CheckItem label="Contains a number" ok={passwordChecks.hasNumber} />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2.5 font-semibold hover:from-blue-500 hover:to-purple-500 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:hover:scale-100 shadow-lg shadow-blue-500/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                Create account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>

          <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400 text-center">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function CheckItem({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div
      className={`flex items-center gap-1.5 transition-colors ${
        ok ? "text-green-600 dark:text-green-400" : "text-zinc-400"
      }`}
    >
      <div
        className={`w-3 h-3 rounded-full flex items-center justify-center ${
          ok ? "bg-green-500" : "bg-zinc-300 dark:bg-zinc-700"
        }`}
      >
        {ok && <Check className="w-2 h-2 text-white" strokeWidth={3} />}
      </div>
      {label}
    </div>
  );
}
