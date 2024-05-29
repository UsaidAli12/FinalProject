import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const VendorBookingsScreen = ({ route }) => {
  const { vendorId } = route.params;
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!vendorId) {
      console.error('vendorId is not defined');
      return;
    }

    console.log('Vendor ID:', vendorId); // Debugging vendorId

    const q = query(collection(db, 'bookings'), where('vendorId', '==', vendorId));
    const unsubscribe = onSnapshot(q, snapshot => {
      if (snapshot.empty) {
        console.log('No matching documents.');
      } else {
        const bookingsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Bookings Data:', bookingsData); // Debugging bookings data
        setBookings(bookingsData);
      }
      setLoading(false);
    }, error => {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [vendorId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0288D1" />
      </View>
    );
  }

  if (bookings.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>No Bookings Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Bookings</Text>
      <FlatList
        data={bookings}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookingItem}>
            <Text style={styles.bookingText}>{item.customerName}</Text>
            <Text style={styles.bookingText}>{item.customerEmail}</Text>
            <Text style={styles.bookingText}>{item.bookingDate.toDate().toString()}</Text>
            <Text style={styles.bookingText}>{item.address}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E0F7FA',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0288D1',
    textAlign: 'center',
    marginBottom: 20,
  },
  bookingItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  bookingText: {
    color: '#0288D1',
    marginBottom: 5,
  },
});

export default VendorBookingsScreen;
