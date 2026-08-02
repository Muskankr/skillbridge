"use client";

import { useXP } from "@/features/xp/hooks/useXP";
import XPCard from "./XPCard";
import RecentActivity from "./RecentActivity";

export default function XPDashboard() {
  const {
  xp,
  level,
  nextLevel,
  progress,
  loading,
} = useXP();

  if (loading) {
    return (
      <div className="text-center text-white">
        Loading XP...
      </div>
    );
  }


  return (
    <main className="space-y-10">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-black">
            XP System
          </h1>

          <p className="mt-2 text-slate-400">
            Earn XP by completing activities and level up your developer journey.
          </p>

        </div>

      </div>

      <section className="rounded-3xl border border-white/10 bg-slate-900 p-8">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-slate-400">
              Total XP
            </p>

            <h2 className="mt-2 text-6xl font-black text-indigo-400">
              {xp}
            </h2>

          </div>

          <div className="text-right">

            <p className="text-slate-400">
              Level
            </p>

            <h2 className="mt-2 text-5xl font-black text-yellow-400">
              {level}
            </h2>

          </div>

        </div>

        <div className="mt-8">

          <div className="mb-2 flex justify-between text-sm text-slate-400">

            <span>
              Progress to Level {level + 1}
            </span>

            <span>
              {xp % nextLevel}/{nextLevel}
            </span>

          </div>

          <div className="h-4 rounded-full bg-slate-800">

            <div
              className="h-4 rounded-full bg-indigo-500 transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </section>

      <section className="grid gap-6 md:grid-cols-3">

        <XPCard
          title="Current XP"
          value={xp}
        />

        <XPCard
          title="Current Level"
          value={level}
        />

        <XPCard
          title="Next Level XP"
          value={nextLevel}
        />

      </section>

      <RecentActivity />

    </main>
  );
}