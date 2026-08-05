export function generateRoadmap(goal: string): string[] {

  const g = goal.toLowerCase();

  if (g.includes("frontend")) {
    return [
      "Learn HTML",
      "Learn CSS",
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Build 5 Projects",
      "Deploy Projects",
      "Interview Preparation",
    ];
  }

  if (g.includes("backend")) {
    return [
      "Python",
      "Flask",
      "SQL",
      "REST APIs",
      "Authentication",
      "Docker",
      "Deployment",
      "Interview Preparation",
    ];
  }

  if (g.includes("ai")) {
    return [
      "Python",
      "NumPy",
      "Pandas",
      "Machine Learning",
      "Deep Learning",
      "Projects",
      "Kaggle",
    ];
  }

  return [
    "Programming",
    "DSA",
    "Projects",
    "Git",
    "Interview",
  ];
}