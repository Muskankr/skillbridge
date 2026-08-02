interface Props {
  challenge: any;
  onComplete: () => void;
}

export default function DailyChallengeCard({
  challenge,
  onComplete,
}: Props) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            {challenge.title}
          </h2>

          <p className="mt-2 text-slate-400">
            {challenge.description}
          </p>

        </div>

        <div className="text-right">

          <p className="text-yellow-400 font-bold">
            +{challenge.xp} XP
          </p>

          {challenge.completed ? (
            <span className="mt-2 inline-block rounded-lg bg-green-600 px-4 py-2 text-white">
              Completed
            </span>
          ) : (
            <button
              onClick={onComplete}
              className="mt-2 rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-500"
            >
              Complete
            </button>
          )}

        </div>

      </div>

    </div>
  );
}