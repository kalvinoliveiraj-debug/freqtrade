/**
 * The Language Platform — engine type schema.
 *
 * Everything here is LANGUAGE-AGNOSTIC. The engine never knows *which* language
 * it teaches; it only knows how to render a `LanguagePack`. To launch a new
 * pair you author a new pack — zero engine changes. (Blueprint Part II.)
 */

export type Cefr = 'A0' | 'A1' | 'A2' | 'B1' | 'B2';

export type LearningReason =
  | 'work'
  | 'partner'
  | 'relocating'
  | 'heritage'
  | 'study'
  | 'curiosity';

/** A single vocabulary item. `base` is the learner's language, `target` is taught. */
export interface VocabEntry {
  id: string;
  base: string; // e.g. Portuguese
  target: string; // e.g. Polish
  pos?: string; // part of speech
  day: number; // day it is introduced
  hardness?: number; // 0..1 — drives the "spot-check the 200 hardest" pipeline step
  note?: string; // optional usage hint shown in the learner's base language
}

/** ----- Exercise library (Blueprint 2.5). Each type renders from the pack. ----- */

export type ExerciseType =
  | 'tap_translation'
  | 'fill_blank'
  | 'sentence_builder'
  | 'listen_tap'
  | 'match_pairs'
  | 'true_false'
  | 'select_all'
  | 'type_what_you_hear';

interface ExerciseBase {
  id: string;
  type: ExerciseType;
  /** Vocab ids this exercise practises — fed to the SRS engine on completion. */
  practises: string[];
}

export interface TapTranslationExercise extends ExerciseBase {
  type: 'tap_translation';
  prompt: string; // shown to the user (base language)
  speak?: string; // optional target text to read aloud
  answer: string; // correct option
  options: string[]; // includes the answer
}

export interface FillBlankExercise extends ExerciseBase {
  type: 'fill_blank';
  /** Sentence with a single "___" placeholder, in the target language. */
  sentence: string;
  hint: string; // base-language translation of the full sentence
  answer: string;
  options: string[];
}

export interface SentenceBuilderExercise extends ExerciseBase {
  type: 'sentence_builder';
  prompt: string; // base-language sentence to translate
  /** Correct ordering of target-language tokens. */
  answer: string[];
  /** Distractor tokens mixed into the word bank. */
  distractors?: string[];
}

export interface ListenTapExercise extends ExerciseBase {
  type: 'listen_tap';
  speak: string; // target text read aloud (TTS)
  answer: string; // correct option (target text)
  options: string[];
}

export interface MatchPairsExercise extends ExerciseBase {
  type: 'match_pairs';
  pairs: { base: string; target: string }[];
}

export interface TrueFalseExercise extends ExerciseBase {
  type: 'true_false';
  base: string;
  target: string;
  isCorrect: boolean; // whether base<->target is a correct translation
}

export interface SelectAllExercise extends ExerciseBase {
  type: 'select_all';
  prompt: string; // base-language word
  options: { text: string; correct: boolean }[];
}

export interface TypeWhatYouHearExercise extends ExerciseBase {
  type: 'type_what_you_hear';
  speak: string; // target text read aloud
  answer: string; // expected typed target text
  hint: string; // base-language meaning
}

export type Exercise =
  | TapTranslationExercise
  | FillBlankExercise
  | SentenceBuilderExercise
  | ListenTapExercise
  | MatchPairsExercise
  | TrueFalseExercise
  | SelectAllExercise
  | TypeWhatYouHearExercise;

/** ----- Curriculum (Blueprint 2.2 / 2.3) ----- */

export type Phase =
  | 'Foundations'
  | 'Construction'
  | 'Expansion'
  | 'Fluency'
  | 'Mastery';

export interface GrammarPoint {
  id: string;
  explanationBase: string; // explained in the learner's base language
  examples: { target: string; base: string }[];
}

export interface Day {
  dayNumber: number;
  phase: Phase;
  cefrTarget: Cefr;
  title: { base: string; target: string };
  objectives: string[];
  newVocab: string[]; // vocab ids
  grammarPoint?: GrammarPoint;
  cultureBridge?: string;
  exercises: Exercise[];
  isReviewDay: boolean;
  isBossDay: boolean;
  reward: { xp: number; badge?: string };
}

/** ----- The pack itself (Blueprint 2.1) ----- */

export interface PackMeta {
  id: string; // e.g. "pt-pl"
  baseLanguage: string; // BCP-47, e.g. "pt-BR"
  targetLanguage: string; // BCP-47, e.g. "pl"
  flagPair: string;
  productName: string;
  cefrRange: [Cefr, Cefr];
  totalDays: number;
  /** Free days under the Sequenced Launch (Blueprint Part VII). */
  freeDays: number;
}

export interface Branding {
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  surfaceColor: string;
  textColor: string;
  mutedColor: string;
  mascotName: string;
  /** Localised gamification level names (Blueprint 4.4). */
  levelNames: string[];
}

export interface CertificateConfig {
  levelClaim: string; // e.g. "B2-aligned"
  examOnRamp: string; // honest "on-ramp to the official exam" copy
}

export interface LanguagePack {
  meta: PackMeta;
  branding: Branding;
  /** UI / motivational strings in the learner's base language. */
  strings: Record<string, string>;
  vocabulary: VocabEntry[];
  curriculum: Day[];
  certificate: CertificateConfig;
}
