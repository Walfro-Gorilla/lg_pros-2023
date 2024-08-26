import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { nanoid } from "nanoid";

// CONFIG de proyecto de firebase
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
const db = getFirestore(app)
const storage = getStorage(app)

//Function tu UPLOAD files to firebase storage.
export async function uploadFile(file, nanoid) {
    const storageRef = ref(storage, `videos/${nanoid}`)

    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    return url
}

export { auth, db, storage }

