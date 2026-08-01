interface Challenge {
  id: number;
  title: string;
  category: string;
  xp: number;
  completed: boolean;
}

export default function ChallengeCard({
  challenge,
}: {
  challenge: Challenge;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-indigo-500">

      <div className="flex items-center justify-between">

        <span className="rounded-full bg-indigo-600/20 px-3 py-1 text-sm text-indigo-300">
          {challenge.category}
        </span>

        <span
          className={`font-bold ${
            challenge.completed
              ? "text-green-400"
              : "text-yellow-400"
          }`}
        >
          {challenge.completed ? "Completed" : "Pending"}
        </span>

      </div>

      <h2 className="mt-5 text-2xl font-bold">
        {challenge.title}
      </h2>

      <p className="mt-3 text-indigo-400 font-semibold">
        +{challenge.xp} XP
      </p>

      <button
        className={`mt-6 w-full rounded-xl py-3 font-semibold transition ${
          challenge.completed
            ? "bg-green-600"
            : "bg-indigo-600 hover:bg-indigo-500"
        }`}
      >
        {challenge.completed
          ? "Completed"
          : "Mark Complete"}
      </button>

    </div>
  );
}