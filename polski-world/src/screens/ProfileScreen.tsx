/**
 * Profile — identity, progress, badges, and the premium switch. In production
 * RevenueCat owns the subscription state (Blueprint Part X); here a manual
 * toggle stands in so Plus features are demoable.
 */
import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button, Card } from '../components/ui';
import { levelProgress } from '../engine/gamification';
import { useStore } from '../engine/store';
import { activePack } from '../packs';
import { theme } from '../theme';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

export default function ProfileScreen({ navigation }: Props) {
  const store = useStore();
  const lvl = levelProgress(store.xp, activePack.branding.levelNames);

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Text style={styles.name}>{store.profile.name}</Text>
      <Text style={styles.sub}>
        {lvl.name} · {store.profile.isPremium ? 'Plus ✨' : 'Grátis'}
      </Text>

      <View style={styles.grid}>
        <Tile value={store.xp} label="XP total" />
        <Tile value={`${store.streak} 🔥`} label="Sequência" />
        <Tile value={store.completedDays.length} label="Dias feitos" />
        <Tile value={Object.keys(store.srs).length} label="Palavras" />
      </View>

      <Card style={{ gap: 8 }}>
        <Text style={styles.cardTitle}>Conquistas</Text>
        {store.badges.length === 0 ? (
          <Text style={styles.muted}>Ainda sem medalhas — completa um marco de sequência!</Text>
        ) : (
          <View style={styles.badges}>
            {store.badges.map((b) => (
              <Text key={b} style={styles.badge}>🏅 {b}</Text>
            ))}
          </View>
        )}
      </Card>

      <Card style={{ gap: 6 }}>
        <Text style={styles.cardTitle}>Configurações</Text>
        <Text style={styles.muted}>Meta diária: {store.profile.dailyGoalMinutes} min</Text>
        <Text style={styles.muted}>Lembrete: {store.profile.notificationTime}</Text>
        <Text style={styles.muted}>
          Congelamentos de sequência: {store.streakFreezes}
        </Text>
      </Card>

      <Button label="Ver Polski World Plus" onPress={() => navigation.navigate('Paywall')} />
      <Button
        label={store.profile.isPremium ? 'Desativar Plus (demo)' : 'Ativar Plus (demo)'}
        variant="ghost"
        onPress={() => store.setPremium(!store.profile.isPremium)}
      />
      <Button label="O teu certificado" variant="ghost" onPress={() => navigation.navigate('Certificate')} />
      <Button
        label="Reiniciar progresso"
        variant="ghost"
        onPress={() =>
          Alert.alert('Reiniciar?', 'Isto apaga todo o progresso.', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Reiniciar', style: 'destructive', onPress: () => store.reset() },
          ])
        }
      />
    </ScrollView>
  );
}

function Tile({ value, label }: { value: string | number; label: string }) {
  return (
    <View style={styles.tile}>
      <Text style={styles.tileValue}>{value}</Text>
      <Text style={styles.tileLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { padding: theme.spacing(2), gap: theme.spacing(2) },
  name: { color: theme.colors.text, fontSize: theme.font.h1, fontWeight: '900' },
  sub: { color: theme.colors.muted, fontSize: theme.font.h3, marginTop: -8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tile: {
    flexGrow: 1,
    flexBasis: '45%',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  tileValue: { color: theme.colors.gold, fontSize: theme.font.h1, fontWeight: '900' },
  tileLabel: { color: theme.colors.muted, fontSize: theme.font.small },
  cardTitle: { color: theme.colors.text, fontSize: theme.font.h3, fontWeight: '800' },
  muted: { color: theme.colors.muted, fontSize: theme.font.body },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  badge: { color: theme.colors.text, fontWeight: '700' },
});
