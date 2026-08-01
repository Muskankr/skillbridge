"use client";

import ResumePreview from "./ResumePreview";
import { useResume } from "@/features/resume/hooks/useResume";
import { downloadResume } from "@/features/resume/utils/downloadResume";

export default function ResumeBuilder() {
  const { resume, loading } = useResume();

  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 text-center text-white">
        Loading Resume...
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 text-center text-white">
        No resume data found.
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Resume Builder
          </h1>

          <p className="mt-2 text-slate-400">
            Your resume is generated automatically from your SkillBridge profile.
          </p>

        </div>

      </div>

      <div className="flex justify-end">

  <button
    onClick={() => downloadResume(resume)}
    className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-500"
  >
    ⬇ Download ATS Resume
  </button>

</div>

      <ResumePreview resume={resume} />

    </div>
  );
}