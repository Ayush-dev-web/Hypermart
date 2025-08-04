// firebase.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBDBSo5lmkBRV0y_32vP2Q7u9Jj8E3i4gc",
  authDomain: "hypermart-dd02b.firebaseapp.com",
  projectId: "hypermart-dd02b",
  storageBucket: "hypermart-dd02b.firebasestorage.app",
  messagingSenderId: "794538462966",
  appId: "1:794538462966:web:82dcaaeb283fa15efda6d7",
  measurementId: "G-9JS8VK2VES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Fix for React Native Auth persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
export const FIREBASE_WEB_CLIENT_ID = "794538462966-bsq8tcoucnvds8rj7j9oogs8662cdf0g.apps.googleusercontent.com";
