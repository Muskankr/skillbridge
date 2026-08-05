interface Props {
  skills: string[];
}

export default function ResumeSkills({
  skills,
}: Props) {
  return (
    <div className="rounded-2xl bg-slate-900 p-6">

      <h2 className="text-xl font-bold">
        Skills Detected
      </h2>

      <div className="mt-5 flex flex-wrap gap-3">

        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm"
          >
            {skill}
          </span>
        ))}

      </div>

    </div>
  );
}