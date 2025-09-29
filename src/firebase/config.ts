// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdekkokjr3wxWbykNaSKkkwpkYNYEQqQg",
    authDomain: "future-vision-agency.firebaseapp.com",
    projectId: "future-vision-agency",
    storageBucket: "future-vision-agency.appspot.com",
    messagingSenderId: "249566921068",
    appId: "1:249566921068:web:ffa7c12c4e632564c3f349"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
