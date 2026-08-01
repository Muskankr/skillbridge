"use client";

import { useXP } from "@/features/xp/hooks/useXP";

export default function LevelCard() {

  const {
    xp,
    level,
    nextLevel,
    loading,
  } = useXP();

  if (loading)
    return null;

  const progress =
    (xp / nextLevel) * 100;

  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">

      <div className="flex justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            Developer Level
          </h2>

          <p className="mt-2 text-slate-400">

            Keep building to level up 🚀

          </p>

        </div>

        <div className="text-right">

          <h1 className="text-5xl font-black text-yellow-400">

            Lv {level}

          </h1>

          <p className="mt-2">

            {xp} XP

          </p>

        </div>

      </div>

      <div className="mt-8 h-4 rounded-full bg-slate-800">

        <div
          className="h-full rounded-full bg-yellow-500 transition-all duration-700"
          style={{
            width: `${Math.min(progress,100)}%`,
          }}
        />

      </div>

      <p className="mt-4 text-sm text-slate-400">

        {nextLevel - xp} XP until next level

      </p>

    </section>
  );
}