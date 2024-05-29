import React from 'react';
import { View, StyleSheet } from 'react-native';
import VendorServiceForm from '../components/VendorServiceForm';

const NewServiceScreen = ({ route }) => {
  const { vendorId } = route.params; // Get vendorId from route params

  return (
    <View style={styles.container}>
      <VendorServiceForm vendorId={vendorId} />
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
});

export default NewServiceScreen;
