"use client";

import { useState } from "react";

import ResumeUploader from "./ResumeUploader";
import ResumeScore from "./ResumeScore";
import ResumeSuggestions from "./ResumeSuggestions";

export default function ResumeReview() {
  const [score, setScore] = useState(0);

  const [suggestions, setSuggestions] = useState<string[]>([]);

  function handleUpload(file: File) {
    console.log(file);

    // Temporary fake AI result
    setScore(82);

    setSuggestions([
      "Add more action verbs.",
      "Include measurable achievements.",
      "Mention React and Next.js.",
      "Improve ATS keywords.",
      "Reduce unnecessary content."
    ]);
  }

  return (
    <div className="space-y-8">

      <ResumeUploader onUpload={handleUpload} />

      <div className="grid gap-6 lg:grid-cols-2">

        <ResumeScore score={score} />

        <ResumeSuggestions
          suggestions={suggestions}
        />

      </div>

    </div>
  );
}