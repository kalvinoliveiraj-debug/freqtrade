/**
 * App state — the single source of truth for the learner's profile, progress,
 * gamification and SRS. Persisted to device storage so it survives restarts
 * and works offline (Blueprint 2.4 / Part X). Engine-level: holds no
 * language-specific knowledge, only the active pack id.
 */
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { LearningReason } from './types';
import {
  advanceStreak,
  HEARTS,
  regenHearts,
  STREAK_MILESTONES,
  XP,
} from './gamification';
import { GRADE, newCard, review, SrsCard, todayIso, type Grade } from './srs';

export interface Profile {
  onboarded: boolean;
  name: string;
  reason: LearningReason | null;
  dailyGoalMinutes: number;
  notificationTime: string; // "HH:MM"
  isPremium: boolean;
}

export interface AppState {
  packId: string;
  profile: Profile;

  xp: number;
  streak: number;
  lastActiveDate: string | null;
  hearts: number;
  heartsUpdatedAt: number;
  streakFreezes: number;

  completedDays: number[];
  srs: Record<string, SrsCard>;
  badges: string[];

  // ----- actions -----
  completeOnboarding: (p: Partial<Profile>) => void;
  setPremium: (v: boolean) => void;
  refreshHearts: () => void;
  loseHeart: () => void;
  /** Record a lesson finish: XP, streak, SRS scheduling, day completion. */
  finishLesson: (input: {
    dayNumber: number;
    perfect: boolean;
    isBoss: boolean;
    isPhaseEnd: boolean;
    results: { wordId: string; correct: boolean }[];
  }) => { xpGained: number; newMilestone: number | null };
  reset: () => void;
}

const initialProfile: Profile = {
  onboarded: false,
  name: '',
  reason: null,
  dailyGoalMinutes: 10,
  notificationTime: '19:00',
  isPremium: false,
};

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      packId: 'pt-pl',
      profile: initialProfile,
      xp: 0,
      streak: 0,
      lastActiveDate: null,
      hearts: HEARTS.max,
      heartsUpdatedAt: Date.now(),
      streakFreezes: 1,
      completedDays: [],
      srs: {},
      badges: [],

      completeOnboarding: (p) =>
        set((s) => ({ profile: { ...s.profile, ...p, onboarded: true } })),

      setPremium: (v) =>
        set((s) => ({
          profile: { ...s.profile, isPremium: v },
          streakFreezes: v ? 3 : 1,
          hearts: v ? HEARTS.max : s.hearts,
        })),

      refreshHearts: () => {
        const s = get();
        const { hearts, updatedAtMs } = regenHearts(
          s.hearts,
          s.heartsUpdatedAt,
          Date.now(),
          s.profile.isPremium,
        );
        if (hearts !== s.hearts || updatedAtMs !== s.heartsUpdatedAt) {
          set({ hearts, heartsUpdatedAt: updatedAtMs });
        }
      },

      loseHeart: () =>
        set((s) => {
          if (s.profile.isPremium) return s;
          const wasFull = s.hearts >= HEARTS.max;
          return {
            hearts: Math.max(0, s.hearts - 1),
            // Start the refill clock the moment we drop below full.
            heartsUpdatedAt: wasFull ? Date.now() : s.heartsUpdatedAt,
          };
        }),

      finishLesson: ({ dayNumber, perfect, isBoss, isPhaseEnd, results }) => {
        const s = get();
        const today = todayIso();
        const { streak, isNewDay } = advanceStreak(
          s.streak,
          s.lastActiveDate,
          today,
        );

        // XP accounting.
        let xpGained = XP.lessonComplete;
        if (perfect) xpGained += XP.perfectScore;
        if (isBoss) xpGained += XP.bossChallenge;
        if (isPhaseEnd) xpGained += XP.phaseComplete;
        if (isNewDay) xpGained += XP.streakDay;

        let newMilestone: number | null = null;
        if (isNewDay && STREAK_MILESTONES.includes(streak)) {
          newMilestone = streak;
          if (streak === 7) xpGained += XP.streak7;
          if (streak === 30) xpGained += XP.streak30;
        }

        // SRS scheduling for every practised word.
        const srs = { ...s.srs };
        for (const r of results) {
          const card = srs[r.wordId] ?? newCard(r.wordId);
          const grade: Grade = r.correct ? GRADE.GOOD : GRADE.AGAIN;
          srs[r.wordId] = review(card, grade);
        }

        const completedDays = s.completedDays.includes(dayNumber)
          ? s.completedDays
          : [...s.completedDays, dayNumber].sort((a, b) => a - b);

        const badges = newMilestone
          ? [...s.badges, `streak-${newMilestone}`]
          : s.badges;

        set({
          xp: s.xp + xpGained,
          streak,
          lastActiveDate: today,
          completedDays,
          srs,
          badges,
          streakFreezes:
            isNewDay && streak % 7 === 0
              ? Math.min(s.profile.isPremium ? 3 : 1, s.streakFreezes + 1)
              : s.streakFreezes,
        });

        return { xpGained, newMilestone };
      },

      reset: () =>
        set({
          profile: initialProfile,
          xp: 0,
          streak: 0,
          lastActiveDate: null,
          hearts: HEARTS.max,
          heartsUpdatedAt: Date.now(),
          streakFreezes: 1,
          completedDays: [],
          srs: {},
          badges: [],
        }),
    }),
    {
      name: 'polski-world-state-v1',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
    },
  ),
);
