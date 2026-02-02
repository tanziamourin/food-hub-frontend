"use client";
import { useAuth } from "@/provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardIndex() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      if (user.role === "ADMIN") router.replace("/dashboard/adminDashboard");
      else if (user.role === "PROVIDER") router.replace("/dashboard/providerDashboard");
      else router.replace("/dashboard/customer");
    }
  }, [user, loading, router]);

  return null;
}
