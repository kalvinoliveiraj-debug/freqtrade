/**
 * Polski World — Phase 1 (Foundations), Days 1–10.
 *
 * These are the free, validation-gated days of the Sequenced Launch (Blueprint
 * Part VII). Days 11–100 are authored later, only once Day-7 retention proves
 * out. Review day every ~7 days; a Boss Challenge closes the block.
 */
import type { Day } from '../../engine/types';
import { buildDay } from './builder';

const D1_10 = [
  'czesc', 'dzien-dobry', 'dobry-wieczor', 'dobranoc', 'do-widzenia',
  'tak', 'nie', 'dziekuje', 'prosze', 'przepraszam',
  'jeden', 'dwa', 'trzy', 'cztery', 'piec', 'szesc', 'siedem', 'osiem', 'dziewiec', 'dziesiec',
  'jak-sie-masz', 'dobrze', 'zle', 'imie', 'mam-na-imie', 'milo-mi', 'bardzo',
  'ja', 'ty', 'on', 'ona', 'my', 'jestem', 'jestes', 'jest',
];

export const curriculum: Day[] = [
  buildDay({
    dayNumber: 1,
    phase: 'Foundations',
    cefrTarget: 'A0',
    title: { base: 'Primeiras palavras', target: 'Pierwsze słowa' },
    objectives: [
      'Cumprimentar e despedir-se em polaco',
      'Dizer "sim", "não", "obrigado" e "desculpa"',
    ],
    vocabIds: [
      'czesc', 'dzien-dobry', 'dobry-wieczor', 'dobranoc', 'do-widzenia',
      'tak', 'nie', 'dziekuje', 'prosze', 'przepraszam',
    ],
    distractorPool: [
      'czesc', 'dzien-dobry', 'dobry-wieczor', 'dobranoc', 'do-widzenia',
      'tak', 'nie', 'dziekuje', 'prosze', 'przepraszam',
    ],
    cultureBridge:
      'Tal como o "bom dia" muda para "boa tarde", em polaco "dzień dobry" serve de manhã e à tarde; à noite passa a "dobry wieczór".',
    sentences: [
      {
        prompt: 'Olá, obrigado!',
        answer: ['Cześć,', 'dziękuję!'],
        practises: ['czesc', 'dziekuje'],
        distractors: ['proszę', 'nie'],
      },
    ],
    reward: { xp: 10 },
  }),

  buildDay({
    dayNumber: 2,
    phase: 'Foundations',
    cefrTarget: 'A0',
    title: { base: 'Números 1–10', target: 'Liczby 1–10' },
    objectives: ['Contar de 1 a 10', 'Reconhecer os números de ouvido'],
    vocabIds: ['jeden', 'dwa', 'trzy', 'cztery', 'piec', 'szesc', 'siedem', 'osiem', 'dziewiec', 'dziesiec'],
    distractorPool: ['jeden', 'dwa', 'trzy', 'cztery', 'piec', 'szesc', 'siedem', 'osiem', 'dziewiec', 'dziesiec'],
    grammarPoint: {
      id: 'numbers-overview',
      explanationBase:
        'Os números 1–10 são a base. Note os pares difíceis: "pięć" (cinco) e "sześć" (seis) têm sons nasais e o "szcz/ść" — ouça com atenção.',
      examples: [
        { target: 'jeden, dwa, trzy', base: 'um, dois, três' },
        { target: 'osiem, dziewięć, dziesięć', base: 'oito, nove, dez' },
      ],
    },
    sentences: [
      {
        prompt: 'um, dois, três',
        answer: ['jeden,', 'dwa,', 'trzy'],
        practises: ['jeden', 'dwa', 'trzy'],
        distractors: ['cztery', 'pięć'],
      },
    ],
    reward: { xp: 10 },
  }),

  buildDay({
    dayNumber: 3,
    phase: 'Foundations',
    cefrTarget: 'A1',
    title: { base: 'Apresentar-se', target: 'Przedstawianie się' },
    objectives: ['Perguntar "como vais?"', 'Dizer o teu nome'],
    vocabIds: ['jak-sie-masz', 'dobrze', 'zle', 'imie', 'mam-na-imie', 'milo-mi', 'bardzo'],
    distractorPool: ['jak-sie-masz', 'dobrze', 'zle', 'imie', 'mam-na-imie', 'milo-mi', 'bardzo', 'czesc', 'dziekuje'],
    sentences: [
      {
        prompt: 'O meu nome é João.',
        answer: ['Mam', 'na', 'imię', 'João.'],
        practises: ['mam-na-imie'],
        distractors: ['jest', 'dobrze'],
      },
      {
        prompt: 'Como vais? — Muito bem!',
        answer: [],
        practises: ['jak-sie-masz', 'dobrze', 'bardzo'],
        blank: {
          sentence: 'Jak się masz? — Bardzo ___!',
          answer: 'dobrze',
          options: ['dobrze', 'źle', 'imię'],
        },
      },
    ],
    reward: { xp: 10 },
  }),

  buildDay({
    dayNumber: 4,
    phase: 'Foundations',
    cefrTarget: 'A1',
    title: { base: 'Eu sou… (być)', target: 'Ja jestem… (być)' },
    objectives: ['Usar os pronomes ja/ty/on/ona', 'Conjugar "być" no presente (sing.)'],
    vocabIds: ['ja', 'ty', 'on', 'ona', 'my', 'jestem', 'jestes', 'jest'],
    distractorPool: ['ja', 'ty', 'on', 'ona', 'my', 'jestem', 'jestes', 'jest', 'dobrze', 'imie'],
    grammarPoint: {
      id: 'byc-present',
      explanationBase:
        'O verbo "być" (ser/estar) muda com a pessoa: ja jestem, ty jesteś, on/ona jest. O pronome é muitas vezes omitido, porque a terminação já indica quem fala.',
      examples: [
        { target: 'Ja jestem João.', base: 'Eu sou o João.' },
        { target: 'Ona jest tutaj.', base: 'Ela está aqui.' },
      ],
    },
    sentences: [
      {
        prompt: 'Eu estou bem.',
        answer: ['Ja', 'jestem', 'dobrze.'],
        practises: ['ja', 'jestem', 'dobrze'],
        distractors: ['jest', 'ty'],
      },
      {
        prompt: 'Tu és… (preencher)',
        answer: [],
        practises: ['ty', 'jestes'],
        blank: {
          sentence: 'Ty ___ João.',
          answer: 'jesteś',
          options: ['jesteś', 'jestem', 'jest'],
        },
      },
    ],
    reward: { xp: 10 },
  }),

  buildDay({
    dayNumber: 5,
    phase: 'Foundations',
    cefrTarget: 'A1',
    title: { base: 'Revisão 1', target: 'Powtórka 1' },
    objectives: ['Consolidar Dias 1–4', 'Recuperar palavras de memória (SRS)'],
    vocabIds: [],
    distractorPool: D1_10,
    reviewIds: [
      'czesc', 'dziekuje', 'prosze', 'tak', 'nie',
      'jeden', 'piec', 'dziesiec',
      'jak-sie-masz', 'dobrze', 'mam-na-imie',
      'ja', 'jestem', 'jest', 'ty', 'ona',
    ],
    isReviewDay: true,
    reward: { xp: 15 },
  }),

  buildDay({
    dayNumber: 6,
    phase: 'Foundations',
    cefrTarget: 'A1',
    title: { base: 'Cores', target: 'Kolory' },
    objectives: ['Nomear 6 cores', 'Descrever objetos simples'],
    vocabIds: ['kolor', 'czerwony', 'niebieski', 'zielony', 'zolty', 'czarny', 'bialy'],
    distractorPool: ['kolor', 'czerwony', 'niebieski', 'zielony', 'zolty', 'czarny', 'bialy'],
    cultureBridge:
      'O vermelho e o branco (czerwony i biały) são as cores da bandeira polaca — fáceis de lembrar.',
    sentences: [
      {
        prompt: 'vermelho e branco',
        answer: ['czerwony', 'i', 'biały'],
        practises: ['czerwony', 'bialy'],
        distractors: ['zielony', 'czarny'],
      },
    ],
    reward: { xp: 10 },
  }),

  buildDay({
    dayNumber: 7,
    phase: 'Foundations',
    cefrTarget: 'A1',
    title: { base: 'Família', target: 'Rodzina' },
    objectives: ['Nomear membros da família', 'Falar das pessoas próximas'],
    vocabIds: ['rodzina', 'matka', 'ojciec', 'brat', 'siostra', 'syn', 'corka'],
    distractorPool: ['rodzina', 'matka', 'ojciec', 'brat', 'siostra', 'syn', 'corka'],
    sentences: [
      {
        prompt: 'mãe e pai',
        answer: ['matka', 'i', 'ojciec'],
        practises: ['matka', 'ojciec'],
        distractors: ['brat', 'siostra'],
      },
    ],
    reward: { xp: 10 },
  }),

  buildDay({
    dayNumber: 8,
    phase: 'Foundations',
    cefrTarget: 'A1',
    title: { base: 'Comer e beber', target: 'Jeść i pić' },
    objectives: ['Pedir comida e bebida básicas', 'Usar "jeść" e "pić"'],
    vocabIds: ['woda', 'chleb', 'kawa', 'herbata', 'mleko', 'jablko', 'jesc', 'pic'],
    distractorPool: ['woda', 'chleb', 'kawa', 'herbata', 'mleko', 'jablko', 'jesc', 'pic'],
    cultureBridge:
      'Na Polónia, a "herbata" (chá) é tão comum como o café no Brasil — oferecida em quase todas as visitas.',
    sentences: [
      {
        prompt: 'água, por favor',
        answer: ['woda,', 'proszę'],
        practises: ['woda', 'prosze'],
        distractors: ['kawa', 'mleko'],
      },
    ],
    reward: { xp: 10 },
  }),

  buildDay({
    dayNumber: 9,
    phase: 'Foundations',
    cefrTarget: 'A1',
    title: { base: 'Tempo: hoje e amanhã', target: 'Czas: dziś i jutro' },
    objectives: ['Falar de hoje, ontem e amanhã', 'Situar ações no tempo'],
    vocabIds: ['dzien', 'noc', 'dzis', 'jutro', 'wczoraj', 'teraz', 'rano'],
    distractorPool: ['dzien', 'noc', 'dzis', 'jutro', 'wczoraj', 'teraz', 'rano'],
    sentences: [
      {
        prompt: 'hoje e amanhã',
        answer: ['dziś', 'i', 'jutro'],
        practises: ['dzis', 'jutro'],
        distractors: ['wczoraj', 'teraz'],
      },
    ],
    reward: { xp: 10 },
  }),

  buildDay({
    dayNumber: 10,
    phase: 'Foundations',
    cefrTarget: 'A1',
    title: { base: 'Desafio: Sobreviver na rua', target: 'Wyzwanie: Na ulicy' },
    objectives: [
      'Pedir ajuda e perguntar preços',
      'Dizer "não entendo" e "falo polaco"',
      'Boss Challenge: juntar tudo',
    ],
    vocabIds: ['gdzie', 'ile', 'kosztuje', 'nie-rozumiem', 'mowie-po-polsku', 'pomoc', 'toaleta'],
    distractorPool: [
      'gdzie', 'ile', 'kosztuje', 'nie-rozumiem', 'mowie-po-polsku', 'pomoc', 'toaleta',
      'prosze', 'dziekuje', 'woda',
    ],
    isBossDay: true,
    reviewIds: ['gdzie', 'ile', 'kosztuje', 'nie-rozumiem', 'mowie-po-polsku', 'pomoc', 'toaleta'],
    grammarPoint: {
      id: 'questions',
      explanationBase:
        'Para perguntar, comece com a palavra interrogativa: "Gdzie…?" (Onde…?), "Ile…?" (Quanto…?). A entoação sobe no fim, como em português.',
      examples: [
        { target: 'Gdzie jest toaleta?', base: 'Onde é a casa de banho?' },
        { target: 'Ile to kosztuje?', base: 'Quanto custa isto?' },
      ],
    },
    sentences: [
      {
        prompt: 'Onde é a casa de banho?',
        answer: ['Gdzie', 'jest', 'toaleta?'],
        practises: ['gdzie', 'toaleta'],
        distractors: ['ile', 'pomoc'],
      },
      {
        prompt: 'Quanto custa? (preencher)',
        answer: [],
        practises: ['ile', 'kosztuje'],
        blank: {
          sentence: 'Ile to ___?',
          answer: 'kosztuje',
          options: ['kosztuje', 'rozumiem', 'pomoc'],
        },
      },
    ],
    reward: { xp: 25, badge: 'boss-phase-1' },
  }),
];
