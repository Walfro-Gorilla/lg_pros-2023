import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.js";

export const UserContext = createContext()


const UserProvider = (props) => {

    const [user, setUser] = useState(false)

    // Whatcher de user login
    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (user) => {
            console.log(user)
            if (user) {
                const { email, photoURL, displayNAme, uid } = user
                setUser({ email, photoURL, displayNAme, uid })
            } else {
                setUser(null)
            }
        })
        return () => unsuscribe()
    }, [])


    // Registar usuario nuevo 
    const registerUser = (email, pass) =>
        createUserWithEmailAndPassword(auth, email, pass);
    // Logear usuario
    const loginUser = (email, pass) =>
        signInWithEmailAndPassword(auth, email, pass);
    // Logout user
    const signOutUser = () => signOut(auth)

    return (
        <UserContext.Provider value={{ user, setUser, registerUser, loginUser, signOutUser }} >
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider