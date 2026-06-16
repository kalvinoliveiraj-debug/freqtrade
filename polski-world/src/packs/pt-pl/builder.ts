/**
 * Curriculum builder — turns vocabulary into a balanced, playable Day.
 *
 * This is engine-flavoured helper code that lives in the pack: it knows nothing
 * Polish-specific, it just assembles exercises from `VocabEntry`s plus any
 * hand-authored sentences. Deterministic (seeded) so the generated content is
 * stable across runs and unit-testable.
 */
import type {
  Cefr,
  Day,
  Exercise,
  GrammarPoint,
  Phase,
  VocabEntry,
} from '../../engine/types';
import { vocabById } from './vocabulary';

/** Tiny deterministic PRNG (mulberry32) so builds are reproducible. */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rand: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function distractors(
  pool: VocabEntry[],
  exclude: string,
  field: 'base' | 'target',
  n: number,
  rand: () => number,
): string[] {
  const options = shuffle(
    pool.filter((v) => v.id !== exclude).map((v) => v[field]),
    rand,
  );
  // De-dupe in case base/target collides, then take n.
  return [...new Set(options)].slice(0, n);
}

export interface AuthoredSentence {
  /** PT prompt the learner translates / completes. */
  prompt: string;
  /** Correct PL token order. */
  answer: string[];
  /** Vocab ids practised (for SRS). */
  practises: string[];
  /** If set, render as a fill-in-the-blank instead of a sentence builder. */
  blank?: { sentence: string; answer: string; options: string[] };
  distractors?: string[];
}

export interface DaySpec {
  dayNumber: number;
  phase: Phase;
  cefrTarget: Cefr;
  title: { base: string; target: string };
  objectives: string[];
  /** New vocab introduced this day. */
  vocabIds: string[];
  /** Ids usable as distractors (typically current + earlier days). */
  distractorPool: string[];
  grammarPoint?: GrammarPoint;
  cultureBridge?: string;
  sentences?: AuthoredSentence[];
  isReviewDay?: boolean;
  isBossDay?: boolean;
  /** Ids to review (review/boss days that introduce no new vocab). */
  reviewIds?: string[];
  reward?: { xp: number; badge?: string };
}

export function buildDay(spec: DaySpec): Day {
  const rand = rng(spec.dayNumber * 1000 + 7);
  const pool = spec.distractorPool.map((id) => vocabById[id]).filter(Boolean);
  const newVocab = spec.vocabIds.map((id) => vocabById[id]).filter(Boolean);
  const focus = spec.isReviewDay || spec.isBossDay
    ? (spec.reviewIds ?? spec.distractorPool).map((id) => vocabById[id]).filter(Boolean)
    : newVocab;

  const exercises: Exercise[] = [];
  let n = 0;
  const eid = () => `d${spec.dayNumber}-e${++n}`;

  focus.forEach((v, i) => {
    const cycle = i % 4;
    if (cycle === 0) {
      // Tap the translation: PT prompt → choose PL.
      exercises.push({
        id: eid(),
        type: 'tap_translation',
        practises: [v.id],
        prompt: v.base,
        speak: v.target,
        answer: v.target,
        options: shuffle([v.target, ...distractors(pool, v.id, 'target', 3, rand)], rand),
      });
    } else if (cycle === 1) {
      // Listen & tap: hear PL → choose PL written form.
      exercises.push({
        id: eid(),
        type: 'listen_tap',
        practises: [v.id],
        speak: v.target,
        answer: v.target,
        options: shuffle([v.target, ...distractors(pool, v.id, 'target', 2, rand)], rand),
      });
    } else if (cycle === 2) {
      // True/False: is this PT↔PL pair correct? Flip half of them.
      const flip = rand() < 0.5 && pool.length > 1;
      const wrong = distractors(pool, v.id, 'base', 1, rand)[0] ?? v.base;
      exercises.push({
        id: eid(),
        type: 'true_false',
        practises: [v.id],
        target: v.target,
        base: flip ? wrong : v.base,
        isCorrect: !flip,
      });
    } else {
      // Type what you hear (dictation).
      exercises.push({
        id: eid(),
        type: 'type_what_you_hear',
        practises: [v.id],
        speak: v.target,
        answer: v.target,
        hint: v.base,
      });
    }
  });

  // Authored sentences (sentence builder or fill-in-the-blank).
  for (const s of spec.sentences ?? []) {
    if (s.blank) {
      exercises.push({
        id: eid(),
        type: 'fill_blank',
        practises: s.practises,
        sentence: s.blank.sentence,
        hint: s.prompt,
        answer: s.blank.answer,
        options: shuffle(s.blank.options, rand),
      });
    } else {
      exercises.push({
        id: eid(),
        type: 'sentence_builder',
        practises: s.practises,
        prompt: s.prompt,
        answer: s.answer,
        distractors: s.distractors,
      });
    }
  }

  // Close with a match-pairs round over the day's focus vocab (chunks of 4).
  for (let i = 0; i < focus.length; i += 4) {
    const chunk = focus.slice(i, i + 4);
    if (chunk.length < 2) break;
    exercises.push({
      id: eid(),
      type: 'match_pairs',
      practises: chunk.map((v) => v.id),
      pairs: chunk.map((v) => ({ base: v.base, target: v.target })),
    });
  }

  return {
    dayNumber: spec.dayNumber,
    phase: spec.phase,
    cefrTarget: spec.cefrTarget,
    title: spec.title,
    objectives: spec.objectives,
    newVocab: spec.vocabIds,
    grammarPoint: spec.grammarPoint,
    cultureBridge: spec.cultureBridge,
    exercises,
    isReviewDay: !!spec.isReviewDay,
    isBossDay: !!spec.isBossDay,
    reward: spec.reward ?? { xp: 10 },
  };
}
