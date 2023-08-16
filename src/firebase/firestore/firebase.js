import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCjeU0inSn06N5R3xZGgcHDq5RB24Iy5Q",
  authDomain: "mundo-electro-ce2e9.firebaseapp.com",
  databaseURL: "https://mundo-electro-ce2e9-default-rtdb.firebaseio.com",
  projectId: "mundo-electro-ce2e9",
  storageBucket: "mundo-electro-ce2e9.appspot.com",
  messagingSenderId: "814315190532",
  appId: "1:814315190532:web:8c15638a1413c920657851",
  measurementId: "G-9G6T0NWL52"
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
