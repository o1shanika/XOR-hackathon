import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons} from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";



const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topcontainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home_2')} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#ffff" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
      </View>

      <View style={styles.notificationCard}>
        <Ionicons name="notifications-outline" size={24} color="#00B0FF" />
        <Text style={styles.notificationText}>
          <Text style={styles.bold}>Check Out New Community post!</Text> Free meals available for those who need.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    //paddingTop: 40, 
    backgroundColor: '#ffff' 
  },
  topcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#00bfff',
    marginBottom: 20,
    borderBottomLeftRadius:45,
  },
  backButton: {
    paddingRight: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color:'#ffff'
  },
  notificationCard: {
    backgroundColor: '#F0F8FF',
    padding: 16,
    marginHorizontal:20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth:1,
    borderColor: '#00BFFF',
  },
  notificationText: { 
    marginLeft: 10, 
    fontSize: 14, 
    flex: 1 
  },
  bold: { 
    fontWeight: 'bold' 
  },
});