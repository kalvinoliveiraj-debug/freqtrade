# 🎯 The Full Master Prompt — "Polski World: Grammar Vault"

Copy everything in the block below into a capable coding agent (Claude Code,
Cursor, etc.) to generate this app from scratch. It is self-contained: stack,
architecture, content spec, visual system, and acceptance criteria are all
included so the output is a **fully running app**, not boilerplate.

---

```
ROLE
You are a Principal Product Manager + Lead Full-Stack Engineer at a world-class
edtech studio. Build a production-ready, fully running web app — clean, modular,
heavily commented code. No placeholders, no TODOs for any core feature.

PRODUCT
Expand a gamified Polish-learning app, "Polski World" (for foreigners/Brazilians
learning Polish), with a dedicated GRAMMAR VAULT that makes hard Polish grammar
(cases/declensions) intuitive, visual, and engaging.

STACK (hard requirement)
- Next.js 14+ (App Router) + React 18 + TypeScript (strict)
- Tailwind CSS for styling
- Framer Motion for all animation/transitions
- No backend; persistence via localStorage only

VISUAL SYSTEM ("premium boutique agency", not AI boilerplate)
- Deep midnight background (~#070512) under a living radial "aurora" gradient.
- Two signature accents: NEON PINK #ff3d9a and ELECTRIC CYAN #22d3ee. Give each
  grammatical case its own accent hue too.
- Frosted-glass surfaces, soft outer glows, gradient headline text, spring
  physics on interactions. Custom on-brand scrollbar. Respect
  prefers-reduced-motion.

THE CORE LEARNING MECHANIC — SUFFIX HIGHLIGHTING
Model every Polish example as an array of typed segments:
  type Segment = { text: string; type: "base" | "suffix" | "muted" }
Render the stable word BASE calmly (white) and the CHANGING SUFFIX in glowing
neon pink (e.g. "Juli" + "ę"). A <Highlight> component owns this. This is the
single idea that must make declensions instantly legible.

FEATURES (all required, all functional)
1. TABBED NAVIGATION between a "Grammar Vault" view and a "Practice/Quiz" view,
   with a seamless Framer Motion transition (a shared-layout sliding pill +
   blurred cross-fade between views).
2. INTERACTIVE 30-DAY ROADMAP: a vertically scrollable Day 1→Day 30 timeline /
   skill-tree with a glowing central spine and a scroll-linked progress beam.
   Each node is clickable and opens an elegant modal/expanding card.
3. Inside each day's card: bite-sized concept cards (never walls of text),
   animated "before → after" declension panels where the new ending pops in,
   and a one-question MINI-CHALLENGE (fill-in-the-blank, multiple choice) that
   marks the day complete when solved correctly.
4. LOCAL PERSISTENCE: save completed days to localStorage; completed nodes show
   a satisfying checkmark + glowing border that survive refresh. SSR-safe
   (hydrate after mount; no hydration mismatch). Include a reset control.
5. A PRACTICE QUIZ tab: shuffled flashcard deck mixing vocabulary with the
   grammar reflexes, live score + streak, and a results screen.

30-DAY A1 CURRICULUM (real content — no filler). Fully flesh out these
milestones, with the animated suffix examples shown:
- Day 1–3  Nominative (Mianownik): "To jest Julia"; noun gender; być (jestem/jesteś).
- Day 4–7  Accusative (Biernik): the OBJECT case. Animate "a → ę"
           (Julia→Julię, kawa→kawę, Polska→Polskę: "Widzę Julię", "Kocham Polskę").
           Cover animate-masculine (kot→kota) vs inanimate (dom unchanged).
- Day 10–14 Instrumental (Narzędnik): identity & company
           ("Jestem Brazylijczykiem", "Jestem z Julią"); feminine -a → -ą.
- Day 20–25 Genitive (Dopełniacz): negation & possession
           ("Nie mam kawy", "samochód Julii"); z/do/od = from/to; numbers 5+.
- Day 30   Verb conjugation mastery: present tense logic (-ę/-isz and -m/-sz
           groups; endings encode the subject).
Fill connecting days (8–9, 15–19, 26–29) with coherent A1 topics: adjective
agreement, plurals, numbers, Locative, Dative, Vocative, aspect, past/future.

ARCHITECTURE
- app/page.tsx is a thin server entry rendering one client shell. Keep all
  interactivity in client components. Decouple ALL content into a data module
  (lib/grammarData.ts) so editing a day never touches UI code.
- Suggested layout:
    app/{layout,page,globals.css}
    components/{PolskiWorld,TabNav,GrammarVault,GrammarModal,
                TransformationPanel,MiniChallenge,PracticeQuiz,Highlight}
    lib/{types,grammarData,useProgress}
- Strong TypeScript types for Segment / GrammarDay / Challenge / case metadata.

QUALITY BAR / ACCEPTANCE
- `npm install && npm run build` succeeds with zero type or lint errors.
- `npm run dev` serves a working app: tabs switch, timeline scrolls, nodes open
  modals, suffixes glow, declensions animate, challenges grade, progress
  persists across refresh.
- Code is modular and commented explaining the *why*. Use Polish UTF-8 correctly
  (ą ę ł ó ż etc.). Accessible: keyboard-closable modal (Esc), aria labels,
  reduced-motion fallback.

DELIVERABLE
Output the complete file tree with full file contents, plus a README with run
instructions. Ensure it actually builds and runs.
```

---

## How this prompt maps to the shipped code

Every clause above is implemented in this repo and verified with a clean
`npm run build` (Next.js 14.2.x, static prerender) and a live `200 OK` smoke
test. See `README.md` for the architecture and run instructions.

| Prompt clause | Where it lives |
|---|---|
| Suffix highlighting engine | `components/Highlight.tsx` + `lib/types.ts` (`Segment`) |
| Tabbed nav + view transition | `components/TabNav.tsx`, `components/PolskiWorld.tsx` |
| 30-day timeline + scroll beam | `components/GrammarVault.tsx` |
| Day modal + animated declensions | `components/GrammarModal.tsx`, `TransformationPanel.tsx` |
| Per-day mini-challenge | `components/MiniChallenge.tsx` |
| Practice quiz | `components/PracticeQuiz.tsx` |
| localStorage persistence | `lib/useProgress.ts` |
| All 30 days of content | `lib/grammarData.ts` |
```
