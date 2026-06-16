/**
 * Small shared UI primitives — buttons, progress bar, stat chips, cards.
 * Kept dependency-light (built-in React Native `Animated`, no extra libs).
 */
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { theme } from '../../theme';

type ButtonVariant = 'primary' | 'accent' | 'ghost' | 'danger' | 'success';

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  style,
}: {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}) {
  const bg = {
    primary: theme.colors.primary,
    accent: theme.colors.accent,
    success: theme.colors.success,
    danger: theme.colors.error,
    ghost: 'transparent',
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: bg, opacity: disabled ? 0.45 : pressed ? 0.85 : 1 },
        variant === 'ghost' && styles.btnGhost,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={theme.colors.text} />
      ) : (
        <Text style={[styles.btnText, variant === 'ghost' && { color: theme.colors.muted }]}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

export function ProgressBar({ ratio, color }: { ratio: number; color?: string }) {
  return (
    <View style={styles.progressTrack}>
      <View
        style={[
          styles.progressFill,
          { width: `${Math.max(0, Math.min(1, ratio)) * 100}%`, backgroundColor: color ?? theme.colors.accent },
        ]}
      />
    </View>
  );
}

export function Stat({ icon, value, color }: { icon: string; value: string | number; color: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnGhost: { borderWidth: 1, borderColor: theme.colors.border },
  btnText: { color: theme.colors.text, fontSize: theme.font.h3, fontWeight: '800' },
  progressTrack: {
    height: 12,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: theme.radius.pill,
    overflow: 'hidden',
  },
  progressFill: { height: '100%', borderRadius: theme.radius.pill },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statIcon: { fontSize: 16 },
  statValue: { fontSize: theme.font.body, fontWeight: '800' },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});
