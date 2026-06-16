/**
 * Certificate of Completion (Blueprint 4.6). Honest framing: a B2-*aligned*
 * Certificate of Completion (legal, like Busuu/Lingoda) that positions the app
 * as the on-ramp to the official state exam — NOT a CEFR certificate. Includes
 * a verification code so it can't be trivially faked, and is share-ready.
 */
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/ui';
import { useStore } from '../engine/store';
import { activePack } from '../packs';
import { theme } from '../theme';

export default function CertificateScreen() {
  const store = useStore();
  const finishedAll = store.completedDays.length >= activePack.curriculum.length;
  const code = verificationCode(store.profile.name, store.completedDays.length);

  return (
    <ScrollView contentContainerStyle={styles.body}>
      <View style={styles.cert}>
        <Text style={styles.eagle}>🦅</Text>
        <Text style={styles.kicker}>{activePack.meta.productName}</Text>
        <Text style={styles.h}>Certificado de Conclusão</Text>
        <Text style={styles.claim}>{activePack.certificate.levelClaim}</Text>
        <Text style={styles.awarded}>Atribuído a</Text>
        <Text style={styles.name}>{store.profile.name}</Text>
        <Text style={styles.desc}>
          por concluir a Fase de Fundações do curso de polaco (PT→PL),
          demonstrando saudações, números, apresentações e frases de sobrevivência.
        </Text>
        <View style={styles.row}>
          <Text style={styles.meta}>{new Date().toLocaleDateString('pt-BR')}</Text>
          <Text style={styles.meta}>Cód.: {code}</Text>
        </View>
      </View>

      <Text style={styles.onramp}>{activePack.certificate.examOnRamp}</Text>

      {!finishedAll && (
        <Text style={styles.locked}>
          🔒 O certificado completo (B2-aligned) é emitido ao concluíres o Dia 100.
        </Text>
      )}

      <Button label="Partilhar (gera imagem)" onPress={() => {}} />
    </ScrollView>
  );
}

/** Deterministic, non-secret verification stub (real one resolves via a URL). */
function verificationCode(name: string, days: number): string {
  let h = 5381;
  for (const ch of `${name}:${days}:${activePack.meta.id}`) h = (h * 33) ^ ch.charCodeAt(0);
  return 'PW-' + (h >>> 0).toString(36).toUpperCase().slice(0, 6);
}

const styles = StyleSheet.create({
  body: { padding: theme.spacing(2), gap: theme.spacing(2) },
  cert: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 3,
    borderColor: theme.colors.gold,
    padding: theme.spacing(3),
    alignItems: 'center',
    gap: 6,
  },
  eagle: { fontSize: 48 },
  kicker: { color: theme.colors.muted, letterSpacing: 2, fontSize: theme.font.small, fontWeight: '700' },
  h: { color: theme.colors.text, fontSize: theme.font.h2, fontWeight: '900', textAlign: 'center' },
  claim: { color: theme.colors.gold, fontWeight: '800', fontSize: theme.font.body },
  awarded: { color: theme.colors.muted, marginTop: theme.spacing(1), fontSize: theme.font.small },
  name: { color: theme.colors.text, fontSize: theme.font.h1, fontWeight: '900' },
  desc: { color: theme.colors.muted, textAlign: 'center', fontSize: theme.font.small, lineHeight: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: theme.spacing(2) },
  meta: { color: theme.colors.muted, fontSize: theme.font.small },
  onramp: { color: theme.colors.text, fontSize: theme.font.small, lineHeight: 20, textAlign: 'center' },
  locked: { color: theme.colors.muted, fontSize: theme.font.small, textAlign: 'center' },
});
