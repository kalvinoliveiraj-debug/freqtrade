/**
 * Home — the daily habit loop's launch pad (Blueprint 4.1). Top bar shows the
 * precious streak, hearts and XP/level; the lesson map gates Days 11–100 behind
 * the Sequenced Launch "Em breve" wall (Blueprint Part VII).
 */
import React, { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ProgressBar, Stat } from '../components/ui';
import { HEARTS } from '../engine/gamification';
import { levelProgress } from '../engine/gamification';
import { dueCards } from '../engine/srs';
import { useStore } from '../engine/store';
import { activePack } from '../packs';
import { theme } from '../theme';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
const s = activePack.strings;

export default function HomeScreen({ navigation }: Props) {
  const store = useStore();
  const refreshHearts = useStore((st) => st.refreshHearts);

  useFocusEffect(
    React.useCallback(() => {
      refreshHearts();
    }, [refreshHearts]),
  );

  const lvl = levelProgress(store.xp, activePack.branding.levelNames);
  const dueCount = dueCards(Object.values(store.srs)).length;
  const nextDay = nextOpenDay(store.completedDays, activePack.curriculum.length);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Top bar */}
      <View style={styles.topbar}>
        <Stat icon="🔥" value={store.streak} color={theme.colors.streak} />
        <Stat
          icon="❤️"
          value={store.profile.isPremium ? '∞' : `${store.hearts}/${HEARTS.max}`}
          color={theme.colors.heart}
        />
        <Stat icon="⭐" value={store.xp} color={theme.colors.gold} />
        <Pressable onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.avatar}>👤</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.body}>
        {/* Level card */}
        <View style={styles.levelCard}>
          <Text style={styles.levelName}>{lvl.name}</Text>
          <ProgressBar ratio={lvl.ratio} color={theme.colors.gold} />
          <Text style={styles.levelXp}>
            {lvl.current} / {lvl.needed} XP
          </Text>
        </View>

        <Text style={styles.freeBanner}>{s.freeBanner}</Text>

        {dueCount > 0 && (
          <Pressable
            style={styles.reviewBtn}
            onPress={() => navigation.navigate('Lesson', { dayNumber: lastCompletedDay(store.completedDays) || 1 })}
          >
            <Text style={styles.reviewText}>🔁 {s.review}: {dueCount} {dueCount === 1 ? 'palavra' : 'palavras'}</Text>
          </Pressable>
        )}

        {/* Lesson map */}
        <View style={styles.map}>
          {activePack.curriculum.map((day) => {
            const completed = store.completedDays.includes(day.dayNumber);
            const isNext = day.dayNumber === nextDay;
            const locked = !completed && !isNext;
            return (
              <LessonNode
                key={day.dayNumber}
                title={day.title.target}
                subtitle={day.title.base}
                day={day.dayNumber}
                completed={completed}
                isNext={isNext}
                locked={locked}
                boss={day.isBossDay}
                review={day.isReviewDay}
                onPress={() => !locked && navigation.navigate('Lesson', { dayNumber: day.dayNumber })}
              />
            );
          })}

          {/* The gated future — Days 11..N */}
          {[11, 12, 13].map((d) => (
            <LessonNode
              key={d}
              title={`Dia ${d}`}
              subtitle={s.comingSoon}
              day={d}
              completed={false}
              isNext={false}
              locked
              comingSoon
              onPress={() => navigation.navigate('Paywall')}
            />
          ))}
        </View>

        <Pressable style={styles.tutorBtn} onPress={() => navigation.navigate('Tutor')}>
          <Text style={styles.tutorText}>💬 {s.tutorTitle}</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function LessonNode({
  title,
  subtitle,
  day,
  completed,
  isNext,
  locked,
  boss,
  review,
  comingSoon,
  onPress,
}: {
  title: string;
  subtitle: string;
  day: number;
  completed: boolean;
  isNext: boolean;
  locked: boolean;
  boss?: boolean;
  review?: boolean;
  comingSoon?: boolean;
  onPress: () => void;
}) {
  const icon = completed ? '✓' : boss ? '👑' : review ? '🔁' : comingSoon ? '🔒' : locked ? '🔒' : '★';
  const ringColor = completed
    ? theme.colors.success
    : isNext
      ? theme.colors.accent
      : theme.colors.border;
  return (
    <Pressable onPress={onPress} style={[styles.node, { opacity: locked && !comingSoon ? 0.5 : 1 }]}>
      <View style={[styles.nodeCircle, { borderColor: ringColor, backgroundColor: completed ? theme.colors.success : theme.colors.surface }]}>
        <Text style={styles.nodeIcon}>{icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.nodeTitle}>{title}</Text>
        <Text style={styles.nodeSubtitle}>
          {comingSoon ? subtitle : `Dia ${day} · ${subtitle}`}
        </Text>
      </View>
      {isNext && <Text style={styles.startPill}>COMEÇAR</Text>}
    </Pressable>
  );
}

function nextOpenDay(completed: number[], total: number): number {
  for (let d = 1; d <= total; d++) if (!completed.includes(d)) return d;
  return total;
}
function lastCompletedDay(completed: number[]): number {
  return completed.length ? Math.max(...completed) : 0;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.bg },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing(2),
    paddingVertical: theme.spacing(1.5),
    gap: 12,
  },
  avatar: { fontSize: 22 },
  body: { padding: theme.spacing(2), gap: theme.spacing(2), paddingBottom: theme.spacing(6) },
  levelCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 8,
  },
  levelName: { color: theme.colors.gold, fontSize: theme.font.h3, fontWeight: '800' },
  levelXp: { color: theme.colors.muted, fontSize: theme.font.small },
  freeBanner: { color: theme.colors.gold, fontSize: theme.font.small, textAlign: 'center' },
  reviewBtn: {
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.md,
    padding: theme.spacing(2),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.accent,
  },
  reviewText: { color: theme.colors.text, fontWeight: '700', fontSize: theme.font.body },
  map: { gap: 10 },
  node: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(1.5),
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  nodeCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeIcon: { fontSize: 22, color: theme.colors.text, fontWeight: '900' },
  nodeTitle: { color: theme.colors.text, fontSize: theme.font.h3, fontWeight: '800' },
  nodeSubtitle: { color: theme.colors.muted, fontSize: theme.font.small },
  startPill: {
    color: theme.colors.bg,
    backgroundColor: theme.colors.accent,
    fontWeight: '900',
    fontSize: theme.font.small,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: theme.radius.pill,
    overflow: 'hidden',
  },
  tutorBtn: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(2),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tutorText: { color: theme.colors.text, fontSize: theme.font.h3, fontWeight: '700' },
});
