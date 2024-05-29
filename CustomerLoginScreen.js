import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const CustomerLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login Successful');
      navigation.navigate('CustomerHome'); // Navigate to CustomerHome
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Signup Successful');
      navigation.navigate('CustomerHome'); // Navigate to CustomerHome
    } catch (error) {
      Alert.alert('Signup Failed', error.message);
    }
  };

  const handleSubmit = () => {
    if (isSignup) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{isSignup ? 'Sign Up' : 'Login'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#8A8A8A"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#8A8A8A"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{isSignup ? 'Sign Up' : 'Login'}</Text>
      </TouchableOpacity>
      {!isSignup && (
        <TouchableOpacity onPress={() => Alert.alert('Reset Password')}>
          <Text style={styles.forgotPasswordText}>Forget Password?</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.toggleText} onPress={() => setIsSignup(!isSignup)}>
        {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </Text>
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
  forgotPasswordText: {
    color: '#0288D1',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  toggleText: {
    color: '#0288D1',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomerLoginScreen;
