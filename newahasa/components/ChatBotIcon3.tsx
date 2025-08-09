import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';


const ChatBotIcon: React.FC<{ onPress: () => void }> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.chatBotIcon} onPress={onPress}>
      <Text style={styles.title}>
          AI Chat Assistant
      </Text>
      <Image source={require('../assets/images/bot.png')} style={styles.botImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chatBotIcon: {
    position: 'absolute',
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    width:'90%',
    top: '80%', 
    borderWidth:1,
    borderColor: '#00BFFF',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical:8,
    //backgroundColor: 'rgb(101,214,252)',
    backgroundColor: 'rgba(255,255,255, 0.7)'
    //elevation: 5, // For Android shadow
    
  },
  title: {
    marginVertical: 'auto',
    fontSize: 16,
    fontWeight: "bold",
    color:'#00bfff'
  },
  botImage: {
    width:40,
    height:40,
  }
});

export default ChatBotIcon;