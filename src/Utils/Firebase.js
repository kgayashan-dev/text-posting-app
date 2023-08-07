// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'; 
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAq-T5_Qf3dY--9MqStFrpKmfKKuw7bz9Y",
    authDomain: "post-app-62b59.firebaseapp.com",
    projectId: "post-app-62b59",
    storageBucket: "post-app-62b59.appspot.com",
    messagingSenderId: "789583690672",
    appId: "1:789583690672:web:1f01ab37eaabf36eabb475",
    measurementId: "G-9D6MCLLES7"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth();
export const db = getFirestore(app);
