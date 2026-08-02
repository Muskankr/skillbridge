import StatsCard from "./StatsCard";
import SkillCard from "./SkillCard";
import RoadmapCard from "./RoadmapCard";
import GithubCard from "../github/GithubCard";
import { useDeveloperHub } from "@/features/developerHub/hooks/useDeveloperHub";

export default function DeveloperHub() {
  const { data, loading } = useDeveloperHub();

if (loading) {
  return (
    <div className="text-center text-white py-20">
      Loading Developer Hub...
    </div>
  );
}

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-white">
          Developer Hub
        </h1>

        <p className="mt-2 text-slate-400">
          Track your coding growth and learning roadmap.
        </p>

      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-4">

        <StatsCard
  title="XP"
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
  title="Level"
  value={data.level}
/>

      </div>
      <GithubCard githubUrl={data.profile?.github_url} />

      {/* Skills */}

      <div>

        <h2 className="mb-5 text-2xl font-bold text-white">
          Skill Progress
        </h2>

        <div className="space-y-5">

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

      </div>

      {/* Roadmap */}

      <div>

        <h2 className="mb-5 text-2xl font-bold text-white">
          Learning Roadmap
        </h2>

        <div className="space-y-4">

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

      </div>

    </div>
  );
}