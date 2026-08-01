import { FileText } from "lucide-react";

interface Resume {
  id: number;
  name: string;
  template: string;
  updated: string;
}

export default function ResumeCard({
  resume,
}: {
  resume: Resume;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 transition hover:border-indigo-500">

      <FileText className="h-10 w-10 text-indigo-400" />

      <h2 className="mt-5 text-2xl font-bold">
        {resume.name}
      </h2>

      <p className="mt-2 text-slate-400">
        Template: {resume.template}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        Updated {resume.updated}
      </p>

      <button className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 hover:bg-indigo-500">
        Edit Resume
      </button>

    </div>
  );
}