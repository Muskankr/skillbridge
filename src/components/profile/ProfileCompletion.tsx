"use client";

interface Props {
  value: number;
}

export default function ProfileCompletion({ value }: Props) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">

      <div className="flex justify-between">

        <h2 className="text-2xl font-bold">
          Profile Completion
        </h2>

        <span className="text-4xl font-black text-indigo-400">
          {value}%
        </span>

      </div>

      <div className="mt-6 h-4 rounded-full bg-slate-800">

        <div
          className="h-4 rounded-full bg-indigo-500"
          style={{ width: `${value}%` }}
        />

      </div>

    </section>
  );
}