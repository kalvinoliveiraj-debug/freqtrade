/**
 * AI Conversation Partner (Blueprint 2.6). Claude role-plays a native speaker
 * at the learner's level. Premium-gated in the monetization model; here it's
 * open so the feature is demoable. Falls back to a canned reply if no AI proxy
 * is configured (see engine/ai.ts).
 */
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { chatWithPartner, ChatTurn, isAiConfigured } from '../engine/ai';
import { speak } from '../engine/audio';
import { useStore } from '../engine/store';
import { activePack } from '../packs';
import { theme } from '../theme';

const STARTER: ChatTurn = {
  role: 'assistant',
  text: 'Cześć! 👋 Jak się masz? (Olá! Como vais?)',
};

export default function TutorScreen() {
  const completedDays = useStore((s) => s.completedDays.length);
  const level = completedDays >= 5 ? 'A1' : 'A0';
  const [history, setHistory] = useState<ChatTurn[]>([STARTER]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...history, { role: 'user' as const, text }];
    setHistory(next);
    setInput('');
    setLoading(true);
    try {
      const reply = await chatWithPartner(activePack, level, 'cumprimentos e vida diária', next);
      setHistory((h) => [...h, { role: 'assistant', text: reply }]);
    } catch {
      setHistory((h) => [...h, { role: 'assistant', text: '⚠️ ' + activePack.strings.aiOffline }]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {!isAiConfigured() && (
          <Text style={styles.notice}>ℹ️ {activePack.strings.aiOffline}</Text>
        )}
        <ScrollView ref={scrollRef} contentContainerStyle={styles.chat}>
          {history.map((turn, i) => (
            <Pressable
              key={i}
              onLongPress={() => turn.role === 'assistant' && speak(turn.text)}
              style={[styles.bubble, turn.role === 'user' ? styles.userBubble : styles.aiBubble]}
            >
              <Text style={styles.bubbleText}>{turn.text}</Text>
            </Pressable>
          ))}
          {loading && <ActivityIndicator color={theme.colors.accent} style={{ marginTop: 8 }} />}
        </ScrollView>

        <View style={styles.inputRow}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Escreve em polaco…"
            placeholderTextColor={theme.colors.muted}
            style={styles.input}
            onSubmitEditing={send}
            returnKeyType="send"
          />
          <Pressable onPress={send} style={styles.sendBtn} disabled={loading}>
            <Text style={styles.sendText}>➤</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: theme.colors.bg },
  notice: { color: theme.colors.muted, fontSize: theme.font.small, padding: theme.spacing(1.5), textAlign: 'center' },
  chat: { padding: theme.spacing(2), gap: 10 },
  bubble: { maxWidth: '85%', borderRadius: theme.radius.lg, padding: theme.spacing(1.5) },
  aiBubble: { backgroundColor: theme.colors.surface, alignSelf: 'flex-start', borderTopLeftRadius: 4 },
  userBubble: { backgroundColor: theme.colors.accent, alignSelf: 'flex-end', borderTopRightRadius: 4 },
  bubbleText: { color: theme.colors.text, fontSize: theme.font.body, lineHeight: 22 },
  inputRow: { flexDirection: 'row', gap: 8, padding: theme.spacing(1.5), alignItems: 'center' },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.pill,
    color: theme.colors.text,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: theme.font.body,
  },
  sendBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: theme.colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: { color: theme.colors.text, fontSize: 20, fontWeight: '900' },
});
