/**
 * Paywall (Blueprint Part IX). Anchors on the annual plan, lists Plus value,
 * and offers the limited launch lifetime deal. Real billing is RevenueCat —
 * here "subscribe" flips the demo premium flag.
 */
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button, Card } from '../components/ui';
import { useStore } from '../engine/store';
import { theme } from '../theme';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Paywall'>;

const PERKS = [
  'Corações ilimitados, sem anúncios',
  '3 congelamentos de sequência por semana',
  'Ligas completas + promoção',
  'Conversa com IA (Orzełek)',
  'Modo offline',
  'Feedback de pronúncia e escrita por IA',
  'Caminho de estudo personalizado',
  'Certificado de Conclusão no Dia 100',
];

export default function PaywallScreen({ navigation }: Props) {
  const setPremium = useStore((s) => s.setPremium);
  const buy = () => {
    setPremium(true);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <Text style={styles.title}>Polski World Plus ✨</Text>
      <Text style={styles.sub}>Aprende mais rápido. Sem barreiras.</Text>

      <Card style={{ gap: 8 }}>
        {PERKS.map((p) => (
          <Text key={p} style={styles.perk}>✓ {p}</Text>
        ))}
      </Card>

      {/* Annual anchored as the smart buy */}
      <View style={[styles.plan, styles.planBest]}>
        <Text style={styles.bestTag}>POUPA ~44%</Text>
        <Text style={styles.planName}>Anual</Text>
        <Text style={styles.planPrice}>R$ 199,90<Text style={styles.per}>/ano</Text></Text>
        <Button label="Escolher anual" variant="accent" onPress={buy} />
      </View>

      <View style={styles.plan}>
        <Text style={styles.planName}>Mensal</Text>
        <Text style={styles.planPrice}>R$ 29,90<Text style={styles.per}>/mês</Text></Text>
        <Button label="Escolher mensal" variant="ghost" onPress={buy} />
      </View>

      <View style={[styles.plan, styles.planLifetime]}>
        <Text style={styles.bestTag}>OFERTA DE LANÇAMENTO · 100 primeiros</Text>
        <Text style={styles.planName}>Vitalício</Text>
        <Text style={styles.planPrice}>R$ 399<Text style={styles.per}> uma vez</Text></Text>
        <Button label="Garantir vitalício" variant="primary" onPress={buy} />
      </View>

      <Text style={styles.fine}>
        Pagamentos geridos pelas lojas (App Store / Google Play) via RevenueCat.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: { padding: theme.spacing(2), gap: theme.spacing(2) },
  title: { color: theme.colors.text, fontSize: theme.font.h1, fontWeight: '900' },
  sub: { color: theme.colors.muted, fontSize: theme.font.h3, marginTop: -8 },
  perk: { color: theme.colors.text, fontSize: theme.font.body },
  plan: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    padding: theme.spacing(2),
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: 6,
  },
  planBest: { borderColor: theme.colors.accent, borderWidth: 2 },
  planLifetime: { borderColor: theme.colors.gold, borderWidth: 2 },
  bestTag: {
    color: theme.colors.bg,
    backgroundColor: theme.colors.gold,
    alignSelf: 'flex-start',
    fontSize: theme.font.small,
    fontWeight: '900',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.radius.sm,
    overflow: 'hidden',
  },
  planName: { color: theme.colors.text, fontSize: theme.font.h3, fontWeight: '800' },
  planPrice: { color: theme.colors.gold, fontSize: theme.font.h1, fontWeight: '900' },
  per: { color: theme.colors.muted, fontSize: theme.font.body, fontWeight: '600' },
  fine: { color: theme.colors.muted, fontSize: theme.font.small, textAlign: 'center' },
});
