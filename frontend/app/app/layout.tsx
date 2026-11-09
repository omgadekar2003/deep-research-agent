// // import type { Metadata } from "next";
// // import { Inter } from "next/font/google";
// // import "./globals.css";

// // const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// // export const metadata: Metadata = {
// //   title: "Deep Research Agent",
// //   description: "Autonomous research with citations",
// // };

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <html lang="en" className={`${inter.variable} h-full antialiased`}>
// //       <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
// //         {children}
// //       </body>
// //     </html>
// //   );
// // }





// "use client";

// import AuthGuard from "@/components/AuthGuard";
// import Sidebar from "@/components/Sidebar";

// export default function AppLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <AuthGuard>
//       {(user) => (
//         <div className="flex flex-1 min-h-screen">
//           <Sidebar user={user} />
//           <main className="flex-1 overflow-y-auto">{children}</main>
//         </div>
//       )}
//     </AuthGuard>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Sidebar from "@/components/Sidebar";
// import { getCurrentUser } from "@/lib/auth";
// import { User } from "@/lib/types";
// import { Loader2 } from "lucide-react";

// export default function AppLayout({ children }: { children: React.ReactNode }) {
//   const router = useRouter();
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     (async () => {
//       const u = await getCurrentUser();
//       if (!u) {
//         router.replace("/login");
//         return;
//       }
//       setUser(u);
//       setLoading(false);
//     })();
//   }, [router]);

//   if (loading) {
//     return (
//       <div className="flex flex-1 items-center justify-center min-h-screen bg-white dark:bg-zinc-950">
//         <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-1 min-h-screen bg-white dark:bg-zinc-950">
//       {user && <Sidebar user={user} />}
//       <main className="flex-1 overflow-y-auto">{children}</main>
//     </div>
//   );
// }


//v4:desktop and phone view

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/auth";
import { User } from "@/lib/types";
import { Loader2 } from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const u = await getCurrentUser();
      if (!u) {
        router.replace("/login");
        return;
      }
      setUser(u);
      setLoading(false);
    })();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen bg-white dark:bg-zinc-950">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="flex flex-1 min-h-screen bg-white dark:bg-zinc-950">
      {user && <Sidebar user={user} />}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">{children}</main>
    </div>
  );
}