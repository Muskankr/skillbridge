"use client";

import Link from "next/link";

export default function ResumeReviewCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 transition hover:border-indigo-500 hover:shadow-lg">

      <h2 className="text-2xl font-bold text-white">
        🤖 AI Resume Review
      </h2>

      <p className="mt-4 text-slate-400">
        Upload your resume and receive ATS score, AI feedback and improvement suggestions.
      </p>

      <Link
        href="/ai-toolkit/resume-review"
        className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-500"
      >
        Open Tool
      </Link>

    </div>
  );
}