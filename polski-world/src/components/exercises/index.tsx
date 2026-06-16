/**
 * Exercise type library (Blueprint 2.5). Each component renders one exercise
 * type from the Language Pack and exposes a uniform imperative `grade()` handle
 * so the lesson footer's single "Verificar" button can drive any of them.
 *
 * Implemented here: the Phase 1–2 core set —
 *   tap_translation, listen_tap, true_false, type_what_you_hear,
 *   fill_blank, sentence_builder, match_pairs, select_all.
 * Advanced types (11–20) plug in the same way.
 */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { speak } from '../../engine/audio';
import type {
  Exercise,
  FillBlankExercise,
  ListenTapExercise,
  MatchPairsExercise,
  SelectAllExercise,
  SentenceBuilderExercise,
  TapTranslationExercise,
  TrueFalseExercise,
  TypeWhatYouHearExercise,
} from '../../engine/types';
import { theme } from '../../theme';

export interface ExerciseHandle {
  /** Grade the current answer; returns correctness and shows feedback. */
  grade: () => boolean;
}

interface BaseProps<E extends Exercise> {
  exercise: E;
  onReadyChange: (ready: boolean) => void;
}

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '') // fold diacritics — forgiving dictation
    .replace(/[.,!?;:]/g, '')
    .trim()
    .replace(/\s+/g, ' ');
}

/** A round speaker button used by listening exercises. */
function SpeakerButton({ text, big }: { text: string; big?: boolean }) {
  return (
    <Pressable onPress={() => speak(text)} style={[styles.speaker, big && styles.speakerBig]}>
      <Text style={{ fontSize: big ? 40 : 20 }}>🔊</Text>
    </Pressable>
  );
}

/** Visual state for an option chip after grading. */
function optionStyle(state: 'idle' | 'selected' | 'correct' | 'wrong') {
  switch (state) {
    case 'selected':
      return { borderColor: theme.colors.accent, backgroundColor: theme.colors.surfaceAlt };
    case 'correct':
      return { borderColor: theme.colors.success, backgroundColor: '#143a2c' };
    case 'wrong':
      return { borderColor: theme.colors.error, backgroundColor: '#3a1417' };
    default:
      return { borderColor: theme.colors.border, backgroundColor: theme.colors.surface };
  }
}

