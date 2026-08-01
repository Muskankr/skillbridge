"use client";

import { calculateLevel, nextLevelXP } from "@/features/xp/utils/xpCalculator";

interface Props {
  xp: number;
}

export default function XPCard({ xp }: Props) {
  const level = calculateLevel(xp);

  const nextXP = nextLevelXP(level);

  const progress = (xp / nextXP) * 100;

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">

      <h2 className="text-xl font-bold text-white">
        Developer Level
      </h2>

      <p className="mt-4 text-5xl font-black text-indigo-400">
        Lv. {level}
      </p>

      <p className="mt-3 text-slate-400">
        {xp} XP
      </p>

      <div className="mt-6 h-3 rounded-full bg-slate-700">

        <div
          className="h-3 rounded-full bg-indigo-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </div>
  );
}