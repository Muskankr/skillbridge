"use client";

import ResumeReviewCard from "./ResumeReviewCard";
import CareerRoadmapCard from "./CareerRoadmapCard";
import ProjectIdeaCard from "./ProjectIdeaCard";
import InterviewCard from "./InterviewCard";


export default function AIToolkit() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-600">
          AI POWERED TOOLS
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight text-white md:text-5xl">
          AI Toolkit
        </h1>

        <p className="mt-3 max-w-2xl text-slate-400">
          Supercharge your developer journey with AI-powered tools
          designed to help you build, prepare and grow.
        </p>
      </div>

      {/* Tools */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ResumeReviewCard />
        <CareerRoadmapCard />
        <ProjectIdeaCard />
        <InterviewCard />
      </div>

    </div>
  );
}
