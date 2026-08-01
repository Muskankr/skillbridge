interface Achievement {
  title: string;
  category: string;
  organization: string;
  date: string;
  description: string;
}

interface Props {
  achievement: Achievement;
}

export default function AchievementCard({
  achievement,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 transition hover:border-indigo-500">

      <span className="rounded-full bg-indigo-600/20 px-3 py-1 text-sm text-indigo-300">
        {achievement.category}
      </span>

      <h2 className="mt-4 text-2xl font-bold">
        {achievement.title}
      </h2>

      <p className="mt-2 text-slate-400">
        {achievement.organization}
      </p>

      <p className="text-sm text-slate-500">
        {achievement.date}
      </p>

      <p className="mt-5 text-slate-300">
        {achievement.description}
      </p>

    </div>
  );
}