import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCdRI3AZ4_1QUsVLxLCozPcDb0ALau_aUw",
    authDomain: "onlinecompiler-bf7c3.firebaseapp.com",
    projectId: "onlinecompiler-bf7c3",
    storageBucket: "onlinecompiler-bf7c3.appspot.com",
    messagingSenderId: "928632387689",
    appId: "1:928632387689:web:deac92025ece69fbde4af8",
    measurementId: "G-9362WLE4FT",
    databaseUrl: "https://console.firebase.google.com/u/0/project/onlinecompiler-bf7c3/database/onlinecompiler-bf7c3-default-rtdb/data/~2F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);