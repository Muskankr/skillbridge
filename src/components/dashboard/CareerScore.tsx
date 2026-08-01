"use client";

import { useCareerScore } from "@/features/dashboard/hooks/useCareerScore";

export default function CareerScore() {
  const { score, loading } = useCareerScore();

  if (loading) {
    return (
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        Loading...
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Career Readiness
          </h2>

          <p className="mt-2 text-slate-400">
            Improve your profile to reach 100%.
          </p>

        </div>

        <span className="text-5xl font-black text-indigo-400">
          {score}%
        </span>

      </div>

      <div className="mt-8 h-4 rounded-full bg-slate-800">

        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-700"
          style={{
            width: `${score}%`,
          }}
        />

      </div>

    </section>
  );
}