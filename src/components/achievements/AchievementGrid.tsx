import AchievementCard from "./AchievementCard";
import { achievements } from "@/constants/achievements";

export default function AchievementGrid() {
  return (
    <main className="space-y-8">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-black">
            Achievements
          </h1>

          <p className="mt-2 text-slate-400">
            Showcase hackathons, leadership roles and awards.
          </p>

        </div>

        <div className="flex gap-3">

          <input
            placeholder="Search achievements..."
            className="rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-indigo-500"
          />

          <button className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold hover:bg-indigo-500">
            + Add Achievement
          </button>

        </div>

      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {achievements.map((achievement) => (
          <AchievementCard
            key={achievement.title}
            achievement={achievement}
          />
        ))}

      </div>

    </main>
  );
}