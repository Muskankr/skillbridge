export default function CategoryTabs() {
  const tabs = [
    "All",
    "Career",
    "Learning",
    "GitHub",
    "Interview",
    "Resume",
  ];

  return (
    <div className="flex flex-wrap gap-4">

      {tabs.map((tab) => (
        <button
          key={tab}
          className="rounded-full border border-white/10 bg-slate-900 px-5 py-2 text-sm transition hover:border-indigo-500 hover:bg-indigo-600"
        >
          {tab}
        </button>
      ))}

    </div>
  );
}