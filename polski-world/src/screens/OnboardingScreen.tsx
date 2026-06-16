/**
 * Onboarding (Blueprint 5.1). Engineered to drop the learner into Day 1 fast:
 * name → reason → daily goal → reminder time → start. The "why" answer is the
 * one that personalises later copy. No paywall, no account wall.
 */
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button } from '../components/ui';
import { useStore } from '../engine/store';
import type { LearningReason } from '../engine/types';
import { activePack } from '../packs';
import { theme } from '../theme';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Onboarding'>;
const s = activePack.strings;

const REASONS: { id: LearningReason; key: string }[] = [
  { id: 'work', key: 'reason_work' },
  { id: 'partner', key: 'reason_partner' },
  { id: 'relocating', key: 'reason_relocating' },
  { id: 'heritage', key: 'reason_heritage' },
  { id: 'study', key: 'reason_study' },
  { id: 'curiosity', key: 'reason_curiosity' },
];

const GOALS = [
  { min: 5, key: 'goal_5' },
  { min: 10, key: 'goal_10' },
  { min: 15, key: 'goal_15' },
  { min: 20, key: 'goal_20' },
];

const TIMES = ['08:00', '12:00', '19:00', '21:00'];

export default function OnboardingScreen(_props: Props) {
  const complete = useStore((st) => st.completeOnboarding);
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [reason, setReason] = useState<LearningReason | null>(null);
  const [goal, setGoal] = useState(10);
  const [time, setTime] = useState('19:00');

  const finish = () =>
    complete({ name: name.trim() || 'Aluno', reason, dailyGoalMinutes: goal, notificationTime: time });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.body}>
        {step === 0 && (
          <View style={styles.welcome}>
            <Text style={styles.eagle}>🦅</Text>
            <Text style={styles.brand}>{activePack.meta.productName}</Text>
            <Text style={styles.flag}>{activePack.meta.flagPair}</Text>
            <Text style={styles.tagline}>{s.appTagline}</Text>
            <Text style={styles.freeBanner}>{s.freeBanner}</Text>
          </View>
        )}

        {step === 1 && (
          <Step title={s.namePrompt}>
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="João"
              placeholderTextColor={theme.colors.muted}
              style={styles.input}
              autoFocus
            />
          </Step>
        )}

        {step === 2 && (
          <Step title={s.onboardingWhy}>
            {REASONS.map((r) => (
              <Choice key={r.id} label={s[r.key]} selected={reason === r.id} onPress={() => setReason(r.id)} />
            ))}
          </Step>
        )}

        {step === 3 && (
          <Step title={s.goalQuestion}>
            {GOALS.map((g) => (
              <Choice key={g.min} label={s[g.key]} selected={goal === g.min} onPress={() => setGoal(g.min)} />
            ))}
          </Step>
        )}

        {step === 4 && (
          <Step title={s.notifyQuestion}>
            {TIMES.map((t) => (
              <Choice key={t} label={t} selected={time === t} onPress={() => setTime(t)} />
            ))}
          </Step>
        )}
      </ScrollView>

      <View style={styles.footer}>
        {step < 4 ? (
          <Button
            label={s.continue}
            onPress={() => setStep((x) => x + 1)}
            disabled={step === 2 && !reason}
          />
        ) : (
          <Button label={s.start} variant="accent" onPress={finish} />
        )}
      </View>
    </SafeAreaView>
  );
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View>
      <Text style={styles.stepTitle}>{title}</Text>
      <View style={{ gap: 10 }}>{children}</View>
    </View>
  );
}

function Choice({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Button label={label} variant={selected ? 'accent' : 'ghost'} onPress={onPress} />
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.bg },
  body: { padding: theme.spacing(3), flexGrow: 1, justifyContent: 'center' },
  welcome: { alignItems: 'center', gap: 8 },
  eagle: { fontSize: 72 },
  brand: { color: theme.colors.text, fontSize: 38, fontWeight: '900' },
  flag: { fontSize: 28 },
  tagline: { color: theme.colors.muted, fontSize: theme.font.h3, textAlign: 'center', marginTop: 4 },
  freeBanner: {
    color: theme.colors.gold,
    fontSize: theme.font.small,
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  stepTitle: { color: theme.colors.text, fontSize: theme.font.h1, fontWeight: '800', marginBottom: theme.spacing(3) },
  input: {
    borderWidth: 2,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    color: theme.colors.text,
    fontSize: theme.font.h2,
    padding: 16,
  },
  footer: { padding: theme.spacing(3) },
});
