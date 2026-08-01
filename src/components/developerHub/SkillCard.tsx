interface Props {
  name: string;
  progress: number;
}

export default function SkillCard({
  name,
  progress,
}: Props) {
  return (
    <div className="rounded-xl bg-slate-900 border border-white/10 p-5">

      <div className="flex justify-between">

        <span className="text-white">
          {name}
        </span>

        <span className="text-indigo-400">
          {progress}%
        </span>

      </div>

      <div className="mt-3 h-3 rounded-full bg-slate-700">

        <div
          style={{ width: `${progress}%` }}
          className="h-3 rounded-full bg-indigo-500"
        />

      </div>

    </div>
  );
}