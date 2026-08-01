export function calculateLevel(xp: number) {
  if (xp < 100)
    return {
      level: 1,
      next: 100,
    };

  if (xp < 250)
    return {
      level: 2,
      next: 250,
    };

  if (xp < 500)
    return {
      level: 3,
      next: 500,
    };

  if (xp < 800)
    return {
      level: 4,
      next: 800,
    };

  if (xp < 1200)
    return {
      level: 5,
      next: 1200,
    };

  return {
    level: 6,
    next: 2000,
  };
}