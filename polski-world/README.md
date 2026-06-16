# Polski World 🇧🇷→🇵🇱

A runnable **React Native + Expo** implementation of *The Language Platform* —
a reusable, language-agnostic learning engine — with its flagship pack,
**Polski World** (Portuguese → Polish), Days 1–10.

The whole thesis: **build the engine once, reskin it forever.** The engine never
knows *which* language it teaches; it renders a swappable **Language Pack**. To
launch a new pair (PT→ES, PT→DE…) you author a new pack — zero engine changes.

---

## Quick start

```bash
cd polski-world
npm install
npm start          # Expo dev server — press i / a, or scan the QR in Expo Go
```

Other targets:

```bash
npm run ios        # iOS simulator
npm run android    # Android emulator
npm run typecheck  # strict TypeScript, no emit
```

Audio works out of the box: with no pre-generated ElevenLabs assets, the engine
falls back to on-device **TTS** (`expo-speech`) in the pack's target language,
so "Listen & Tap" and dictation are fully playable.

### Optional: the AI conversation partner

The "Conversa com o Orzełek" screen role-plays a native speaker via Claude
(`claude-opus-4-8`). A mobile app must **never** embed an API key, so the app
talks to a backend proxy that injects the key server-side:

```bash
# 1. start the reference proxy with your key
ANTHROPIC_API_KEY=sk-ant-... node server/ai-proxy.mjs

# 2. point the app at it (LAN IP so a device can reach your machine)
export EXPO_PUBLIC_AI_PROXY_URL=http://192.168.x.x:8787
npm start
```

Without a proxy the chat still runs, degrading to a canned tutor reply.

---

## Architecture — engine vs. pack

```
src/
  engine/                 # 🔧 PLATFORM — reusable for every language pair
    types.ts              #   Language Pack + exercise + curriculum schemas
    srs.ts                #   SM-2 spaced repetition (the retention backbone)
    gamification.ts       #   XP, levels, streak, hearts math
    store.ts              #   persisted app state (zustand + AsyncStorage)
    audio.ts              #   audio playback (TTS fallback)
    ai.ts                 #   Claude conversation + writing feedback
  packs/
    pt-pl/                # 🎯 POLSKI WORLD — the only Polish-specific bundle
      vocabulary.ts       #   words (source of truth), hardness-flagged
      builder.ts          #   generates balanced exercises from vocab
      curriculum.ts       #   Days 1–10 (Phase 1: Foundations)
      index.ts            #   meta, branding, strings, certificate
  components/
    exercises/            # the exercise type library (Blueprint 2.5)
    ui/                   # buttons, progress bar, stat chips
  screens/                # onboarding, home map, lesson, results, tutor, …
  navigation/             # react-navigation stack
  theme/                  # colors/fonts derived from the active pack
server/ai-proxy.mjs       # keeps the Anthropic key off the client
```

**The rule:** anything under `engine/` is built once and never edited to add a
language. If you find yourself touching engine code to support a new pair, it
belongs in the pack instead.

### Swapping the pack (the platform payoff)

`src/packs/index.ts` loads **one** active pack. Author a sibling pack with the
same shape and change that import — the entire product reskins (colors, mascot,
level names, copy, curriculum, audio language).

---

## What's implemented

| Blueprint system | Status |
|---|---|
| Language Pack abstraction + universal Day/Exercise schema | ✅ |
| SRS engine (SM-2) wired into every lesson | ✅ |
| Exercise library — 8 core types (tap, listen, true/false, dictation, fill-blank, sentence builder, match pairs, select-all) | ✅ |
| Onboarding (name → why → goal → reminder → Day 1) | ✅ |
| Home dashboard + lesson map | ✅ |
| Lesson player with the trigger→action→reward loop | ✅ |
| Gamification: XP, 9 Polish levels, streak + milestones, hearts gate | ✅ |
| AI conversation partner + writing feedback (Claude) | ✅ |
| Freemium / paywall + launch lifetime offer | ✅ |
| Certificate of Completion (B2-aligned, exam on-ramp framing) | ✅ |
| Sequenced Launch: Days 1–10 free, 11–100 gated "Em breve" | ✅ |
| PT→PL content, Days 1–10 (~70 words, grammar, culture bridges) | ✅ |

### Deliberately stubbed (matching the blueprint's phased roadmap)

- **Days 11–100** — gated behind the Sequenced Launch validation gate
  (Blueprint Part VII); authored only once Day-7 retention proves out.
- **Pre-generated ElevenLabs audio** — uses TTS until the teacher-reviewed
  audio pipeline runs (Blueprint 3.3).
- **RevenueCat, push notifications, leagues, PostHog analytics** — wiring
  points exist; integrate per the Stage roadmap (Blueprint Part XI).
- **Pronunciation feedback (Whisper)** — the AI layer is structured for it.

> ⚠️ **Content quality gate.** The Polish content is drafted to be correct for a
> beginner, but per Blueprint §1.3 / Part III the one non-negotiable spend
> before a paid launch is a **native teacher to write + a second native to
> spot-check**. Treat `vocabulary.ts` / `curriculum.ts` as the spec a teacher
> fills, not as ship-ready copy.

---

## Verified

- `npm run typecheck` → clean (strict mode).
- `npx expo export --platform ios` → bundles (854 modules) with no unresolved
  imports.

Built with Claude. Engine reusable for PT→ES, PT→DE, PL→ES, and beyond.
