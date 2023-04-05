import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAeRXfhL6zcliusUMwugj9FRM6riMMFdn0",
    authDomain: "lg-pros.firebaseapp.com",
    projectId: "lg-pros",
    storageBucket: "lg-pros.appspot.com",
    messagingSenderId: "294372075704",
    appId: "1:294372075704:web:70c3c2d3bde01979096c4d",
    measurementId: "G-S53R0PZPD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth }