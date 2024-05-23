// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAB0HsvRyMPi9IoE0AUaVWEj00PrM4uATI",
  authDomain: "crud-firebase-practica.firebaseapp.com",
  projectId: "crud-firebase-practica",
  storageBucket: "crud-firebase-practica.appspot.com",
  messagingSenderId: "505632179803",
  appId: "1:505632179803:web:fb3e749580dc7d5173a17e",
  measurementId: "G-XXWW5TLYZV"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);