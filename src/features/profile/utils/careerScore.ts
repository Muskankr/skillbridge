export function calculateCareerScore(
  profileCompletion: number
) {
  return Math.min(profileCompletion, 100);
}