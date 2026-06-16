/**
 * Spaced Repetition engine — SM-2 (the Anki algorithm). Blueprint 2.4.
 *
 * Pure functions, no React, no storage. The store persists `SrsCard` records;
 * this module only computes the next state from a grade. Fully reusable across
 * every Language Pack.
 */

export interface SrsCard {
  wordId: string;
  easeFactor: number; // SM-2 "EF", starts at 2.5
  interval: number; // days until next review
  repetitions: number; // consecutive correct reviews
  dueDate: string; // ISO date (YYYY-MM-DD)
  lapses: number; // times forgotten
}

/** SM-2 quality grade: 0..5. We map app outcomes onto a useful subset. */
export type Grade = 0 | 1 | 2 | 3 | 4 | 5;

export const GRADE = {
  AGAIN: 2 as Grade, // wrong answer — below the 3.0 "pass" threshold
  HARD: 3 as Grade, // correct but effortful
  GOOD: 4 as Grade, // correct
  EASY: 5 as Grade, // correct and instant
} as const;

const DAY_MS = 24 * 60 * 60 * 1000;

export function todayIso(now: Date = new Date()): string {
  return now.toISOString().slice(0, 10);
}

function addDaysIso(iso: string, days: number): string {
  const d = new Date(iso + 'T00:00:00.000Z');
  return new Date(d.getTime() + Math.round(days) * DAY_MS).toISOString().slice(0, 10);
}

export function newCard(wordId: string, now: Date = new Date()): SrsCard {
  return {
    wordId,
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    dueDate: todayIso(now),
    lapses: 0,
  };
}

/**
 * Apply an SM-2 review. Grades >= 3 are a "pass"; < 3 resets the schedule.
 * The ease factor floors at 1.3 so notoriously hard words don't spiral.
 */
export function review(card: SrsCard, grade: Grade, now: Date = new Date()): SrsCard {
  let { easeFactor, interval, repetitions, lapses } = card;

  if (grade < 3) {
    repetitions = 0;
    interval = 1;
    lapses += 1;
  } else {
    repetitions += 1;
    if (repetitions === 1) interval = 1;
    else if (repetitions === 2) interval = 6;
    else interval = Math.round(interval * easeFactor);
  }

  easeFactor = easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
  if (easeFactor < 1.3) easeFactor = 1.3;

  return {
    ...card,
    easeFactor: Number(easeFactor.toFixed(2)),
    interval,
    repetitions,
    lapses,
    dueDate: addDaysIso(todayIso(now), interval),
  };
}

/** Cards due today or earlier — what the app should surface for review. */
export function dueCards(cards: SrsCard[], now: Date = new Date()): SrsCard[] {
  const today = todayIso(now);
  return cards
    .filter((c) => c.dueDate <= today)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
}
