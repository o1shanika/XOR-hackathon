import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as SystemUI from 'expo-system-ui';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView,StatusBar } from 'react-native';
import ReportSentModal from '../components/ReportSentModel';
import i18n from './i18/i18next';



const emergencyTypes = [
  { id: 'redcross', label: 'RedCross', image:require('../assets/images/redcross.jpg') },
  { id: 'embassy', label: 'Embassy', image:require('../assets/images/embessy.jpg') },
  { id: 'slbfe', label: 'SLBFE', image:require('../assets/images/slbfe.jpg') }
];

const ReportEmergencyScreen: React.FC = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set dark color for system navigation bar
    SystemUI.setBackgroundColorAsync('#000'); // or any dark color like '#111111'
  }, []);

  const [selectedType, setSelectedType] = useState('redcross');
  const [phoneNumber, setPhoneNumber] = useState('091 1245 4588');
  const [message, setMessage] = useState('');
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return;

        const response = await axios.get(`http://192.168.43.135:5000/api/auth/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  //reportsent modal
  const [report, setReport] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSend = () => {
    // Send report logic here (e.g., API call)
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setReport(''); // Clear form input here!
  };
  //reportsent modal

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topcontainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Emergencies')} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#ffff" />
        </TouchableOpacity>
      <Text style={styles.title}>{i18n.t('emergency.reportEmergency')}</Text>
      </View>

      
      <ScrollView style={styles.formcontainer}>
       <Text style={styles.label}>{i18n.t('emergency.selectEmergencyType')}</Text>
        <View style={styles.emergencyTypeContainer}>
          {emergencyTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.emergencyType,
                selectedType === type.id && styles.selectedType
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <Image source={type.image} style={styles.typeImage} resizeMode="contain" />
              <Text style={styles.typeLabel}>{type.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>{i18n.t('emergency.contactPhone')}</Text>
        <View style={styles.phoneContainer}>
          <Ionicons name="call-outline" size={20} color="#007BFF" />
          <TextInput
            style={styles.phoneInput}
            value={user?.number0}
            onChangeText={setPhoneNumber}
            editable={isEditingPhone}
          />
          <TouchableOpacity onPress={() => setIsEditingPhone(!isEditingPhone)}>
           <Text style={styles.changeText}>{isEditingPhone ? 'Done' : i18n.t('emergency.change')}</Text>
          </TouchableOpacity>
        </View>

     <Text style={styles.label}>{i18n.t('emergency.typeMessage')}</Text>
        <TextInput
          style={styles.messageBox}
          value={report}
          onChangeText={setReport}
          placeholder="Enter message"
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSend} >
           <Text style={styles.sendText}>{i18n.t('emergency.send')}</Text>
        </TouchableOpacity>
      </ScrollView>  
      <ReportSentModal visible={modalVisible} onClose={handleModalClose} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#ffff',
    paddingTop: 30,
    //paddingTop: Constants.statusBarHeight,
    marginBottom:0,
  },
  topcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#00bfff',
    marginBottom: 10,
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
  formcontainer: {
    height:'70%',
    paddingHorizontal: 20,
    paddingTop:10,
    paddingBottom:0,
  },
  label: {
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
  },
  emergencyTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom:15
  },
  emergencyType: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginHorizontal: 4,
    backgroundColor: '#fff',
  },
  typeImage: {
    width: 30,
    height: 30,
    marginBottom: 5,
  },  
  selectedType: {
    borderColor: '#00BFFF',
    backgroundColor: '#fff',
  },
  typeLabel: {
    marginTop: 4,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginBottom:1,
  },
  phoneInput: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 16,
  },
  changeText: {
    color: '#00BFFF',
    fontWeight: '500',
  },
  messageBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    minHeight: 150,
  },
  sendButton: {
    marginTop: 30,
    backgroundColor: '#00BFFF',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  sendText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReportEmergencyScreen;