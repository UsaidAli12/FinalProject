import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const ServicesScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [expandedServices, setExpandedServices] = useState({});

  useEffect(() => {
    const q = query(collection(db, 'services'), where('serviceCategory', '==', category));
    const unsubscribe = onSnapshot(q, snapshot => {
      const servicesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setServices(servicesData);
    });

    return () => unsubscribe();
  }, [category]);

  useEffect(() => {
    setFilteredServices(
      services.filter(service =>
        service.description.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, services]);

  const toggleExpand = (id) => {
    setExpandedServices(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => toggleExpand(item.id)}>
      <Text style={styles.title}>{item.description}</Text>
      {expandedServices[item.id] && (
        <View style={styles.details}>
          <Text style={styles.detailsText}>Category: {item.serviceCategory}</Text>
          <Text style={styles.detailsText}>Price: ${item.price}</Text>
          <Text style={styles.detailsText}>Vendor: {item.vendorName}</Text>
          <Text style={styles.detailsText}>Contact: {item.phoneNo}</Text>
          <Text style={styles.detailsText}>Location: {item.location}</Text>
          <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('Booking', { serviceId: item.id, serviceDescription: item.description, servicePrice: item.price })}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Services</Text>
      <TextInput
        style={styles.input}
        placeholder="Search Services"
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="#8A8A8A"
      />
      <FlatList
        data={filteredServices}
        keyExtractor={item => item.id}
        renderItem={renderItem}
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
  input: {
    height: 50,
    borderColor: '#BDBDBD',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 15,
    backgroundColor: '#FFF',
  },
  item: {
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
  title: {
    fontSize: 18,
    color: '#0288D1',
  },
  details: {
    marginTop: 10,
  },
  detailsText: {
    color: '#0288D1',
  },
  bookButton: {
    marginTop: 10,
    backgroundColor: '#0288D1',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ServicesScreen;