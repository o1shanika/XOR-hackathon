// src/utils/tts.ts
import * as Speech from 'expo-speech';

export const speak = (text: string, language: 'si-LK' | 'en-US') => {
  Speech.speak(text, { language });
};
