import ResumeStats from "./ResumeStats";
import ResumeCard from "./ResumeCard";
import TemplateCard from "./TemplateCard";
import { resumes, templates } from "@/constants/resumes";

export default function ResumeDashboard() {
  return (
    <main className="space-y-10">

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-4xl font-black">
            Resume Builder
          </h1>

          <p className="mt-2 text-slate-400">
            Create, edit and manage professional resumes.
          </p>
        </div>

        <button className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold hover:bg-indigo-500">
          + New Resume
        </button>

      </div>

      <ResumeStats />

      <section>

        <h2 className="mb-6 text-2xl font-bold">
          My Resumes
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
            />
          ))}
        </div>

      </section>

      <section>

        <h2 className="mb-6 text-2xl font-bold">
          Templates
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {templates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
            />
          ))}
        </div>

      </section>

    </main>
  );
}