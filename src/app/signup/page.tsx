"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">

      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-10 shadow-2xl">

        <h1 className="text-center text-5xl font-black text-white">
          SkillBridge
        </h1>

        <p className="mt-3 text-center text-slate-400">
          Create Your Developer Account
        </p>

        <div className="mt-10">
          <SignupForm />
        </div>

      </div>

    </main>
  );
}