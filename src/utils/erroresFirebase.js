export const erroresFirebase = (code) => {
    switch (code) {
        case "auth/email-already-in-use":
            return "Email ya registrado 😓"
        case "auth/invalid-email":
            return "Formato no valido 📧"
        case "auth/user-not-found":
            return "Email no registrado."
        case "auth/wrong-password":
            return "PAss incorrecto"
        default:
            return "Ocurrio un error en el server"
    }
}