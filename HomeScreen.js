// screens/HomeScreen.js
import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Home</Text>
      <View style={styles.buttonContainer}>
        <Button title="Services" onPress={() => navigation.navigate('Services')} color="#0288D1" />
      </View>
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
  buttonContainer: {
    marginVertical: 10,
  },
});

export default HomeScreen;
