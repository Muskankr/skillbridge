export function calculateLevel(xp: number) {
  return Math.floor(xp / 500) + 1;
}

export function nextLevelXP(level: number) {
  return level * 500;
}