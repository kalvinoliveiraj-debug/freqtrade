/**
 * The Polski World Language Pack (PT-BR → PL). 🎯
 *
 * This is the only Polish-specific bundle the engine consumes. To ship a new
 * pair (PT→ES, PT→DE, …) you author a sibling pack and swap it in — zero engine
 * changes. That separation is the whole platform thesis (Blueprint Part X).
 */
import type { LanguagePack } from '../../engine/types';
import { curriculum } from './curriculum';
import { vocabulary } from './vocabulary';

export const ptPlPack: LanguagePack = {
  meta: {
    id: 'pt-pl',
    baseLanguage: 'pt-BR',
    targetLanguage: 'pl',
    flagPair: '🇧🇷→🇵🇱',
    productName: 'Polski World',
    cefrRange: ['A0', 'B2'],
    totalDays: 100,
    freeDays: 10, // Sequenced Launch: Days 1–10 free, 11–100 "Em breve".
  },

  branding: {
    primaryColor: '#D4213D', // Polish red
    accentColor: '#1FA363', // Brazilian green
    bgColor: '#0E1A2B',
    surfaceColor: '#16263B',
    textColor: '#F5F7FA',
    mutedColor: '#8FA3B8',
    mascotName: 'Orzełek', // "little eagle"
    // Level names localise per pack (Blueprint 4.4).
    levelNames: [
      'Przybysz', 'Turysta', 'Mieszkaniec', 'Znajomy', 'Przyjaciel',
      'Sąsiad', 'Obywatel', 'Patriota', 'Złoty Orzeł',
    ],
  },

  // All learner-facing copy lives here, in the base language (Blueprint 4.3).
  strings: {
    appTagline: 'Aprende polaco, do jeito brasileiro.',
    onboardingWhy: 'Por que estás a aprender polaco?',
    reason_work: 'Trabalho',
    reason_partner: 'Parceiro(a)',
    reason_relocating: 'Mudança para a Polónia',
    reason_heritage: 'Raízes / família',
    reason_study: 'Estudos',
    reason_curiosity: 'Curiosidade',
    goalQuestion: 'Qual é a tua meta diária?',
    goal_5: 'Casual · 5 min',
    goal_10: 'Regular · 10 min',
    goal_15: 'Sério · 15 min',
    goal_20: 'Intenso · 20 min',
    notifyQuestion: 'A que horas queres o teu lembrete?',
    namePrompt: 'Como te chamas?',
    start: 'Começar',
    continue: 'Continuar',
    check: 'Verificar',
    next: 'Seguinte',
    correct: 'Boa! 🎉',
    incorrect: 'Quase! A resposta certa:',
    lessonComplete: 'Lição concluída!',
    dayLocked: 'Em breve — entra para seres avisado',
    comingSoon: 'Em breve',
    freeBanner: 'Dias 1–10 grátis. Os dias 11–100 chegam em breve!',
    heartsOut: 'Ficaste sem corações. Espera, vê um anúncio, ou passa a Plus.',
    streakTitle: 'Sequência',
    xpTitle: 'XP',
    review: 'Revisão',
    listenPrompt: 'Toca no que ouves',
    typePrompt: 'Escreve o que ouves',
    tutorTitle: 'Conversa com o Orzełek',
    tutorOfflineGreeting: 'Cześć! 🙂',
    aiOffline: 'Liga o proxy de IA para conversar ao vivo.',
    certificateCta: 'O teu certificado',
  },

  vocabulary,
  curriculum,

  certificate: {
    levelClaim: 'B2-aligned',
    examOnRamp:
      'Conclui o Polski World e prepara-te para o exame estatal oficial de polaco ' +
      '(państwowy egzamin certyfikatowy). Este é um Certificado de Conclusão, não um certificado CEFR oficial.',
  },
};

export default ptPlPack;
