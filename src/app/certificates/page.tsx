"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/hooks/useAuth";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import CertificateGrid from "@/components/certificates/CertificateGrid";

export default function CertificatesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading Certificates...
      </main>
    );
  }

  return (
    <DashboardLayout>
      <CertificateGrid />
    </DashboardLayout>
  );
}