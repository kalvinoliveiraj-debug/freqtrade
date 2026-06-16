/**
 * Lesson player — the engine's beating heart. Renders a Day's exercises one at
 * a time, grades via each exercise's imperative handle, drives hearts/SRS, and
 * ends in the reward moment (Blueprint 4.1). Short by design: 3–5 min.
 *
 * Hearts only bite on paid days (Blueprint 9.1: Days 1–10 are fully free, no
 * limits), so the gate is wired but dormant for the free block.
 */
import React, { useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button, ProgressBar } from '../components/ui';
import { ExerciseHandle, ExerciseRenderer, EXERCISE_PROMPTS } from '../components/exercises';
import { stopSpeaking } from '../engine/audio';
import { useStore } from '../engine/store';
import { activePack } from '../packs';
import { theme } from '../theme';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Lesson'>;
const s = activePack.strings;

interface Result {
  wordIds: string[];
  correct: boolean;
}

export default function LessonScreen({ route, navigation }: Props) {
  const { dayNumber } = route.params;
  const day = useMemo(
    () => activePack.curriculum.find((d) => d.dayNumber === dayNumber)!,
    [dayNumber],
  );

  const store = useStore();
  const heartsActive = dayNumber > activePack.meta.freeDays && !store.profile.isPremium;

  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [phase, setPhase] = useState<'answering' | 'feedback'>('answering');
  const [lastCorrect, setLastCorrect] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const exRef = useRef<ExerciseHandle>(null);

  const ex = day.exercises[index];
  const total = day.exercises.length;
  const progress = (index + (phase === 'feedback' ? 1 : 0)) / total;

  const check = () => {
    const correct = exRef.current?.grade() ?? false;
    setLastCorrect(correct);
    setResults((r) => [...r, { wordIds: ex.practises, correct }]);
    if (!correct && heartsActive) store.loseHeart();
    setPhase('feedback');
  };

  const advance = () => {
    stopSpeaking();
    if (index + 1 >= total) {
      finish([...results]);
      return;
    }
    setIndex((i) => i + 1);
    setReady(false);
    setPhase('answering');
  };

  const finish = (all: Result[]) => {
    const correct = all.filter((r) => r.correct).length;
    const perfect = correct === total;
    const srsResults = all.flatMap((r) => r.wordIds.map((wordId) => ({ wordId, correct: r.correct })));
    const { xpGained, newMilestone } = store.finishLesson({
      dayNumber,
      perfect,
      isBoss: day.isBossDay,
      isPhaseEnd: day.isBossDay,
      results: srsResults,
    });
    navigation.replace('Results', { dayNumber, xpGained, correct, total, newMilestone });
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header: quit + progress + hearts */}
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            stopSpeaking();
            navigation.goBack();
          }}
        >
          <Text style={styles.quit}>✕</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          <ProgressBar ratio={progress} color={theme.colors.accent} />
        </View>
        {heartsActive && <Text style={styles.hearts}>❤️ {store.hearts}</Text>}
      </View>

      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <Text style={styles.exPrompt}>{EXERCISE_PROMPTS[ex.type]}</Text>
        <ExerciseRenderer key={ex.id} ref={exRef} exercise={ex} onReadyChange={setReady} />

        {day.grammarPoint && index === 0 && (
          <View style={styles.grammar}>
            <Text style={styles.grammarTitle}>📘 {day.title.target}</Text>
            <Text style={styles.grammarText}>{day.grammarPoint.explanationBase}</Text>
          </View>
        )}
      </ScrollView>

      {/* Feedback + footer */}
      <View
        style={[
          styles.footer,
          phase === 'feedback' && {
            backgroundColor: lastCorrect ? '#0f2e22' : '#2e1216',
          },
        ]}
      >
        {phase === 'feedback' && (
          <Text style={[styles.feedback, { color: lastCorrect ? theme.colors.success : theme.colors.error }]}>
            {lastCorrect ? s.correct : s.incorrect}
          </Text>
        )}
        {phase === 'answering' ? (
          <Button label={s.check} onPress={check} disabled={!ready} />
        ) : (
          <Button
            label={index + 1 >= total ? s.lessonComplete : s.continue}
            variant={lastCorrect ? 'success' : 'danger'}
            onPress={advance}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: theme.spacing(2),
    paddingVertical: theme.spacing(1),
  },
  quit: { color: theme.colors.muted, fontSize: 24, fontWeight: '700' },
  hearts: { color: theme.colors.heart, fontWeight: '800', fontSize: theme.font.body },
  body: { padding: theme.spacing(3), flexGrow: 1, justifyContent: 'center', gap: theme.spacing(2) },
  exPrompt: {
    color: theme.colors.muted,
    fontSize: theme.font.small,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
  grammar: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 6,
  },
  grammarTitle: { color: theme.colors.gold, fontWeight: '800', fontSize: theme.font.body },
  grammarText: { color: theme.colors.muted, fontSize: theme.font.small, lineHeight: 20 },
  footer: { padding: theme.spacing(3), gap: theme.spacing(1.5) },
  feedback: { fontSize: theme.font.h3, fontWeight: '800' },
});
