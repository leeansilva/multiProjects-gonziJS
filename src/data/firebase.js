// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBW2KG00zZLZkz0h3SYOx70i9-kn4pcv_Q",
    authDomain: "login-59999.firebaseapp.com",
    projectId: "login-59999",
    storageBucket: "login-59999.appspot.com",
    messagingSenderId: "856273900335",
    appId: "1:856273900335:web:fb9e0b56de64ef4b2347da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);