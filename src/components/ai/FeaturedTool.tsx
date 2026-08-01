export default function FeaturedTool() {
  return (
    <section className="overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-600 to-violet-600 p-10">

      <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
        Featured Tool
      </span>

      <h1 className="mt-6 text-5xl font-black">
        Resume Analyzer
      </h1>

      <p className="mt-5 max-w-2xl text-lg text-indigo-100">
        Upload your resume, improve ATS compatibility, receive actionable
        suggestions, and prepare for placements with detailed feedback.
      </p>

      <button className="mt-8 rounded-xl bg-white px-7 py-3 font-bold text-slate-900 transition hover:scale-105">
        Try Now
      </button>

    </section>
  );
}