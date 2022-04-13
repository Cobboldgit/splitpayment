import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyATf1Wxah5cFlO-N4-o8EWR3rSz98wo23Q",
  authDomain: "splitpayment-e158a.firebaseapp.com",
  projectId: "splitpayment-e158a",
  storageBucket: "splitpayment-e158a.appspot.com",
  messagingSenderId: "915146017713",
  appId: "1:915146017713:web:af39b41ec9d0d1d21d0b90",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;
