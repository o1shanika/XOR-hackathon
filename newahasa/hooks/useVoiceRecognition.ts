// src/hooks/useVoiceRecognition.ts
import { useState, useEffect } from 'react';
import Voice from '@react-native-voice/voice';

const useVoiceRecognition = () => {
  const [recognizedText, setRecognizedText] = useState('');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = (event) => {
      setRecognizedText(event.value?.[0] || '');
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async (language: 'si-LK' | 'en-US') => {
    try {
      await Voice.start(language);
      setIsListening(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    await Voice.stop();
    setIsListening(false);
  };

  return { recognizedText, isListening, startListening, stopListening };
};

export default useVoiceRecognition;
