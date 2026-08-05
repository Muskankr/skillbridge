interface Props {
  suggestions: string[];
}

export default function ResumeSuggestions({
  suggestions,
}: Props) {
  return (
    <div className="rounded-2xl bg-slate-900 p-6">

      <h2 className="text-xl font-bold">
        Suggestions
      </h2>

      <ul className="mt-6 space-y-3">

        {suggestions.map((item, index) => (
          <li
            key={index}
            className="rounded-lg bg-slate-800 p-3"
          >
            {item}
          </li>
        ))}

      </ul>

    </div>
  );
}