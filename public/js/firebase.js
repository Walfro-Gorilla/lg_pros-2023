// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-analytics.js";
import { getDocs  } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAeRXfhL6zcliusUMwugj9FRM6riMMFdn0",
    authDomain: "lg-pros.firebaseapp.com",
    databaseURL: "https://lg-pros-default-rtdb.firebaseio.com",
    projectId: "lg-pros",
    storageBucket: "lg-pros.appspot.com",
    messagingSenderId: "294372075704",
    appId: "1:294372075704:web:3f49ff20747200ac096c4d",
    measurementId: "G-RGLXP9VB9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log("BD firestooores")  