"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/hooks/useAuth";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-sm text-zinc-500">
        Loading...
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-4 py-12">

      {/* Subtle radial light */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.025] blur-[140px]" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <Link
          href="/"
          className="mb-10 block text-center text-2xl font-bold tracking-tight text-white"
        >
          SkillBridge
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-[#2a2a2a] bg-[#050505] p-6 shadow-2xl sm:p-8">

          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-600">
              Welcome Back
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white">
              Sign in to SkillBridge
            </h1>

            <p className="mt-3 text-sm leading-6 text-zinc-500">
              Continue building your developer identity.
            </p>
          </div>

          <div className="mt-8">
            <LoginForm />
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-600">
          Secure authentication powered by SkillBridge
        </p>
      </div>
    </main>
  );
}