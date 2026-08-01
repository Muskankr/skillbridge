"use client";

import ResumeReviewCard from "./ResumeReviewCard";
import CareerRoadmapCard from "./CareerRoadmapCard";
import ProjectIdeaCard from "./ProjectIdeaCard";
import InterviewCard from "./InterviewCard";

export default function AIToolkit() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-black text-white">
          AI Toolkit
        </h1>

        <p className="mt-2 text-slate-400">
          Supercharge your developer journey with AI.
        </p>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <ResumeReviewCard />

        <CareerRoadmapCard />

        <ProjectIdeaCard />

        <InterviewCard />

      </div>

    </div>
  );
}