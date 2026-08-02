interface XPCardProps {
  title: string;
  value: string | number;
}

export default function XPCard({
  title,
  value,
}: XPCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-indigo-500">

      <p className="text-slate-400">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-black text-indigo-400">
        {value}
      </h2>

    </div>
  );
}