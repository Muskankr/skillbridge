import { challengeSummary } from "@/constants/challenges";

export default function ChallengeSummary() {

  const progress =
    (challengeSummary.completed /
      challengeSummary.total) *
    100;

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">

      <div className="grid gap-8 md:grid-cols-4">

        <div>
          <p className="text-slate-400">
            Today's Progress
          </p>

          <h2 className="mt-3 text-4xl font-black">
            {challengeSummary.completed}/
            {challengeSummary.total}
          </h2>
        </div>

        <div>
          <p className="text-slate-400">
            Daily Reward
          </p>

          <h2 className="mt-3 text-4xl font-black text-indigo-400">
            {challengeSummary.reward} XP
          </h2>
        </div>

        <div>
          <p className="text-slate-400">
            Current Streak
          </p>

          <h2 className="mt-3 text-4xl font-black text-orange-400">
            🔥 {challengeSummary.streak}
          </h2>
        </div>

        <div>
          <p className="text-slate-400">
            Completion
          </p>

          <h2 className="mt-3 text-4xl font-black">
            {Math.round(progress)}%
          </h2>
        </div>

      </div>

      <div className="mt-8 h-4 rounded-full bg-slate-800">

        <div
          className="h-4 rounded-full bg-indigo-500"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

    </section>
  );
}