"use client";

import { useState } from "react";

import { extractText } from "../services/extractText.service";
import { analyzeResume } from "../services/resumeAnalyzer.service";

export function useResumeReview() {
  const [loading, setLoading] = useState(false);

  const [score, setScore] = useState(0);

  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [skills, setSkills] = useState<string[]>([]);

  async function analyze(file: File) {
    setLoading(true);

    try {
      const text = await extractText(file);

      const result = await analyzeResume(text);

      setScore(result.score);

      setSuggestions(result.suggestions);

      setSkills(result.foundSkills);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    score,
    suggestions,
    skills,
    analyze,
  };
}