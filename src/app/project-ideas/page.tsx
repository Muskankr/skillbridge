"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { getProjectIdeas } from "@/features/projectIdeas/services/projectIdeas.service";

export default function ProjectIdeasPage() {

  const [category, setCategory] = useState("Web");

  const [ideas, setIdeas] = useState<any[]>([]);

  function generate() {
    setIdeas(getProjectIdeas(category));
  }

  return (
    <DashboardLayout>

      <div className="mx-auto max-w-5xl space-y-6">

        <h1 className="text-4xl font-bold">
          Project Ideas
        </h1>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl bg-slate-900 p-4"
        >
          <option>Web</option>
          <option>AI</option>
          <option>Python</option>
        </select>

        <button
          onClick={generate}
          className="rounded-xl bg-indigo-600 px-6 py-3"
        >
          Generate
        </button>

        <div className="grid gap-5 md:grid-cols-2">

          {ideas.map((idea, index) => (

            <div
              key={index}
              className="rounded-xl bg-slate-900 p-6"
            >

              <h2 className="text-xl font-bold">
                {idea.title}
              </h2>

              <p className="mt-3">
                Difficulty : {idea.level}
              </p>

              <p>
                Duration : {idea.time}
              </p>

            </div>

          ))}

        </div>

      </div>

    </DashboardLayout>
  );
}