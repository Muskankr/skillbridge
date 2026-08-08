"use client";

import StatsCard from "./StatsCard";
import SkillCard from "./SkillCard";
import RoadmapCard from "./RoadmapCard";
import GithubCard from "../github/GithubCard";

import { useDeveloperHub } from "@/features/developerHub/hooks/useDeveloperHub";

export default function DeveloperHub() {
  const { data, loading } = useDeveloperHub();

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-zinc-500">
          Loading Developer Hub...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-600">
          Developer Workspace
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Developer Hub
        </h1>

        <p className="mt-3 max-w-2xl text-zinc-500">
          Track your coding growth, skills, projects and
          learning roadmap in one place.
        </p>
      </section>

      {/* Stats */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total XP"
          value={data.totalXP}
        />

        <StatsCard
          title="Projects"
          value={data.projectCount}
        />

        <StatsCard
          title="Certificates"
          value={data.certificateCount}
        />

        <StatsCard
          title="Current Level"
          value={data.level}
        />
      </section>

      {/* GitHub */}
      <section>
        <GithubCard
          githubUrl={data.profile?.github_url}
        />
      </section>

      {/* Skills */}
      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-white">
            Skill Progress
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Track your progress across important technologies.
          </p>
        </div>

        <div className="space-y-4">
          <SkillCard
            name="React"
            progress={85}
          />

          <SkillCard
            name="Python"
            progress={92}
          />

          <SkillCard
            name="Node.js"
            progress={72}
          />

          <SkillCard
            name="Machine Learning"
            progress={60}
          />
        </div>
      </section>

      {/* Roadmap */}
      <section>
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-white">
            Learning Roadmap
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Follow your learning journey and complete
            the next milestones.
          </p>
        </div>

        <div className="space-y-3">
          <RoadmapCard
            title="HTML & CSS"
            completed={true}
          />

          <RoadmapCard
            title="JavaScript"
            completed={true}
          />

          <RoadmapCard
            title="React"
            completed={true}
          />

          <RoadmapCard
            title="Next.js"
            completed={false}
          />

          <RoadmapCard
            title="System Design"
            completed={false}
          />
        </div>
      </section>
    </div>
  );
}