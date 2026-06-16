/**
 * Gamification math — XP, levels, streak, hearts. Blueprint Part IV.
 * Pure functions; the store holds the state and calls these.
 */

/** XP table (Blueprint 4.4). */
export const XP = {
  lessonComplete: 10,
  perfectScore: 5,
  streakDay: 3,
  bossChallenge: 25,
  phaseComplete: 100,
  reviewSession: 5,
  streak7: 50,
  streak30: 200,
} as const;

/**
 * XP required to *reach* each level index (0-based). Level names live in the
 * pack's branding so they localise per language. Curve is gently super-linear.
 */
export function xpForLevel(levelIndex: number): number {
  if (levelIndex <= 0) return 0;
  return Math.round(100 * levelIndex * (levelIndex + 1) * 0.5);
}

export function levelFromXp(xp: number, levelCount: number): number {
  let level = 0;
  while (level + 1 < levelCount && xp >= xpForLevel(level + 1)) level += 1;
  return level;
}

export interface LevelProgress {
  level: number;
  name: string;
  current: number; // xp into the level
  needed: number; // xp span of the level
  ratio: number; // 0..1
}

export function levelProgress(xp: number, levelNames: string[]): LevelProgress {
  const level = levelFromXp(xp, levelNames.length);
  const floor = xpForLevel(level);
  const ceil = level + 1 < levelNames.length ? xpForLevel(level + 1) : floor;
  const span = Math.max(1, ceil - floor);
  return {
    level,
    name: levelNames[level] ?? `Level ${level + 1}`,
    current: xp - floor,
    needed: ceil - floor,
    ratio: ceil === floor ? 1 : Math.min(1, (xp - floor) / span),
  };
}

/** Milestone days that earn a unique badge + full-screen moment (Blueprint 4.2). */
export const STREAK_MILESTONES = [7, 14, 30, 50, 100];

/**
 * Update a streak given the last active date. Loss aversion is the point
 * (Blueprint 4.1): a same-day return is a no-op, the next calendar day
 * increments, and any larger gap (absent a freeze) resets to 1.
 */
export function advanceStreak(
  current: number,
  lastActiveIso: string | null,
  todayIso: string,
): { streak: number; isNewDay: boolean } {
  if (!lastActiveIso) return { streak: 1, isNewDay: true };
  if (lastActiveIso === todayIso) return { streak: current, isNewDay: false };

  const diff = dayDiff(lastActiveIso, todayIso);
  if (diff === 1) return { streak: current + 1, isNewDay: true };
  return { streak: 1, isNewDay: true }; // missed a day, no freeze applied
}

function dayDiff(aIso: string, bIso: string): number {
  const a = new Date(aIso + 'T00:00:00.000Z').getTime();
  const b = new Date(bIso + 'T00:00:00.000Z').getTime();
  return Math.round((b - a) / (24 * 60 * 60 * 1000));
}

/** ----- Hearts (the gentle freemium gate, Blueprint 4.5). ----- */
export const HEARTS = {
  max: 5,
  refillHours: 5,
} as const;

/**
 * Regenerate hearts over time. Start generous: one heart per `refillHours`.
 * Premium users are passed `unlimited = true` and always sit at max.
 */
export function regenHearts(
  hearts: number,
  updatedAtMs: number,
  nowMs: number,
  unlimited: boolean,
): { hearts: number; updatedAtMs: number } {
  if (unlimited) return { hearts: HEARTS.max, updatedAtMs: nowMs };
  if (hearts >= HEARTS.max) return { hearts, updatedAtMs: nowMs };

  const elapsedHours = (nowMs - updatedAtMs) / (60 * 60 * 1000);
  const gained = Math.floor(elapsedHours / HEARTS.refillHours);
  if (gained <= 0) return { hearts, updatedAtMs };

  const next = Math.min(HEARTS.max, hearts + gained);
  // Carry the remainder so partial progress toward the next heart isn't lost.
  const consumed = (next - hearts) * HEARTS.refillHours * 60 * 60 * 1000;
  return { hearts: next, updatedAtMs: updatedAtMs + consumed };
}
