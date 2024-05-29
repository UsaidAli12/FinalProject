import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { categories } from '../categories'; // Ensure this import is correct based on your file structure

const VendorServiceForm = ({ vendorId }) => {
  const [serviceDescription, setServiceDescription] = useState('');
  const [price, setPrice] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [serviceCategory, setServiceCategory] = useState(categories[0]); // Set default category
  const [phoneNo, setPhoneNo] = useState('');
  const [location, setLocation] = useState('');

  const handleServiceUpload = async () => {
    if (!serviceDescription || !price || !serviceCategory || !vendorId) {
      Alert.alert('All fields are mandatory');
      return;
    }

    try {
      await addDoc(collection(db, 'services'), {
        vendorId, // Include vendorId
        description: serviceDescription,
        price: parseFloat(price),
        vendorName,
        serviceCategory,
        phoneNo,
        location,
        createdAt: new Date(),
      });
      Alert.alert('Service uploaded successfully');
      setServiceDescription('');
      setPrice('');
      setVendorName('');
      setServiceCategory(categories[0]);
      setPhoneNo('');
      setLocation('');
    } catch (error) {
      Alert.alert('Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Add New Service</Text>
      <TextInput
        style={styles.input}
        placeholder="Service Description"
        value={serviceDescription}
        onChangeText={setServiceDescription}
        placeholderTextColor="#8A8A8A"
      />
      <TextInput
        style={styles.input}
        placeholder="Vendor Name"
        value={vendorName}
        onChangeText={setVendorName}
        placeholderTextColor="#8A8A8A"
      />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={serviceCategory}
          onValueChange={(itemValue) => setServiceCategory(itemValue)}
          style={styles.picker}
        >
          {categories.map((category, index) => (
            <Picker.Item key={index} label={category} value={category} />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
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
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        placeholderTextColor="#8A8A8A"
      />
      <TouchableOpacity style={styles.button} onPress={handleServiceUpload}>
        <Text style={styles.buttonText}>Upload Service</Text>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: '#FFF',
  },
  picker: {
    height: 50,
    width: '100%',
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

export default VendorServiceForm;
