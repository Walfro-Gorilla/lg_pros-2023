// useFirestor contiene CRUD hacia firebase //

import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite"
import { onSnapshot } from "firebase/firestore"
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





    // 🟢🟢🟢 CREATE  data to firastore 🟢🟢🟢
    const addData = async (
        folioDoc,
        nameGuardia,
        incidentTitle,
        incidentDesc,
        urlPhoto
    ) => {
        try {
            setLoading(prev => ({ ...prev, addData: true }))
            const newDoc = {
                //uid: auth.currentUser.uid,
                nanoid: folioDoc,
                enabled: false,
                incidentStatus: 'NEW',
                folioDoc: folioDoc,
                nameGuardia: nameGuardia,

                incidentTitle: incidentTitle,
                incidentDesc: incidentDesc,

                createdDate: fechaHoyFormato,
                urlPhoto: urlPhoto,

                
                idUser: '',
                incidentRate: '',
                // urlsCorrective: [],

            }
            const docRef = doc(db, 'incidentsLog', newDoc.nanoid)
            await setDoc(docRef, newDoc)
            setData([...data, newDoc])
        } catch (error) {
            console.log(error)
            console.log(error.message)
        } finally {
            setLoading(prev => ({ ...prev, addData: false }))
        }
    }


    //🔵🔵🔵 READ data from firestore 🔵🔵🔵 
    const getData = async () => {
        // console.log(auth.currentUser)
        try {
            // activamos el state para el loading
            setLoading(prev => ({ ...prev, getData: true }))
            //  cargamos la constante datatRef con la BD de firebase
            const dataRef = collection(db, 'incidentsLog')
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














    //🟠 UPDATE status Method url (origin)
    const updateData = async (
        uid,
        incidentStatus,
        idUser,
        incidentRate,
        urlsCorrective,

    ) => {
        try {
            setLoading((prev) =>
                ({ ...prev, updateData: true }))

            const docRef = doc(db, "incidentsLog", uid)

            await updateDoc(docRef, {


                incidentStatus: incidentStatus,
                idUser: idUser,
                incidentRate: incidentRate,
                urlsCorrective: urlsCorrective,

            })

        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading((prev) => ({ ...prev, updateData: false }))
        }
    }










    // 🟠🟠🟠 UPDATE incidenStatus
    const updateStatus = async (
        nanoid,
        incidentStatus
    ) => {
        try {
            setLoading((prev) =>
                ({ ...prev, updateData: true }))

            const docRef = doc(db, 'incidentsLog', nanoid)

            await updateDoc(docRef, {
                incidentStatus: incidentStatus
            })

        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading((prev) => ({ ...prev, updateData: false }))
        }
    }




















    //🔴🔴🔴 DELETE Method all data 🔴🔴🔴
    const deleteData = async (nanoid) => {
        try {
            setLoading((prev) => ({ ...prev, addData: true }))
            const docRef = doc(db, "incidentsLog", nanoid)
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
        updateStatus,
        uploadFile
    }

}
