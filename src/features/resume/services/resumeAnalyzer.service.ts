import { calculateATS } from "../utils/atsScore";

export async function analyzeResume(text: string) {
  return calculateATS(text);
}