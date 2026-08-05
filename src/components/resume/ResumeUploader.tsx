"use client";

import { useState } from "react";

interface Props {
  onUpload: (file: File) => void;
}

export default function ResumeUploader({ onUpload }: Props) {
  const [fileName, setFileName] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setFileName(file.name);

    onUpload(file);
  }

  return (
    <div className="rounded-2xl border border-dashed border-indigo-500 p-10 text-center">

      <h2 className="text-2xl font-bold">
        Upload Resume
      </h2>

      <p className="mt-3 text-slate-400">
        Upload PDF Resume
      </p>

      <input
        type="file"
        accept=".pdf"
        onChange={handleChange}
        className="mt-6"
      />

      {fileName && (
        <p className="mt-4 text-green-400">
          {fileName}
        </p>
      )}

    </div>
  );
}