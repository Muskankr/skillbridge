export async function getGithubProfile(username: string) {
  const res = await fetch(
    `https://api.github.com/users/${username}`
  );

  if (!res.ok) return null;

  return res.json();
}

export async function getGithubRepos(username: string) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
  );

  if (!res.ok) return [];

  return res.json();
}