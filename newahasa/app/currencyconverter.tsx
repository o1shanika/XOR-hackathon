import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import currencyNames from './currencynames';
import { MaterialIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";


type ExchangeRatesResponse = {
  result: string;
  rates: { [key: string]: number };
};

const CurrencyConverter: React.FC = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('LKR');
  const [amount, setAmount] = useState<number>(1);
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://open.er-api.com/v6/latest/USD')  //https://open.er-api.com/v6/latest/USD
      .then((res) => res.json())
      .then((data: ExchangeRatesResponse) => {
        if (data.result === 'success') {
          setCurrencies(Object.keys(data.rates));
        }
      })
      .catch(() => {
        console.error('Failed to fetch currency list');
        setCurrencies([]); // optional: display fallback
      });
  }, []);

  const convertCurrency = () => {
    fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
      .then((res) => res.json())
      .then((data: ExchangeRatesResponse) => {
        if (data.result === 'success') {
          const rate = data.rates[toCurrency];
          const result = (amount * rate).toFixed(2);
          setConvertedAmount(result);
        } else {
          setConvertedAmount('Error');
        }
      })
      .catch(() => setConvertedAmount('Error'));
  };
  
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topcontainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#ffff" />
        </TouchableOpacity>
        <Text style={styles.title}>Currency Converter</Text>
      </View>
      
      <View style={styles.middlecontainer}>

        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={amount.toString()}
          onChangeText={(val) => setAmount(Number(val))}
        />
        
        <Text style={styles.label}>From:</Text>
        <View style={styles.pickercontainer}>
          <Picker
            selectedValue={fromCurrency}
            onValueChange={(val) => setFromCurrency(val)}
          >
            {currencies.map((cur) => (
              <Picker.Item key={cur} label={currencyNames[cur] ?? cur} value={cur} />
            ))}
          </Picker>
        </View>
        
        

        <Text style={styles.label}>To:</Text>
        <View style={styles.pickercontainer}>
          <Picker
            selectedValue={toCurrency}
            onValueChange={(val) => setToCurrency(val)}
          >
            {currencies.map((cur) => (
              <Picker.Item key={cur} label={currencyNames[cur] ?? cur} value={cur} />
            ))}
          </Picker>
        </View>
        

        <TouchableOpacity style={styles.button} onPress={convertCurrency}>
          <Text style={styles.buttontext}>
          Convert
          </Text>
        </TouchableOpacity>

        {convertedAmount && (
          <Text style={styles.result1}>
            Converted Amount:  
            <Text style={styles.result2}>  {convertedAmount} {toCurrency}</Text>
          </Text>
        )}

      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // container: { padding: 20 },
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#f4f4f4',
    //paddingTop: 40,
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
    color: '#ffff'
  },
  middlecontainer: {
    margin:20,
  },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { marginTop: 10, fontSize: 16 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    marginTop: 4,
    marginBottom: 12,
    fontSize:20
  },
  pickercontainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical:5,
    marginTop: 4,
    marginBottom: 12,
  },
  button: {
    backgroundColor:'#00bfff',
    paddingVertical:15,
    borderRadius:12,
    marginVertical:10
  },
  buttontext: {
    textAlign:'center',
    fontSize:20,
    color:'#fff',
    fontWeight:'800'
  },
  result1: { 
    marginTop: 20, 
    fontSize: 18, 
    fontWeight: '600' 
  },
  result2: { 
    marginTop: 20,
    paddingLeft:10, 
    fontSize: 25, 
    color:'#00bfff',
    fontWeight: '600' 
  },
});

export default CurrencyConverter;