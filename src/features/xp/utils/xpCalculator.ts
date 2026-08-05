export function calculateLevel(xp: number) {
  return Math.floor(xp / 100) + 1;
}

export function nextLevelXP(xp: number) {
  const level = calculateLevel(xp);
  return level * 100;
}