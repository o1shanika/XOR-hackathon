import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import i18n from './i18/i18next';
import Constants from 'expo-constants';
import { SafeAreaView } from "react-native-safe-area-context";


const EmergenciesScreen: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Set dark color for system navigation bar
    SystemUI.setBackgroundColorAsync('#000'); // or any dark color like '#111111'
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topcontainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home_2')} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#ffff" />
        </TouchableOpacity>
        <Text style={styles.title}>{i18n.t('emergency.reportEmergency')}</Text>
      </View>

      {/* Filter Button */}
      <View style={styles.filterButton}>
        <Text style={styles.filterText}>{i18n.t('emergency.ReportedByYou')}</Text>
      </View>

      {/* Emergency Card */}
      <View style={styles.card}>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={16} color="#555" />
          <Text style={styles.locationText}>Kothrud, Pune, 411038</Text>
          <Ionicons name="trash-outline" size={20} color="#00BfFF" style={styles.trashIcon} />
        </View>

        <View style={styles.cardContent}>
          <Ionicons name="car-sport-outline" size={30} color="#00BfFF" />
          <View style={styles.textContent}>
            <Text style={styles.cardTitle}>Road Accident</Text>
            <Text style={styles.cardDescription}>
              The incident involved the vehicle MH 41 AK 6543, which was involved in a collision between a car and a
              motorcycle. The accident resulted in a serious head injury for the biker. Urgent emergency services are
              needed at this location.
            </Text>
          </View>
        </View>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/ReportEmergencies')}>
        <Text style={styles.buttonText}>{i18n.t('emergency.reportEmergency')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default EmergenciesScreen;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#ffff',
    //paddingTop: Constants.statusBarHeight,
    marginBottom:45,
  },
  topcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#00bfff',
    marginBottom: 20,
    borderBottomLeftRadius:45,
    //boxShadow: '0 2px 2px gray'
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
  filterButton: {
    width:'90%',
    //backgroundColor: '#DDF5FF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: '5%',
    marginBottom: 16,
    borderBottomWidth:1,
    borderBottomColor: '#00BFFF',
    boxShadow: '0 1px 2px #00bfff'
  },
  filterText: {
    color: '#00BFFF',
    fontWeight: '600',
  },
  card: {
    width:'90%',
    marginLeft:'5%',
    borderWidth:1,
    borderColor: '#d4d4d4',
    borderRadius: 10,
    margin:10,
    padding:10,
    marginBottom: 20,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 13,
    color: '#333',
    marginLeft: 6,
    flex: 1,
  },
  trashIcon: {
    marginLeft: 10,
  },
  cardContent: {
    flexDirection: 'row',
  },
  textContent: {
    marginLeft: 12,
    flex: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#444',
  },
  button: {
    width:'90%',
    marginLeft:'5%',
    position:'absolute',
    backgroundColor: '#00BfFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    bottom:80,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
   
});