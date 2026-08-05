"use client";

import { useRouter } from "next/navigation";

export default function ProjectIdeaCard() {
  const router = useRouter();

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold text-white">
        💡 AI Project Ideas
      </h2>

      <p className="mt-4 text-slate-400">
        Generate portfolio-worthy project ideas.
      </p>

      <button
        onClick={() => router.push("/project-ideas")}
        className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-500"
      >
        Generate Ideas
      </button>

    </div>
  );
}