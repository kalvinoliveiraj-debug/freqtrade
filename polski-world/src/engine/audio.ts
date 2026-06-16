/**
 * Audio playback.
 *
 * The production pipeline (Blueprint 3.3) ships pre-generated ElevenLabs audio
 * referenced by an `audioMap`. For a runnable build with no bundled assets we
 * fall back to on-device TTS in the pack's target language, so "Listen & Tap"
 * and dictation exercises work out of the box. Swap `speak()` for an audio-file
 * player once the real `audioMap` exists — the call sites don't change.
 */
import * as Speech from 'expo-speech';

let targetLocale = 'pl';

export function configureAudio(targetLanguage: string) {
  targetLocale = targetLanguage;
}

export function speak(text: string, opts?: { rate?: number }) {
  Speech.stop();
  Speech.speak(text, {
    language: targetLocale,
    rate: opts?.rate ?? 0.9, // slightly slowed — easier for learners
    pitch: 1.0,
  });
}

export function stopSpeaking() {
  Speech.stop();
}
