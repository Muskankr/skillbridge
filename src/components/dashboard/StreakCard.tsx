"use client";

interface StreakCardProps {
  streak: number;
  longestStreak: number;
}

export default function StreakCard({
  streak,
  longestStreak,
}: StreakCardProps) {
  const reward =
    streak >= 30
      ? 150
      : streak >= 14
      ? 75
      : streak >= 7
      ? 50
      : streak >= 3
      ? 20
      : 10;

  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            🔥 Daily Streak
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Keep your learning streak alive!
          </p>

        </div>

        <div className="text-right">

          <p className="text-5xl font-black text-orange-400">
            {streak}
          </p>

          <p className="text-slate-400">
            Days
          </p>

        </div>

      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-slate-800 p-4">

          <p className="text-sm text-slate-400">
            Longest
          </p>

          <p className="mt-2 text-2xl font-bold text-purple-400">
            {longestStreak}
          </p>

        </div>

        <div className="rounded-xl bg-slate-800 p-4">

          <p className="text-sm text-slate-400">
            Tomorrow Reward
          </p>

          <p className="mt-2 text-2xl font-bold text-yellow-400">
            +{reward} XP
          </p>

        </div>

      </div>

      <div className="mt-6">

        <p className="mb-3 text-sm text-slate-400">
          This Week
        </p>

        <div className="flex justify-between">

          {days.map((day, index) => (

            <div
              key={index}
              className="flex flex-col items-center gap-2"
            >

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${
                  index < (streak % 7)
                    ? "bg-orange-500"
                    : "bg-slate-700"
                }`}
              >
                {index < (streak % 7) ? "🔥" : "○"}
              </div>

              <span className="text-xs text-slate-400">
                {day}
              </span>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}