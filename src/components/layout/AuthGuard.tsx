"use client";

import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "ADMIN" | "PROVIDER" | "CUSTOMER";
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }

    if (!loading && role && user?.role !== role) {
      router.replace("/");
    }
  }, [user, loading, role, router]);

  if (loading || !user) return <p>Loading...</p>;

  return <>{children}</>;
}