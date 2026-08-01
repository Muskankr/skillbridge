export function calculateProfileCompletion(profile: {
  full_name: string;
  username: string;
  headline: string;
  bio: string;
  college: string;
  branch: string;
  graduation_year: string;
  github_url: string;
  linkedin_url: string;
  portfolio_url: string;
  location: string;
}) {
  let score = 0;

  if (profile.full_name) score += 10;
  if (profile.username) score += 10;
  if (profile.headline) score += 10;
  if (profile.bio) score += 10;
  if (profile.college) score += 10;
  if (profile.branch) score += 10;
  if (profile.graduation_year) score += 10;
  if (profile.github_url) score += 10;
  if (profile.linkedin_url) score += 10;
  if (profile.portfolio_url) score += 5;
  if (profile.location) score += 5;

  return score;
}