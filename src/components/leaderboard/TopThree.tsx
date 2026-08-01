import { topThree } from "@/constants/leaderboard";

export default function TopThree() {
  return (
    <section className="grid gap-6 md:grid-cols-3">

      {topThree.map((user) => (

        <div
          key={user.rank}
          className="rounded-3xl border border-yellow-500/30 bg-slate-900/60 p-6 text-center"
        >

          <div className="text-5xl">
            {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉"}
          </div>

          <h2 className="mt-4 text-2xl font-black">
            {user.name}
          </h2>

          <p className="mt-2 text-indigo-400 font-bold">
            {user.xp} XP
          </p>

        </div>

      ))}

    </section>
  );
}