// ---------- tap_translation ----------
const TapTranslation = forwardRef<ExerciseHandle, BaseProps<TapTranslationExercise>>(
  ({ exercise, onReadyChange }, ref) => {
    const [sel, setSel] = useState<string | null>(null);
    const [graded, setGraded] = useState(false);
    useImperativeHandle(ref, () => ({
      grade: () => {
        setGraded(true);
        return sel === exercise.answer;
      },
    }));
    return (
      <View>
        <View style={styles.promptRow}>
          <Text style={styles.prompt}>{exercise.prompt}</Text>
          {exercise.speak ? <SpeakerButton text={exercise.speak} /> : null}
        </View>
        <View style={styles.optionsGrid}>
          {exercise.options.map((opt) => {
            const state = graded
              ? opt === exercise.answer
                ? 'correct'
                : opt === sel
                  ? 'wrong'
                  : 'idle'
              : opt === sel
                ? 'selected'
                : 'idle';
            return (
              <Pressable
                key={opt}
                disabled={graded}
                onPress={() => {
                  setSel(opt);
                  onReadyChange(true);
                }}
                style={[styles.option, optionStyle(state)]}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  },
);

// ---------- listen_tap ----------
const ListenTap = forwardRef<ExerciseHandle, BaseProps<ListenTapExercise>>(
  ({ exercise, onReadyChange }, ref) => {
    const [sel, setSel] = useState<string | null>(null);
    const [graded, setGraded] = useState(false);
    // Auto-play once on mount.
    useEffect(() => {
      speak(exercise.speak);
    }, [exercise.speak]);
    useImperativeHandle(ref, () => ({
      grade: () => {
        setGraded(true);
        return sel === exercise.answer;
      },
    }));
    return (
      <View style={{ alignItems: 'center' }}>
        <SpeakerButton text={exercise.speak} big />
        <View style={[styles.optionsGrid, { marginTop: theme.spacing(3) }]}>
          {exercise.options.map((opt) => {
            const state = graded
              ? opt === exercise.answer
                ? 'correct'
                : opt === sel
                  ? 'wrong'
                  : 'idle'
              : opt === sel
                ? 'selected'
                : 'idle';
            return (
              <Pressable
                key={opt}
                disabled={graded}
                onPress={() => {
                  setSel(opt);
                  onReadyChange(true);
                }}
                style={[styles.option, optionStyle(state)]}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  },
);

// ---------- true_false ----------
const TrueFalse = forwardRef<ExerciseHandle, BaseProps<TrueFalseExercise>>(
  ({ exercise, onReadyChange }, ref) => {
    const [choice, setChoice] = useState<boolean | null>(null);
    const [graded, setGraded] = useState(false);
    useImperativeHandle(ref, () => ({
      grade: () => {
        setGraded(true);
        return choice === exercise.isCorrect;
      },
    }));
    return (
      <View>
        <View style={styles.tfCard}>
          <Text style={styles.tfTarget}>{exercise.target}</Text>
          <Text style={styles.tfEquals}>=</Text>
          <Text style={styles.tfBase}>{exercise.base}</Text>
        </View>
        <View style={[styles.optionsGrid, { marginTop: theme.spacing(3) }]}>
          {[true, false].map((val) => {
            const state = graded
              ? val === exercise.isCorrect
                ? 'correct'
                : val === choice
                  ? 'wrong'
                  : 'idle'
              : val === choice
                ? 'selected'
                : 'idle';
            return (
              <Pressable
                key={String(val)}
                disabled={graded}
                onPress={() => {
                  setChoice(val);
                  onReadyChange(true);
                }}
                style={[styles.option, { flexBasis: '47%' }, optionStyle(state)]}
              >
                <Text style={styles.optionText}>{val ? '✔︎ Certo' : '✘ Errado'}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  },
);

// ---------- type_what_you_hear ----------
const TypeWhatYouHear = forwardRef<ExerciseHandle, BaseProps<TypeWhatYouHearExercise>>(
  ({ exercise, onReadyChange }, ref) => {
    const [val, setVal] = useState('');
    const [graded, setGraded] = useState(false);
    const [ok, setOk] = useState(false);
    useEffect(() => {
      speak(exercise.speak);
    }, [exercise.speak]);
    useImperativeHandle(ref, () => ({
      grade: () => {
        const correct = normalize(val) === normalize(exercise.answer);
        setOk(correct);
        setGraded(true);
        return correct;
      },
    }));
    return (
      <View style={{ alignItems: 'center' }}>
        <SpeakerButton text={exercise.speak} big />
        <Text style={styles.hint}>{exercise.hint}</Text>
        <TextInput
          value={val}
          editable={!graded}
          onChangeText={(t) => {
            setVal(t);
            onReadyChange(t.trim().length > 0);
          }}
          placeholder="…"
          placeholderTextColor={theme.colors.muted}
          autoCapitalize="none"
          autoCorrect={false}
          style={[
            styles.input,
            graded && { borderColor: ok ? theme.colors.success : theme.colors.error },
          ]}
        />
        {graded && !ok ? <Text style={styles.answerReveal}>{exercise.answer}</Text> : null}
      </View>
    );
  },
);

// ---------- fill_blank ----------
const FillBlank = forwardRef<ExerciseHandle, BaseProps<FillBlankExercise>>(
  ({ exercise, onReadyChange }, ref) => {
    const [sel, setSel] = useState<string | null>(null);
    const [graded, setGraded] = useState(false);
    useImperativeHandle(ref, () => ({
      grade: () => {
        setGraded(true);
        return sel === exercise.answer;
      },
    }));
    const sentence = exercise.sentence.replace('___', sel ? `⟨${sel}⟩` : '＿＿＿');
    return (
      <View>
        <Text style={styles.hint}>{exercise.hint}</Text>
        <Text style={styles.sentence}>{sentence}</Text>
        <View style={styles.optionsGrid}>
          {exercise.options.map((opt) => {
            const state = graded
              ? opt === exercise.answer
                ? 'correct'
                : opt === sel
                  ? 'wrong'
                  : 'idle'
              : opt === sel
                ? 'selected'
                : 'idle';
            return (
              <Pressable
                key={opt}
                disabled={graded}
                onPress={() => {
                  setSel(opt);
                  onReadyChange(true);
                }}
                style={[styles.option, optionStyle(state)]}
              >
                <Text style={styles.optionText}>{opt}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  },
);

// ---------- sentence_builder ----------
const SentenceBuilder = forwardRef<ExerciseHandle, BaseProps<SentenceBuilderExercise>>(
  ({ exercise, onReadyChange }, ref) => {
    const bank = useMemo(
      () =>
        [...exercise.answer, ...(exercise.distractors ?? [])]
          .map((t, i) => ({ t, key: `${t}-${i}` }))
          .sort(() => (exercise.answer.length % 2 === 0 ? 1 : -1)), // stable-ish scramble
      [exercise],
    );
    const [used, setUsed] = useState<string[]>([]);
    const [graded, setGraded] = useState(false);
    const [ok, setOk] = useState(false);
    useImperativeHandle(ref, () => ({
      grade: () => {
        const built = used.map((k) => bank.find((b) => b.key === k)?.t);
        const correct =
          built.length === exercise.answer.length &&
          built.every((w, i) => w === exercise.answer[i]);
        setOk(correct);
        setGraded(true);
        return correct;
      },
    }));
    const toggle = (key: string) => {
      setUsed((u) => {
        const next = u.includes(key) ? u.filter((k) => k !== key) : [...u, key];
        onReadyChange(next.length > 0);
        return next;
      });
    };
    return (
      <View>
        <Text style={styles.hint}>{exercise.prompt}</Text>
        <View
          style={[
            styles.buildArea,
            graded && { borderColor: ok ? theme.colors.success : theme.colors.error },
          ]}
        >
          {used.map((key) => (
            <Pressable key={key} disabled={graded} onPress={() => toggle(key)} style={styles.token}>
              <Text style={styles.tokenText}>{bank.find((b) => b.key === key)?.t}</Text>
            </Pressable>
          ))}
        </View>
        {graded && !ok ? (
          <Text style={styles.answerReveal}>{exercise.answer.join(' ')}</Text>
        ) : null}
        <View style={styles.bankArea}>
          {bank.map(({ t, key }) => (
            <Pressable
              key={key}
              disabled={graded || used.includes(key)}
              onPress={() => toggle(key)}
              style={[styles.token, used.includes(key) && { opacity: 0.25 }]}
            >
              <Text style={styles.tokenText}>{t}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    );
  },
);

// ---------- match_pairs ----------
const MatchPairs = forwardRef<ExerciseHandle, BaseProps<MatchPairsExercise>>(
  ({ exercise, onReadyChange }, ref) => {
    const left = exercise.pairs.map((p) => p.base);
    const right = useMemo(
      () => exercise.pairs.map((p) => p.target).sort((a, b) => a.localeCompare(b)),
      [exercise],
    );
    const [pickBase, setPickBase] = useState<string | null>(null);
    const [matched, setMatched] = useState<Record<string, string>>({});
    const [wrong, setWrong] = useState<string | null>(null);
    const mistakes = useRef(0);

    useImperativeHandle(ref, () => ({
      grade: () => mistakes.current === 0,
    }));

    const tryMatch = (base: string, target: string) => {
      const pair = exercise.pairs.find((p) => p.base === base);
      if (pair && pair.target === target) {
        const next = { ...matched, [base]: target };
        setMatched(next);
        setPickBase(null);
        if (Object.keys(next).length === exercise.pairs.length) onReadyChange(true);
      } else {
        mistakes.current += 1;
        setWrong(target);
        setTimeout(() => setWrong(null), 350);
        setPickBase(null);
      }
    };

    return (
      <View>
        <Text style={styles.hint}>Liga os pares</Text>
        <View style={styles.matchRow}>
          <View style={styles.matchCol}>
            {left.map((base) => {
              const done = matched[base] !== undefined;
              return (
                <Pressable
                  key={base}
                  disabled={done}
                  onPress={() => setPickBase(base)}
                  style={[
                    styles.option,
                    done
                      ? optionStyle('correct')
                      : pickBase === base
                        ? optionStyle('selected')
                        : optionStyle('idle'),
                  ]}
                >
                  <Text style={styles.optionText}>{base}</Text>
                </Pressable>
              );
            })}
          </View>
          <View style={styles.matchCol}>
            {right.map((target) => {
              const done = Object.values(matched).includes(target);
              return (
                <Pressable
                  key={target}
                  disabled={done || !pickBase}
                  onPress={() => pickBase && tryMatch(pickBase, target)}
                  style={[
                    styles.option,
                    done
                      ? optionStyle('correct')
                      : wrong === target
                        ? optionStyle('wrong')
                        : optionStyle('idle'),
                  ]}
                >
                  <Text style={styles.optionText}>{target}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>
    );
  },
);

// ---------- select_all ----------
const SelectAll = forwardRef<ExerciseHandle, BaseProps<SelectAllExercise>>(
  ({ exercise, onReadyChange }, ref) => {
    const [sel, setSel] = useState<Set<number>>(new Set());
    const [graded, setGraded] = useState(false);
    useImperativeHandle(ref, () => ({
      grade: () => {
        setGraded(true);
        return exercise.options.every((o, i) => o.correct === sel.has(i));
      },
    }));
    return (
      <View>
        <Text style={styles.prompt}>{exercise.prompt}</Text>
        <View style={styles.optionsGrid}>
          {exercise.options.map((o, i) => {
            const state = graded
              ? o.correct
                ? 'correct'
                : sel.has(i)
                  ? 'wrong'
                  : 'idle'
              : sel.has(i)
                ? 'selected'
                : 'idle';
            return (
              <Pressable
                key={o.text}
                disabled={graded}
                onPress={() => {
                  setSel((s) => {
                    const next = new Set(s);
                    next.has(i) ? next.delete(i) : next.add(i);
                    onReadyChange(next.size > 0);
                    return next;
                  });
                }}
                style={[styles.option, optionStyle(state)]}
              >
                <Text style={styles.optionText}>{o.text}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  },
);

/** Picks the right component for an exercise type and forwards the grade ref. */
export const ExerciseRenderer = forwardRef<ExerciseHandle, BaseProps<Exercise>>(
  ({ exercise, onReadyChange }, ref) => {
    const p = { onReadyChange };
    switch (exercise.type) {
      case 'tap_translation':
        return <TapTranslation ref={ref} exercise={exercise} {...p} />;
      case 'listen_tap':
        return <ListenTap ref={ref} exercise={exercise} {...p} />;
      case 'true_false':
        return <TrueFalse ref={ref} exercise={exercise} {...p} />;
      case 'type_what_you_hear':
        return <TypeWhatYouHear ref={ref} exercise={exercise} {...p} />;
      case 'fill_blank':
        return <FillBlank ref={ref} exercise={exercise} {...p} />;
      case 'sentence_builder':
        return <SentenceBuilder ref={ref} exercise={exercise} {...p} />;
      case 'match_pairs':
        return <MatchPairs ref={ref} exercise={exercise} {...p} />;
      case 'select_all':
        return <SelectAll ref={ref} exercise={exercise} {...p} />;
    }
  },
);

export const EXERCISE_PROMPTS: Record<Exercise['type'], string> = {
  tap_translation: 'Toca na tradução',
  listen_tap: 'Toca no que ouves',
  true_false: 'Certo ou errado?',
  type_what_you_hear: 'Escreve o que ouves',
  fill_blank: 'Completa a frase',
  sentence_builder: 'Constrói a frase',
  match_pairs: 'Liga os pares',
  select_all: 'Seleciona todas as corretas',
};

const styles = StyleSheet.create({
  promptRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: theme.spacing(2) },
  prompt: { color: theme.colors.text, fontSize: theme.font.h2, fontWeight: '800', flexShrink: 1 },
  hint: { color: theme.colors.muted, fontSize: theme.font.body, marginBottom: theme.spacing(1.5), textAlign: 'center' },
  sentence: { color: theme.colors.text, fontSize: theme.font.h3, marginBottom: theme.spacing(2), textAlign: 'center' },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' },
  option: {
    borderWidth: 2,
    borderRadius: theme.radius.md,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexGrow: 1,
    flexBasis: '40%',
    alignItems: 'center',
  },
  optionText: { color: theme.colors.text, fontSize: theme.font.body, fontWeight: '700' },
  speaker: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speakerBig: { width: 96, height: 96, borderRadius: 48 },
  tfCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(3),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tfTarget: { color: theme.colors.text, fontSize: theme.font.h1, fontWeight: '800' },
  tfEquals: { color: theme.colors.muted, fontSize: theme.font.h2, marginVertical: 4 },
  tfBase: { color: theme.colors.accent, fontSize: theme.font.h2, fontWeight: '700' },
  input: {
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    color: theme.colors.text,
    fontSize: theme.font.h3,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '100%',
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  answerReveal: {
    color: theme.colors.success,
    fontSize: theme.font.h3,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: theme.spacing(1.5),
  },
  buildArea: {
    minHeight: 56,
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderStyle: 'dashed',
    padding: theme.spacing(1),
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: theme.spacing(2),
  },
  bankArea: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  token: {
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tokenText: { color: theme.colors.text, fontSize: theme.font.body, fontWeight: '700' },
  matchRow: { flexDirection: 'row', gap: 12 },
  matchCol: { flex: 1, gap: 10 },
});
