// components/BookingForm.js
import React from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import useBookingForm from '../hooks/useBookingForm';
import CustomButton from './CustomButton';
import styles from '../styles';

const BookingForm = ({ serviceId }) => {
  const {
    customerName,
    setCustomerName,
    customerEmail,
    setCustomerEmail,
    contactNumber,
    setContactNumber,
    address,
    setAddress,
    date,
    setDate,
    time,
    setTime,
    resetForm,
  } = useBookingForm();

  const handleBooking = async () => {
    if (!customerName || !customerEmail || !contactNumber || !address || !date || !time) {
      Alert.alert('All fields are mandatory');
      return;
    }

    try {
      await addDoc(collection(db, 'bookings'), {
        serviceId,
        customerName,
        customerEmail,
        contactNumber,
        address,
        date,
        time,
        bookingDate: new Date(),
      });
      Alert.alert('Booking confirmed');
      resetForm();
    } catch (error) {
      Alert.alert('Error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Booking Form</Text>
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
      <CustomButton onPress={handleBooking} title="Book Now" />
    </View>
  );
};

export default BookingForm;
