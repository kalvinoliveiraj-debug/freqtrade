/**
 * Polski World vocabulary — PT-BR → PL, Days 1–10 (Phase 1: Foundations).
 *
 * This is the single source of truth for the pack's content; the curriculum
 * builder generates most exercises from it. `hardness` (0..1) flags the words
 * a native teacher should spot-check in the AI audio pipeline (Blueprint 3.3) —
 * the szcz / rz / dż / ę / ą clusters TTS most often gets wrong.
 *
 * Content drafted to be correct for a basic learner; per the blueprint this is
 * exactly where a paid native teacher + second-native review gate belongs
 * before any paid launch.
 */
import type { VocabEntry } from '../../engine/types';

export const vocabulary: VocabEntry[] = [
  // ----- Day 1 — Greetings & politeness -----
  { id: 'czesc', target: 'Cześć', base: 'Oi / Olá', pos: 'interj', day: 1, hardness: 0.6 },
  { id: 'dzien-dobry', target: 'Dzień dobry', base: 'Bom dia', pos: 'phrase', day: 1, hardness: 0.4 },
  { id: 'dobry-wieczor', target: 'Dobry wieczór', base: 'Boa noite (saudação)', pos: 'phrase', day: 1, hardness: 0.4 },
  { id: 'dobranoc', target: 'Dobranoc', base: 'Boa noite (despedida)', pos: 'interj', day: 1, hardness: 0.2 },
  { id: 'do-widzenia', target: 'Do widzenia', base: 'Até logo / Adeus', pos: 'phrase', day: 1, hardness: 0.3 },
  { id: 'tak', target: 'Tak', base: 'Sim', pos: 'adv', day: 1, hardness: 0 },
  { id: 'nie', target: 'Nie', base: 'Não', pos: 'adv', day: 1, hardness: 0 },
  { id: 'dziekuje', target: 'Dziękuję', base: 'Obrigado(a)', pos: 'phrase', day: 1, hardness: 0.7 },
  { id: 'prosze', target: 'Proszę', base: 'Por favor / De nada', pos: 'phrase', day: 1, hardness: 0.4 },
  { id: 'przepraszam', target: 'Przepraszam', base: 'Desculpa / Com licença', pos: 'phrase', day: 1, hardness: 0.8 },

  // ----- Day 2 — Numbers 1–10 -----
  { id: 'jeden', target: 'jeden', base: 'um', pos: 'num', day: 2, hardness: 0.1 },
  { id: 'dwa', target: 'dwa', base: 'dois', pos: 'num', day: 2, hardness: 0 },
  { id: 'trzy', target: 'trzy', base: 'três', pos: 'num', day: 2, hardness: 0.5 },
  { id: 'cztery', target: 'cztery', base: 'quatro', pos: 'num', day: 2, hardness: 0.5 },
  { id: 'piec', target: 'pięć', base: 'cinco', pos: 'num', day: 2, hardness: 0.5 },
  { id: 'szesc', target: 'sześć', base: 'seis', pos: 'num', day: 2, hardness: 0.7 },
  { id: 'siedem', target: 'siedem', base: 'sete', pos: 'num', day: 2, hardness: 0.1 },
  { id: 'osiem', target: 'osiem', base: 'oito', pos: 'num', day: 2, hardness: 0.1 },
  { id: 'dziewiec', target: 'dziewięć', base: 'nove', pos: 'num', day: 2, hardness: 0.7 },
  { id: 'dziesiec', target: 'dziesięć', base: 'dez', pos: 'num', day: 2, hardness: 0.6 },

  // ----- Day 3 — Introductions -----
  { id: 'jak-sie-masz', target: 'Jak się masz?', base: 'Como vai?', pos: 'phrase', day: 3, hardness: 0.3 },
  { id: 'dobrze', target: 'dobrze', base: 'bem', pos: 'adv', day: 3, hardness: 0.4 },
  { id: 'zle', target: 'źle', base: 'mal', pos: 'adv', day: 3, hardness: 0.6 },
  { id: 'imie', target: 'imię', base: 'nome', pos: 'noun', day: 3, hardness: 0.3 },
  { id: 'mam-na-imie', target: 'Mam na imię…', base: 'O meu nome é…', pos: 'phrase', day: 3, hardness: 0.3 },
  { id: 'milo-mi', target: 'Miło mi', base: 'Prazer', pos: 'phrase', day: 3, hardness: 0.2 },
  { id: 'bardzo', target: 'bardzo', base: 'muito', pos: 'adv', day: 3, hardness: 0.2 },

  // ----- Day 4 — Pronouns & "to be" (być) -----
  { id: 'ja', target: 'ja', base: 'eu', pos: 'pron', day: 4, hardness: 0 },
  { id: 'ty', target: 'ty', base: 'tu / você', pos: 'pron', day: 4, hardness: 0 },
  { id: 'on', target: 'on', base: 'ele', pos: 'pron', day: 4, hardness: 0 },
  { id: 'ona', target: 'ona', base: 'ela', pos: 'pron', day: 4, hardness: 0 },
  { id: 'my', target: 'my', base: 'nós', pos: 'pron', day: 4, hardness: 0 },
  { id: 'jestem', target: 'jestem', base: '(eu) sou / estou', pos: 'verb', day: 4, hardness: 0.2 },
  { id: 'jestes', target: 'jesteś', base: '(tu) és / estás', pos: 'verb', day: 4, hardness: 0.3 },
  { id: 'jest', target: 'jest', base: '(ele/ela) é / está', pos: 'verb', day: 4, hardness: 0.1 },

  // ----- Day 6 — Colors -----
  { id: 'kolor', target: 'kolor', base: 'cor', pos: 'noun', day: 6, hardness: 0.1 },
  { id: 'czerwony', target: 'czerwony', base: 'vermelho', pos: 'adj', day: 6, hardness: 0.4 },
  { id: 'niebieski', target: 'niebieski', base: 'azul', pos: 'adj', day: 6, hardness: 0.3 },
  { id: 'zielony', target: 'zielony', base: 'verde', pos: 'adj', day: 6, hardness: 0.2 },
  { id: 'zolty', target: 'żółty', base: 'amarelo', pos: 'adj', day: 6, hardness: 0.6 },
  { id: 'czarny', target: 'czarny', base: 'preto', pos: 'adj', day: 6, hardness: 0.3 },
  { id: 'bialy', target: 'biały', base: 'branco', pos: 'adj', day: 6, hardness: 0.2 },

  // ----- Day 7 — Family -----
  { id: 'rodzina', target: 'rodzina', base: 'família', pos: 'noun', day: 7, hardness: 0.2 },
  { id: 'matka', target: 'matka', base: 'mãe', pos: 'noun', day: 7, hardness: 0.1 },
  { id: 'ojciec', target: 'ojciec', base: 'pai', pos: 'noun', day: 7, hardness: 0.3 },
  { id: 'brat', target: 'brat', base: 'irmão', pos: 'noun', day: 7, hardness: 0.1 },
  { id: 'siostra', target: 'siostra', base: 'irmã', pos: 'noun', day: 7, hardness: 0.2 },
  { id: 'syn', target: 'syn', base: 'filho', pos: 'noun', day: 7, hardness: 0.1 },
  { id: 'corka', target: 'córka', base: 'filha', pos: 'noun', day: 7, hardness: 0.2 },

  // ----- Day 8 — Food & drink -----
  { id: 'woda', target: 'woda', base: 'água', pos: 'noun', day: 8, hardness: 0.1 },
  { id: 'chleb', target: 'chleb', base: 'pão', pos: 'noun', day: 8, hardness: 0.3 },
  { id: 'kawa', target: 'kawa', base: 'café', pos: 'noun', day: 8, hardness: 0.1 },
  { id: 'herbata', target: 'herbata', base: 'chá', pos: 'noun', day: 8, hardness: 0.2 },
  { id: 'mleko', target: 'mleko', base: 'leite', pos: 'noun', day: 8, hardness: 0.1 },
  { id: 'jablko', target: 'jabłko', base: 'maçã', pos: 'noun', day: 8, hardness: 0.5 },
  { id: 'jesc', target: 'jeść', base: 'comer', pos: 'verb', day: 8, hardness: 0.4 },
  { id: 'pic', target: 'pić', base: 'beber', pos: 'verb', day: 8, hardness: 0.3 },

  // ----- Day 9 — Time basics -----
  { id: 'dzien', target: 'dzień', base: 'dia', pos: 'noun', day: 9, hardness: 0.3 },
  { id: 'noc', target: 'noc', base: 'noite', pos: 'noun', day: 9, hardness: 0.1 },
  { id: 'dzis', target: 'dziś', base: 'hoje', pos: 'adv', day: 9, hardness: 0.3 },
  { id: 'jutro', target: 'jutro', base: 'amanhã', pos: 'adv', day: 9, hardness: 0.1 },
  { id: 'wczoraj', target: 'wczoraj', base: 'ontem', pos: 'adv', day: 9, hardness: 0.4 },
  { id: 'teraz', target: 'teraz', base: 'agora', pos: 'adv', day: 9, hardness: 0.1 },
  { id: 'rano', target: 'rano', base: 'de manhã', pos: 'adv', day: 9, hardness: 0.1 },

  // ----- Day 10 — Survival phrases (Boss) -----
  { id: 'gdzie', target: 'gdzie', base: 'onde', pos: 'adv', day: 10, hardness: 0.3 },
  { id: 'ile', target: 'ile', base: 'quanto', pos: 'adv', day: 10, hardness: 0.1 },
  { id: 'kosztuje', target: 'kosztuje', base: 'custa', pos: 'verb', day: 10, hardness: 0.2 },
  { id: 'nie-rozumiem', target: 'Nie rozumiem', base: 'Não entendo', pos: 'phrase', day: 10, hardness: 0.3 },
  { id: 'mowie-po-polsku', target: 'Mówię po polsku', base: 'Falo polaco', pos: 'phrase', day: 10, hardness: 0.4 },
  { id: 'pomoc', target: 'pomoc', base: 'ajuda', pos: 'noun', day: 10, hardness: 0.1 },
  { id: 'toaleta', target: 'toaleta', base: 'casa de banho', pos: 'noun', day: 10, hardness: 0.1 },
];

export const vocabById: Record<string, VocabEntry> = Object.fromEntries(
  vocabulary.map((v) => [v.id, v]),
);
