// components/CompanyRegistrationForm.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const CompanyRegistrationForm = ({ navigation }) => {
  const [companyName, setCompanyName] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const handleCompanyRegistration = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'vendors', user.uid), {
          companyName,
          companyWebsite,
          address,
          phoneNo,
          isRegistered: true,
        });
        Alert.alert('Company registered successfully');
        navigation.navigate('VendorHome');
      } else {
        Alert.alert('Error: User not logged in');
      }
    } catch (error) {
      Alert.alert('Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Company Name"
        value={companyName}
        onChangeText={setCompanyName}
        placeholderTextColor="#8A8A8A"
      />
      <TextInput
        style={styles.input}
        placeholder="Company Website"
        value={companyWebsite}
        onChangeText={setCompanyWebsite}
        placeholderTextColor="#8A8A8A"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
        placeholderTextColor="#8A8A8A"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNo}
        onChangeText={setPhoneNo}
        keyboardType="phone-pad"
        placeholderTextColor="#8A8A8A"
      />
      <TouchableOpacity style={styles.button} onPress={handleCompanyRegistration}>
        <Text style={styles.buttonText}>Register Company</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#E0F7FA',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0288D1',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#0288D1',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CompanyRegistrationForm;
