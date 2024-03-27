// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyD99CJlncT7I-NvKdEpy_NpomZ3dF31wVc",
  authDomain: "student-incentive-8215m.firebaseapp.com",
  projectId: "student-incentive-8215m",
  storageBucket: "student-incentive-8215m.appspot.com",
  messagingSenderId: "404956497165",
  appId: "1:404956497165:web:e0ad13290b5518ffa29c44",
  measurementId: "G-N3JZ9DFQM6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app); //not sure if the app should be here in ()

export const storage = getStorage(app);

export default app;