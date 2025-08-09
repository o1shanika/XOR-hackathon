// src/utils/aiResponse.ts
export const getAIResponse = async (text: string, lang: 'si-LK' | 'en-US') => {
    // Basic offline response
    if (lang === 'si-LK') {
      if (text.includes('හෙලෝ')) return 'හෙලෝ! මම ඔබට උදව් කළ හැක.';
    }
    if (text.toLowerCase().includes('hello')) return 'Hello! How can I help you?';
  
    return 'Sorry, I didn’t understand that.';
  };
  