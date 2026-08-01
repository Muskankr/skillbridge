export default function ResumeStats() {
  return (
    <div className="grid gap-6 md:grid-cols-3">

      <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6">
        <p className="text-slate-400">Total Resumes</p>
        <h2 className="mt-3 text-4xl font-black">2</h2>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6">
        <p className="text-slate-400">Templates</p>
        <h2 className="mt-3 text-4xl font-black">3</h2>
      </div>

      <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-6">
        <p className="text-slate-400">ATS Score</p>
        <h2 className="mt-3 text-4xl font-black">--</h2>
      </div>

    </div>
  );
}