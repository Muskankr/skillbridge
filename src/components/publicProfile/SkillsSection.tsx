interface Props {
  profile: any;
}

export default function SkillsSection({ profile }: Props) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900 p-8">

      <h2 className="mb-6 text-3xl font-bold text-white">
        Skills
      </h2>

      <div className="flex flex-wrap gap-4">

        <span className="rounded-full bg-indigo-600 px-5 py-2 text-white">
          React
        </span>

        <span className="rounded-full bg-indigo-600 px-5 py-2 text-white">
          Next.js
        </span>

        <span className="rounded-full bg-indigo-600 px-5 py-2 text-white">
          TypeScript
        </span>

        <span className="rounded-full bg-indigo-600 px-5 py-2 text-white">
          Python
        </span>

        <span className="rounded-full bg-indigo-600 px-5 py-2 text-white">
          Supabase
        </span>

      </div>

    </section>
  );
}