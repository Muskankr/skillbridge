"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { generateRoadmap } from "@/features/roadmap/services/roadmap.service";

export default function CareerRoadmapPage() {
  const [goal, setGoal] = useState("");
  const [roadmap, setRoadmap] = useState<string[]>([]);

  function handleGenerate() {
    setRoadmap(generateRoadmap(goal));
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-4xl space-y-6">

        <h1 className="text-4xl font-bold">
          Career Roadmap
        </h1>

        <input
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Example: Frontend Developer"
          className="w-full rounded-xl border border-slate-700 bg-slate-900 p-4"
        />

        <button
          onClick={handleGenerate}
          className="rounded-xl bg-indigo-600 px-6 py-3"
        >
          Generate
        </button>

        <div className="space-y-4">

          {roadmap.map((item, index) => (

            <div
              key={index}
              className="rounded-xl bg-slate-900 p-5"
            >
              Step {index + 1} • {item}
            </div>

          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}