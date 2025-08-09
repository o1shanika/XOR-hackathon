// src/App.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import VoiceAssistant from '../components/VoiceAssistant';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <VoiceAssistant />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
