/**
 * The AI layer (Blueprint 2.6) — the solo builder's force multiplier.
 *
 *  - AI Conversation Partner: Claude role-plays a native speaker at the user's
 *    level, configured by the Language Pack (target language, level, topic).
 *  - AI Writing Feedback: corrects the learner's writing, explaining in the
 *    *base* language.
 *
 * SECURITY: never ship an Anthropic API key inside a mobile app — anyone can
 * extract it. The official SDK points at a backend proxy you control (set
 * `EXPO_PUBLIC_AI_PROXY_URL`); the proxy injects the real key and forwards to
 * api.anthropic.com. With no proxy configured the module degrades gracefully to
 * a canned tutor reply so the app still runs end-to-end in development.
 *
 * One integration → every Language Pack. Only the prompts change per pair.
 */
import Anthropic from '@anthropic-ai/sdk';

import type { LanguagePack } from './types';

const MODEL = 'claude-opus-4-8';
const PROXY_URL = process.env.EXPO_PUBLIC_AI_PROXY_URL ?? '';

// `dangerouslyAllowBrowser` is required for any non-Node runtime (React Native).
// It is only safe here because `baseURL` is OUR proxy — no real key is present.
const client = PROXY_URL
  ? new Anthropic({ baseURL: PROXY_URL, apiKey: 'proxy', dangerouslyAllowBrowser: true })
  : null;

export interface ChatTurn {
  role: 'user' | 'assistant';
  text: string;
}

function tutorSystemPrompt(pack: LanguagePack, level: string, topic: string): string {
  const { baseLanguage, targetLanguage, productName } = pack.meta;
  return [
    `You are a friendly native ${targetLanguage} speaker helping a learner inside ${productName}.`,
    `The learner's first language is ${baseLanguage}. Their level is roughly ${level} (CEFR).`,
    `Stay on the topic: "${topic}".`,
    `Reply primarily in ${targetLanguage}, kept simple and appropriate to their level.`,
    `Keep replies short (1-3 sentences). After your reply, if the learner made a mistake,`,
    `add one brief correction in ${baseLanguage} prefixed with "💡".`,
    `Never break character as their conversation partner.`,
  ].join(' ');
}

/** Conversation partner. Returns the assistant's reply text. */
export async function chatWithPartner(
  pack: LanguagePack,
  level: string,
  topic: string,
  history: ChatTurn[],
): Promise<string> {
  if (!client) return offlineTutorReply(pack, history);

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system: tutorSystemPrompt(pack, level, topic),
    messages: history.map((t) => ({ role: t.role, content: t.text })),
  });

  return message.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim();
}

/** Writing feedback: corrections explained in the learner's base language. */
export async function writingFeedback(
  pack: LanguagePack,
  text: string,
): Promise<string> {
  if (!client) {
    return `(${pack.strings.aiOffline ?? 'AI feedback unavailable offline.'})`;
  }

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    system:
      `You are a ${pack.meta.targetLanguage} writing tutor. Correct the learner's text, ` +
      `then explain each correction concisely in ${pack.meta.baseLanguage}. ` +
      `End with one encouraging sentence in ${pack.meta.baseLanguage}.`,
    messages: [{ role: 'user', content: text }],
  });

  return message.content
    .filter((b): b is Anthropic.TextBlock => b.type === 'text')
    .map((b) => b.text)
    .join('\n')
    .trim();
}

/** Deterministic fallback so the chat screen works without a backend. */
function offlineTutorReply(pack: LanguagePack, history: ChatTurn[]): string {
  const lastUser = [...history].reverse().find((t) => t.role === 'user');
  const greeting = pack.strings.tutorOfflineGreeting ?? 'Dobrze! 🙂';
  if (!lastUser) return greeting;
  return `${greeting}\n💡 ${pack.strings.aiOffline ?? 'Connect the AI proxy for live conversation.'}`;
}

export function isAiConfigured(): boolean {
  return client !== null;
}
