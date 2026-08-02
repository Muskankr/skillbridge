export async function getGithubProfile(username: string) {
  const response = await fetch(
    `https://api.github.com/users/${username}`
  );

  if (!response.ok) {
    return null;
  }

  return await response.json();
}

export async function getGithubRepos(username: string) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`
  );

  if (!response.ok) {
    return [];
  }

  return await response.json();
}