// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf80AQMdpwD_h2hHTL1EQ_CwPx8UQvfyw",
  authDomain: "flashcardsaas-69316.firebaseapp.com",
  projectId: "flashcardsaas-69316",
  storageBucket: "flashcardsaas-69316.appspot.com",
  messagingSenderId: "1081044924784",
  appId: "1:1081044924784:web:2566a626256a0d7c2c37b5",
  measurementId: "G-Y3BGGM1ZKD"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };