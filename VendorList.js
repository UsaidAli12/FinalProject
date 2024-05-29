// components/VendorList.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const VendorList = ({ navigation }) => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'vendors'), snapshot => {
      const vendorsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVendors(vendorsData);
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('Vendor', { vendorId: item.id })}
    >
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('../assets/background2.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.header}>Event Vendors</Text>
        <FlatList
          data={vendors}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
  },
  item: {
    backgroundColor: 'rgba(108, 99, 255, 0.8)',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    color: '#FFF',
  },
});

export default VendorList;
