interface Props {
  score: number;
}

export default function ResumeScore({
  score,
}: Props) {
  return (
    <div className="rounded-2xl bg-slate-900 p-6">

      <h2 className="text-xl font-bold">
        ATS Score
      </h2>

      <div className="mt-6 text-center">

        <p className="text-6xl font-black text-indigo-400">
          {score}
        </p>

        <p className="mt-2 text-slate-400">
          out of 100
        </p>

      </div>

    </div>
  );
}