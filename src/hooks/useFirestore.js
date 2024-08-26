// useFirestor contiene CRUD hacia firebase //

import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite"
import { useEffect, useState } from "react"
import { db, auth, storage } from "../firebase"


import { nanoid } from 'nanoid'
import moment from 'moment'
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"

export const useFirestore = () => {



    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState({})

    const fechaHoy = Date.now()
    const fechaHoyFormato = moment(fechaHoy).format('DD-MM-YYYY')





    // CREATE  data to firastore
    const addData = async (folioDoc, numTrailer, idUser, nameGuardia) => {
        try {
            setLoading(prev => ({ ...prev, addData: true }))
            const newDoc = {
                uid: auth.currentUser.uid,
                enabled: false,
                status: 'NEW',
                nanoid: folioDoc,
                numTrailer: numTrailer,
                idUser: idUser,
                nameGuardia: nameGuardia,
                createdDate: fechaHoyFormato,
                // idUSerRec: '',
                // rateTrailer: '',
                // fileList: []
            }
            const docRef = doc(db, 'picklists', newDoc.nanoid)
            await setDoc(docRef, newDoc)
            setData([...data, newDoc])
        } catch (error) {
            console.log(error)
            console.log(error.message)
        } finally {
            setLoading(prev => ({ ...prev, addData: false }))
        }
    }
    // READ data from firestore 
    const getData = async () => {
        // console.log(auth.currentUser)
        try {
            // activamos el state para el loading
            setLoading(prev => ({ ...prev, getData: true }))

            //  cargamos la constante datatRef con la BD de firebase
            const dataRef = collection(db, 'picklists')
            // hacemos el query para obtener los datos
            const q = query(
                dataRef,
                //  where("uid", "==", auth.currentUser.uid)
            )


            // obtenemos los docs
            const querySnapshot = await getDocs(q)
            // mapeamos cada docuemnto y agregamos el doc.id de cada documento
            const dataDB = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            // asignamos al state DATA los docuemntos mapeados
            setData(dataDB)
            // cathceamos el error
        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally {
            // cambiamos el state para elloading
            setLoading(prev => ({ ...prev, getData: false }))
        }
    }
    // UPDATE status Method url (origin)
    const updateData = async (
        idUser,
        nombre,
        email,
        telefono,
        direccion,
        logoURL,
        mision,
        vision,
        instagram,
        facebook,
        logoBBBURL,
        championData,
        videoURL,
        bannerPhotos,
        servicios,
        reviews,
    ) => {
        try {
            setLoading((prev) =>
                ({ ...prev, updateData: true }))

            const docRef = doc(db, "picklists", idUser)

            await updateDoc(docRef, {

                name: nombre,
                email: email,
                telephone: telefono,
                address: direccion,
                logoURL: logoURL,
                mision: mision,
                vision: vision,
                facebook: facebook,
                instagram: instagram,
                logoBBBURL: logoBBBURL,
                championData: championData,
                videoURL: videoURL,
                bannerPhotos: bannerPhotos,
                servicios: servicios,
                reviews: reviews,

                // imgList: imgList,
                // features: features,
                // properties: services,

                // salesImgURL: salesImgURL,
                // salesName: salesName

            })

        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading((prev) => ({ ...prev, updateData: false }))
        }
    }



    // DELETE Method all data
    const deleteData = async (nanoid) => {
        try {
            setLoading((prev) => ({ ...prev, addData: true }))
            const docRef = doc(db, "picklists", nanoid)
            await deleteDoc(docRef)
            setData(data.filter(item => item.nanoid !== nanoid))

        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading((prev) => ({ ...prev, addData: false }))
        }
    }




    // UPLOAD  files to storage function    
    const uploadFile = async (file) => {
        const storageRef = ref(storage, nanoid(6))
        await uploadBytes(storageRef, file)
        const url = await getDownloadURL(storageRef)
        return url
    }



    return {
        data,
        error,
        loading,
        getData,
        addData,
        deleteData,
        updateData,
        uploadFile
    }

}
