interface Props {
  streak: number;
}

export default function StreakCard({
  streak,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">

      <h2 className="text-xl font-bold text-white">
        Daily Streak
      </h2>

      <p className="mt-5 text-5xl">
        🔥
      </p>

      <h1 className="mt-3 text-4xl font-black text-orange-400">
        {streak}
      </h1>

      <p className="mt-2 text-slate-400">
        Consecutive Days
      </p>

    </div>
  );
}