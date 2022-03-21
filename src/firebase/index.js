import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXupbfINVUTAU85mwmbYQHmHp9OhyXa_E",
  authDomain: "galileoeducation-v2.firebaseapp.com",
  projectId: "galileoeducation-v2",
  storageBucket: "galileoeducation-v2.appspot.com",
  messagingSenderId: "639058859842",
  appId: "1:639058859842:web:d160ec2bffa1452a709adb",
  measurementId: "G-PBCDPGTBEV"
};         

const app = initializeApp(firebaseConfig);
    
export const db = getFirestore();              
export const auth = getAuth();

export default app;