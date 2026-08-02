export function calculateLevel(xp: number) {
  const levels = [
    100,
    250,
    500,
    800,
    1200,
    2000,
    3000,
    4500,
    6000,
    8000,
  ];

  let level = 1;

  for (let i = 0; i < levels.length; i++) {
    if (xp >= levels[i]) {
      level = i + 2;
    }
  }

  const next =
    levels[level - 1] || levels[levels.length - 1];

  return {
    level,
    next,
    progress:
      level === 1
        ? (xp / 100) * 100
        : ((xp - (levels[level - 2] || 0)) /
            (next - (levels[level - 2] || 0))) *
          100,
  };
}