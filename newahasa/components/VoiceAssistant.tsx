// src/components/VoiceAssistant.tsx
import React, { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import useVoiceRecognition from '../hooks/useVoiceRecognition';
import { speak } from '../utils/tts';
import { getAIResponse } from '../utils/aiResponse';

const VoiceAssistant = () => {
  const [language, setLanguage] = useState<'en-US' | 'si-LK'>('en-US');
  const [response, setResponse] = useState('');
  const { recognizedText, isListening, startListening, stopListening } = useVoiceRecognition();

  const handleVoice = async () => {
    await startListening(language);
    setTimeout(async () => {
      await stopListening();

      const reply = await getAIResponse(recognizedText, language);
      setResponse(reply);
      speak(reply, language);
    }, 5000); // Listen for 5 seconds
  };

  return (
    <View style={styles.container}>
      <Button title={isListening ? "Listening..." : "Start Voice"} onPress={handleVoice} />
      <Text>Recognized: {recognizedText}</Text>
      <Text>Response: {response}</Text>

      <View style={styles.langButtons}>
        <Button title="Sinhala" onPress={() => setLanguage('si-LK')} />
        <Button title="English" onPress={() => setLanguage('en-US')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  langButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
});

export default VoiceAssistant;
