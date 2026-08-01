interface Template {
  id: number;
  name: string;
}

export default function TemplateCard({
  template,
}: {
  template: Template;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 transition hover:border-indigo-500">

      <div className="h-40 rounded-xl bg-slate-800" />

      <h2 className="mt-5 text-xl font-bold">
        {template.name}
      </h2>

      <button className="mt-5 rounded-xl border border-indigo-500 px-5 py-2 text-indigo-300 hover:bg-indigo-500/10">
        Preview
      </button>

    </div>
  );
}