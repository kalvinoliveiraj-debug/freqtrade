/**
 * Results — the REWARD step of the loop (Blueprint 4.1). Big numbers, a streak
 * celebration on milestone days, then back to the map. Loss aversion lives in
 * the streak the learner just grew.
 */
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button } from '../components/ui';
import { useStore } from '../engine/store';
import { activePack } from '../packs';
import { theme } from '../theme';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

export default function ResultsScreen({ route, navigation }: Props) {
  const { dayNumber, xpGained, correct, total, newMilestone } = route.params;
  const streak = useStore((s) => s.streak);
  const accuracy = Math.round((correct / total) * 100);
  const day = activePack.curriculum.find((d) => d.dayNumber === dayNumber);

  const scale = useRef(new Animated.Value(0.6)).current;
  useEffect(() => {
    Animated.spring(scale, { toValue: 1, friction: 5, useNativeDriver: true }).start();
  }, [scale]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.body}>
        <Animated.Text style={[styles.trophy, { transform: [{ scale }] }]}>
          {day?.isBossDay ? '👑' : accuracy === 100 ? '🌟' : '🎉'}
        </Animated.Text>
        <Text style={styles.title}>{activePack.strings.lessonComplete}</Text>

        {newMilestone && (
          <View style={styles.milestone}>
            <Text style={styles.milestoneText}>🔥 {newMilestone} dias seguidos!</Text>
          </View>
        )}

        {day?.isBossDay && (
          <Text style={styles.phase}>Fase 1 — Fundações concluída!</Text>
        )}

        <View style={styles.stats}>
          <Stat label="XP" value={`+${xpGained}`} color={theme.colors.gold} />
          <Stat label="Precisão" value={`${accuracy}%`} color={theme.colors.accent} />
          <Stat label="Sequência" value={`${streak} 🔥`} color={theme.colors.streak} />
        </View>
      </View>

      <View style={styles.footer}>
        {day?.isBossDay && (
          <Button
            label={activePack.strings.certificateCta}
            variant="ghost"
            onPress={() => navigation.navigate('Certificate')}
            style={{ marginBottom: 10 }}
          />
        )}
        <Button label={activePack.strings.continue} variant="accent" onPress={() => navigation.navigate('Home')} />
      </View>
    </SafeAreaView>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={styles.stat}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.bg },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: theme.spacing(2), padding: theme.spacing(3) },
  trophy: { fontSize: 96 },
  title: { color: theme.colors.text, fontSize: theme.font.h1, fontWeight: '900' },
  milestone: {
    backgroundColor: theme.colors.streak,
    borderRadius: theme.radius.pill,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  milestoneText: { color: theme.colors.bg, fontWeight: '900', fontSize: theme.font.h3 },
  phase: { color: theme.colors.gold, fontSize: theme.font.h3, fontWeight: '700' },
  stats: { flexDirection: 'row', gap: theme.spacing(3), marginTop: theme.spacing(2) },
  stat: { alignItems: 'center' },
  statValue: { fontSize: theme.font.h1, fontWeight: '900' },
  statLabel: { color: theme.colors.muted, fontSize: theme.font.small, marginTop: 2 },
  footer: { padding: theme.spacing(3) },
});
