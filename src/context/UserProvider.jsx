import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase.js";


export const UserContext = createContext()


const UserProvider = (props) => {

    const [user, setUser] = useState(false)

    // STATES de picklist
    const [idUser, setIdUser] = useState('')
    const [numTrailer, setNumTrailer] = useState('')
    const [fileList, setFileList] = useState([]);
    const [rateTrailer, setRateTrailer] = useState('')
    const [modalLoginOpen, setModalLoginOpen] = useState(false)

    // STATEs de la data de la empresa
    const [logoURL, setLogoURL] = useState([])
    const [nombre, setNombre] = useState('');
    const [mision, setMision] = useState('');
    const [vision, setVision] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [facebook, setFacebook] = useState('');
    const [instagram, setInstagram] = useState('');
    const [direccion, setDireccion] = useState('');
    const [logoBBBUrl, setLogoBBBUrl] = useState();
    const [championData, setChampionData] = useState([])
    const [bannerPhotos, setBannerPhotos] = useState([])
    const [servicios, setServicios] = useState([])
    const [videoURL, setVideoURL] = useState([])
    const [reviews, setReviews] = useState([])

    // STATE global de las url's de las imagenes del website
    const [imagesWebsite, setImageWebsite] = useState([])
    const [nanoid, setNanoid] = useState('')


    // STATES para modulo de incidentes
    const [folioDoc, setFolioDoc] = useState('')
    const [nameGuardia, setNameGuardia] = useState('')
    const [incidentTitle, setIncidentTitle] = useState('')
    const [incidentDesc, setIncidentDesc] = useState('')
    const [urlPhoto, setUrlPhoto] = useState('')
    const [statusIncident, setStatusIncident] = useState('')
    const [createdDate, setCreateDate] = useState('')
    const [incidentRate, setIncidentRate] = useState('')
    const [urlsCorrective, setUrlsCorrective] = useState('')
    const [uid, setUid] = useState('')







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
        <UserContext.Provider
            value={{
                user, setUser,
                registerUser,
                loginUser, signOutUser,
                folioDoc, setFolioDoc,
                nameGuardia, setNameGuardia,
                numTrailer, setNumTrailer,
                statusIncident, setStatusIncident,
                fileList, setFileList,
                rateTrailer, setRateTrailer,

                modalLoginOpen, setModalLoginOpen,

                logoURL, setLogoURL,
                nombre, setNombre,
                mision, setMision,
                vision, setVision,
                email, setEmail,
                telefono, setTelefono,
                facebook, setFacebook,
                instagram, setInstagram,
                direccion, setDireccion,

                logoBBBUrl, setLogoBBBUrl,
                bannerPhotos, setBannerPhotos,
                championData, setChampionData,
                servicios, setServicios,
                videoURL, setVideoURL,
                reviews, setReviews,
                imagesWebsite, setImageWebsite,
                urlPhoto, setUrlPhoto,

                incidentTitle, setIncidentTitle,
                incidentDesc, setIncidentDesc,
                incidentRate, setIncidentRate,
                createdDate, setCreateDate,
                idUser, setIdUser,
                urlsCorrective, setUrlsCorrective,
                nanoid, setNanoid,
                uid, setUid,

            }}
        >
            {props.children}
        </UserContext.Provider>
    )


}
export default UserProvider