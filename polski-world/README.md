# Polski World — Grammar Vault 🇵🇱

A gamified, high-energy web app that makes notoriously hard Polish grammar
(cases, declensions, conjugation) **intuitive, visual, and engaging** for
foreigners learning Polish.

The headline feature is the **30-Day Grammar Vault**: a vertical "Day 1 → Day 30"
skill-tree that walks a learner from the Nominative case all the way to present-tense
verb mastery — in bite-sized, color-coded cards instead of walls of academic text.

![stack](https://img.shields.io/badge/Next.js-14-black) ![stack](https://img.shields.io/badge/React-18-cyan) ![stack](https://img.shields.io/badge/Tailwind-3-38bdf8) ![stack](https://img.shields.io/badge/Framer_Motion-11-ff3d9a)

---

## ✨ Features

- **Tabbed navigation** — a Framer Motion "magic pill" slides between the
  **Grammar Vault** and **Practice** views with a blurred cross-fade.
- **30-Day roadmap** — a scroll-linked vertical timeline / skill-tree. Nodes
  alternate sides of a glowing spine; a progress beam fills as you scroll.
- **Syntax-highlighting UX** — every Polish example is segmented so the
  **stable word base stays calm (white)** while the **changing suffix glows in
  neon pink** (e.g. `Juli` + **`ę`**). This is the core learning mechanic.
- **Animated declensions** — `Julia → Julię`, `kawa → kawy`, `Polska → Polskę`
  morph on screen, with the new ending popping in via a spring animation.
- **Per-day mini-challenges** — a one-question fill-in-the-blank locks in each
  rule; solving it marks the day complete.
- **Local persistence** — progress is saved to `localStorage`, so completed
  days keep their satisfying checkmark and glowing border across refreshes.
- **Practice quiz** — a shuffled flashcard deck mixing vocabulary with the
  grammar reflexes trained in the Vault, with live score + streak.

### Milestones fully fleshed out
| Days | Case | Focus |
|------|------|-------|
| 1–3 | **Mianownik** (Nominative) | "To jest Julia" — naming, gender, `być` |
| 4–7 | **Biernik** (Accusative) | the **`a → ę`** object morph (`Widzę Julię`, `Kocham Polskę`) |
| 10–14 | **Narzędnik** (Instrumental) | `Jestem z Julią`, `Jestem Brazylijczykiem` |
| 20–25 | **Dopełniacz** (Genitive) | negation & possession (`Nie mam kawy`) |
| 30 | **Czasowniki** (Verbs) | present-tense conjugation logic |

The connecting days (8–9, 15–19, 26–29) carry real A1 syllabus content
(adjective agreement, plurals, numbers, Locative, Dative, Vocative, aspect,
past/future) so the roadmap is coherent end-to-end.

---

## 🚀 Getting started

```bash
cd polski-world
npm install
npm run dev      # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

> Requires Node 18.17+ (built & verified on Node 22).

---

## 🧱 Architecture

```
polski-world/
├─ app/
│  ├─ layout.tsx          # fonts, metadata, global styles
│  ├─ page.tsx            # thin server entry → <PolskiWorld/>
│  └─ globals.css         # theme tokens, glass/gradient utilities
├─ components/
│  ├─ PolskiWorld.tsx     # client shell: owns tab + progress, view cross-fade
│  ├─ TabNav.tsx          # segmented control with shared-layout pill
│  ├─ GrammarVault.tsx    # the 30-day timeline + scroll-linked beam
│  ├─ GrammarModal.tsx    # day detail modal (cards → declensions → challenge)
│  ├─ TransformationPanel.tsx # animated "before → after" declension
│  ├─ MiniChallenge.tsx   # per-day knowledge check
│  ├─ PracticeQuiz.tsx    # the Practice tab
│  └─ Highlight.tsx       # the suffix color-coding engine
└─ lib/
   ├─ types.ts            # Segment / GrammarDay / Challenge models
   ├─ grammarData.ts      # all 30 days + quiz bank (the content)
   └─ useProgress.ts      # localStorage-backed progress hook
```

**Design principle:** the page is a server component; everything interactive
lives in client components. Content is fully decoupled from presentation in
`lib/grammarData.ts`, so adding or editing a day never touches UI code.

The single idea that makes the whole thing teach: every word is an array of
typed `Segment`s (`base` / `suffix` / `muted`), and `Highlight.tsx` paints the
suffix in glowing neon. Change the data, the colors follow.

---

## 🎨 Design language

- Deep midnight backgrounds (`#070512`) under a living aurora gradient.
- Two signature accents: **neon pink** `#ff3d9a` (the changing suffix) and
  **electric cyan** `#22d3ee` (stable base & chrome); each grammatical case
  also carries its own accent hue.
- Frosted-glass surfaces, soft glows, spring physics, and a reduced-motion
  fallback for accessibility.
