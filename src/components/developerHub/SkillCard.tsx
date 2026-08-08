interface Props {
  name: string;
  progress: number;
}

export default function SkillCard({
  name,
  progress,
}: Props) {
  const safeProgress = Math.min(
    Math.max(progress, 0),
    100
  );

  return (
    <div className="rounded-2xl border border-[#262626] bg-[#050505] p-5">
      <div className="flex items-center justify-between">
        <span className="font-medium text-white">
          {name}
        </span>

        <span className="text-sm font-semibold text-zinc-400">
          {safeProgress}%
        </span>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#1a1a1a]">
        <div
          style={{ width: `${safeProgress}%` }}
          className="h-full rounded-full bg-white transition-all duration-500"
        />
      </div>
    </div>
  );
}