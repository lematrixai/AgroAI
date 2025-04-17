// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBji31fpsABMz55RQUlcYp5HOlYWR19jZM",
    authDomain: "elite-crossbar-449418-t4.firebaseapp.com",
    projectId: "elite-crossbar-449418-t4",
    storageBucket: "elite-crossbar-449418-t4.firebasestorage.app",
    messagingSenderId: "312727993483",
    appId: "1:312727993483:web:85781df184635808f1288e"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

// db
export const firebase = getFirestore(app);