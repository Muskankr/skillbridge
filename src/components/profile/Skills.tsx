"use client";

interface Props {
  skills: string[];
}

export default function Skills({ skills }: Props) {
  return (
    <section className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">

      <h2 className="text-2xl font-bold">
        Skills
      </h2>

      <div className="mt-6 flex flex-wrap gap-4">

        {skills.map((skill) => (

          <span
            key={skill}
            className="rounded-full bg-indigo-600/20 px-5 py-2 text-indigo-300"
          >
            {skill}
          </span>

        ))}

      </div>

    </section>
  );
}