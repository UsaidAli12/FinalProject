import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCUyNj3asppOJs7BK9Sra6EDdOrNL07fHQ",
  authDomain: "event-management-d6552.firebaseapp.com",
  projectId: "event-management-d6552",
  storageBucket: "event-management-d6552.appspot.com",
  messagingSenderId: "972291911873",
  appId: "1:972291911873:web:5bd549020cc918a0e16440"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { db, auth };
