import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { db } from '../firebase';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';

const BookingScreen = ({ route }) => {
  const { serviceId, serviceDescription, servicePrice } = route.params;
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleBooking = async () => {
    if (!customerName || !customerEmail || !contactNumber || !address || !date || !time) {
      Alert.alert('All fields are mandatory');
      return;
    }

    try {
      // Retrieve the vendorId for the given serviceId
      const serviceDoc = await getDoc(doc(db, 'services', serviceId));

      if (!serviceDoc.exists()) {
        Alert.alert('Error', 'Service not found');
        return;
      }

      const serviceData = serviceDoc.data();
      console.log('Service Data:', serviceData);  // Debugging service data
      const vendorId = serviceData.vendorId;

      if (!vendorId) {
        Alert.alert('Error', 'Vendor ID is missing in service data');
        return;
      }

      await addDoc(collection(db, 'bookings'), {
        serviceId,
        vendorId,
        customerName,
        customerEmail,
        contactNumber,
        address,
        date,
        time,
        bookingDate: new Date(),
      });
      Alert.alert('Booking confirmed');
      setCustomerName('');
      setCustomerEmail('');
      setContactNumber('');
      setAddress('');
      setDate('');
      setTime('');
    } catch (error) {
      Alert.alert('Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Booking Form</Text>
      <Text style={styles.serviceInfo}>Service: {serviceDescription}</Text>
      <Text style={styles.serviceInfo}>Price: ${servicePrice}</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={customerName}
        onChangeText={setCustomerName}
        placeholderTextColor="#8A8A8A"
      />
      <TextInput
        style={styles.input}
        placeholder="Your Email"
        value={customerEmail}
        onChangeText={setCustomerEmail}
        placeholderTextColor="#8A8A8A"
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        value={contactNumber}
        onChangeText={setContactNumber}
        keyboardType="phone-pad"
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
        placeholder="Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        placeholderTextColor="#8A8A8A"
      />
      <TextInput
        style={styles.input}
        placeholder="Time (HH:MM)"
        value={time}
        onChangeText={setTime}
        placeholderTextColor="#8A8A8A"
      />
      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Book Now</Text>
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
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0288D1',
    textAlign: 'center',
    marginBottom: 20,
  },
  serviceInfo: {
    fontSize: 18,
    color: '#0288D1',
    textAlign: 'center',
    marginBottom: 10,
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
    marginTop: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookingScreen;
