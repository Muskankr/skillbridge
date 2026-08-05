const SKILLS = [
  "python",
  "java",
  "c++",
  "c",
  "javascript",
  "typescript",
  "react",
  "next",
  "next.js",
  "node",
  "node.js",
  "express",
  "mongodb",
  "mysql",
  "sql",
  "postgresql",
  "supabase",
  "firebase",
  "docker",
  "aws",
  "azure",
  "git",
  "github",
  "html",
  "css",
  "tailwind",
  "bootstrap",
  "machine learning",
  "deep learning",
  "flask",
  "django",
];

export function detectSkills(text: string): string[] {
  const lower = text.toLowerCase();

  return SKILLS.filter((skill) => lower.includes(skill));
}