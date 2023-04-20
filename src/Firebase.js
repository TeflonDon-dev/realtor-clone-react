// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5746-fZBqcuKDFnw3JNeRK3r0Mh7aANo",
  authDomain: "realtor-app-e1f83.firebaseapp.com",
  projectId: "realtor-app-e1f83",
  storageBucket: "realtor-app-e1f83.appspot.com",
  messagingSenderId: "512310850346",
  appId: "1:512310850346:web:da16f5ff5d3c3847fa2453"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db= getFirestore()