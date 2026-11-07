"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser, isLoggedIn } from "@/lib/auth";
import { User } from "@/lib/types";
import { Loader2 } from "lucide-react";

export default function AuthGuard({
  children,
}: {
  children: (user: User) => React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!isLoggedIn()) {
        router.replace("/login");
        return;
      }
      const u = await getCurrentUser();
      if (!u) {
        router.replace("/login");
        return;
      }
      setUser(u);
      setLoading(false);
    })();
  }, [router]);

  if (loading || !user) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-zinc-400" />
      </div>
    );
  }

  return <>{children(user)}</>;
}