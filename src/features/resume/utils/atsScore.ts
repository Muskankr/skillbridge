import { detectSkills } from "./keywordChecker";

export interface ATSResult {
  score: number;
  suggestions: string[];
  foundSkills: string[];
}

export function calculateATS(text: string): ATSResult {
  let score = 100;

  const suggestions: string[] = [];

  const lower = text.toLowerCase();

  // Email
  if (!/\S+@\S+\.\S+/.test(lower)) {
    score -= 10;
    suggestions.push("Add an email address.");
  }

  // Phone
  if (!/\d{10}/.test(lower)) {
    score -= 10;
    suggestions.push("Add a phone number.");
  }

  // LinkedIn
  if (!lower.includes("linkedin")) {
    score -= 10;
    suggestions.push("Add your LinkedIn profile.");
  }

  // GitHub
  if (!lower.includes("github")) {
    score -= 10;
    suggestions.push("Add your GitHub profile.");
  }

  // Projects
  if (!lower.includes("project")) {
    score -= 15;
    suggestions.push("Include a Projects section.");
  }

  // Education
  if (
    !lower.includes("education") &&
    !lower.includes("b.tech") &&
    !lower.includes("college")
  ) {
    score -= 10;
    suggestions.push("Add your education details.");
  }

  // Experience
  if (
    !lower.includes("experience") &&
    !lower.includes("internship")
  ) {
    score -= 10;
    suggestions.push("Mention internships or experience.");
  }

  // Certificates
  if (
    !lower.includes("certificate") &&
    !lower.includes("certification")
  ) {
    score -= 5;
    suggestions.push("Add certifications.");
  }

  const skills = detectSkills(text);

  if (skills.length < 5) {
    score -= 10;
    suggestions.push("Add more technical skills.");
  }

  const words = text.split(/\s+/).length;

  if (words < 250) {
    score -= 10;
    suggestions.push("Resume is too short.");
  }

  if (words > 900) {
    score -= 5;
    suggestions.push("Resume is too long.");
  }

  if (score < 0) score = 0;

  return {
    score,
    suggestions,
    foundSkills: skills,
  };
}