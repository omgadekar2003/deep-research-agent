// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Plus, History, LogOut, Sparkles } from "lucide-react";
// import { logoutUser } from "@/lib/auth";
// import { User } from "@/lib/types";

// export default function Sidebar({ user }: { user: User }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const links = [
//     { href: "/app", label: "New Research", icon: Plus },
//     { href: "/app/history", label: "History", icon: History },
//   ];

//   async function handleLogout() {
//     await logoutUser();
//     router.push("/login");
//   }

//   return (
//     <aside className="w-64 shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col">
//       <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
//         <Link href="/app" className="flex items-center gap-2 font-semibold">
//           <Sparkles className="w-5 h-5 text-blue-500" />
//           Deep Research
//         </Link>
//       </div>

//       <nav className="flex-1 p-2 flex flex-col gap-1">
//         {links.map((l) => {
//           const Icon = l.icon;
//           const active = pathname === l.href;
//           return (
//             <Link
//               key={l.href}
//               href={l.href}
//               className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
//                 active
//                   ? "bg-zinc-100 dark:bg-zinc-800"
//                   : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
//               }`}
//             >
//               <Icon className="w-4 h-4" />
//               {l.label}
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
//         <p className="text-xs text-zinc-500 truncate mb-2">{user.email}</p>
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 w-full rounded-md px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
//         >
//           <LogOut className="w-4 h-4" />
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// }



// v2

// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { Plus, History, LogOut, Sparkles } from "lucide-react";
// import { logoutUser } from "@/lib/auth";
// import { User } from "@/lib/types";

// export default function Sidebar({ user }: { user: User }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   const links = [
//     { href: "/app", label: "New Research", icon: Plus },
//     { href: "/app/history", label: "History", icon: History },
//   ];

//   async function handleLogout() {
//     await logoutUser();
//     router.push("/login");
//   }

//   return (
//     <aside className="w-64 shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col h-screen sticky top-0">
//       {/* Logo */}
//       <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
//         <Link href="/app" className="flex items-center gap-2 font-bold">
//           <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
//             <Sparkles className="w-4 h-4 text-white" />
//           </div>
//           Deep Research
//         </Link>
//       </div>

//       {/* Nav */}
//       <nav className="flex-1 p-3 flex flex-col gap-1">
//         {links.map((l) => {
//           const Icon = l.icon;
//           const active =
//             pathname === l.href ||
//             (l.href !== "/app" && pathname.startsWith(l.href));
//           return (
//             <Link
//               key={l.href}
//               href={l.href}
//               className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
//                 active
//                   ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
//                   : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
//               }`}
//             >
//               <Icon className="w-4 h-4" />
//               {l.label}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* User footer */}
//       <div className="p-3 border-t border-zinc-200 dark:border-zinc-800">
//         <div className="mb-2 px-2 py-1.5">
//           <p className="text-xs text-zinc-500 truncate">{user.email}</p>
//           {user.full_name && (
//             <p className="text-sm font-medium truncate">{user.full_name}</p>
//           )}
//         </div>
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2.5 w-full rounded-lg px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
//         >
//           <LogOut className="w-4 h-4" />
//           Log out
//         </button>
//       </div>
//     </aside>
//   );
// }


// v3:


"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Plus, History, LogOut, Sparkles, Sun, Moon } from "lucide-react";
import { logoutUser } from "@/lib/auth";
import { User } from "@/lib/types";
import { useTheme } from "./ThemeProvider";

export default function Sidebar({ user }: { user: User }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { href: "/app", label: "New Research", icon: Plus },
    { href: "/app/history", label: "History", icon: History },
  ];

  async function handleLogout() {
    await logoutUser();
    router.push("/login");
  }

  return (
    <aside className="w-64 shrink-0 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col h-screen sticky top-0">
      <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
        <Link href="/app" className="flex items-center gap-2 font-bold">
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          Deep Research
        </Link>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-1">
        {links.map((l) => {
          const Icon = l.icon;
          const active =
            pathname === l.href ||
            (l.href !== "/app" && pathname.startsWith(l.href));
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              <Icon className="w-4 h-4" />
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 space-y-1">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2.5 w-full rounded-lg px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <>
              <Sun className="w-4 h-4" />
              Light mode
            </>
          ) : (
            <>
              <Moon className="w-4 h-4" />
              Dark mode
            </>
          )}
        </button>

        {/* User info */}
        <div className="px-2 py-1.5">
          <p className="text-xs text-zinc-500 truncate">{user.email}</p>
          {user.full_name && (
            <p className="text-sm font-medium truncate">{user.full_name}</p>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2.5 w-full rounded-lg px-3 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Log out
        </button>
      </div>
    </aside>
  );
}