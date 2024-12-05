// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// export const firebaseConfig = {
//   apiKey: "AIzaSyCTtZF1BGuyvYAqciGf3yVRXS75wtCCERU",
//   authDomain: "auth-reacte.firebaseapp.com",
//   projectId: "auth-reacte",
//   storageBucket: "auth-reacte.firebasestorage.app",
//   messagingSenderId: "13627782336",
//   appId: "1:13627782336:web:2629d37e6e7a6f2a55e925"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCTtZF1BGuyvYAqciGf3yVRXS75wtCCERU",
  authDomain: "auth-reacte.firebaseapp.com",
  projectId: "auth-reacte",
  storageBucket: "auth-reacte.firebasestorage.app",
  messagingSenderId: "13627782336",
  appId: "1:13627782336:web:2629d37e6e7a6f2a55e925"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
