interface Props {
  title: string;
  value: string | number;
}

export default function StatsCard({
  title,
  value,
}: Props) {
  return (
    <div className="rounded-2xl border border-[#262626] bg-[#050505] p-6 transition hover:border-[#3a3a3a]">
      <p className="text-sm font-medium text-zinc-500">
        {title}
      </p>

      <h2 className="mt-3 text-3xl font-bold text-white">
        {value}
      </h2>
    </div>
  );
}