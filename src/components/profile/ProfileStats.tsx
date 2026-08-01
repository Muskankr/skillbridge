"use client";

interface Props {
  stats: {
    title: string;
    value: string;
  }[];
}

export default function ProfileStats({ stats }: Props) {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {stats.map((item) => (

        <div
          key={item.title}
          className="rounded-3xl border border-white/10 bg-slate-900/60 p-6"
        >
          <p className="text-slate-400">
            {item.title}
          </p>

          <h2 className="mt-3 text-5xl font-black text-indigo-400">
            {item.value}
          </h2>

        </div>

      ))}

    </section>
  );
}