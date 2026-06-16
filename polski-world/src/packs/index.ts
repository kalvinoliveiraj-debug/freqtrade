/**
 * Pack registry. The app loads ONE active pack; swapping this line reskins the
 * entire product into a different language pair. That's the platform promise.
 */
import { configureAudio } from '../engine/audio';
import type { LanguagePack } from '../engine/types';
import { ptPlPack } from './pt-pl';

export const activePack: LanguagePack = ptPlPack;

// Point the TTS fallback at the active pack's target language.
configureAudio(activePack.meta.targetLanguage);

export const PACKS: Record<string, LanguagePack> = {
  [ptPlPack.meta.id]: ptPlPack,
};
