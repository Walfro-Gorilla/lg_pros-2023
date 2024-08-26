import React, { useState, useRef, useContext } from 'react';
// importamos las funciones de firebase
import { useFirestore } from '../hooks/useFirestore';
// Importamos el context del usuario
import { UserContext } from '../context/UserProvider';
// Upload file function
import { uploadFile } from '../firebase';
// Importmaos los componentes de antd
import { Modal, Button } from 'antd';

// importamos los iconos requeridos
import {  CameraFilled } from '@ant-design/icons';





const Camera = () => {

    // 📀 states y variables 
    const [stream, setStream] = useState(null);    
    const [modalOpen, setModalOpen] = useState(false)

    const videoRef = useRef();
    const canvasRef = useRef();


    // 💡 Inizializamos el contexto de userContext
    const {
        urlPhoto, setUrlPhoto
    } = useContext(UserContext)


    // 💡 Destructuramos las funciones del useFirestore 
    const {
        data, error, loading, getData, addData, deleteData, updateData
    } = useFirestore()



    // 💡📸🟢 Inicializamos la camara del dispositivo
    const startCamera = async () => {
        try {
            setModalOpen(true)
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            videoRef.current.srcObject = mediaStream;
        } catch (error) {
            console.error('Error al acceder a la cámara: ', error);
        }
    };

    // 💡📸🛑 Stop camera 
    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };


    // 💡📸🖼️ Capturamos la imagen que esta en el visor de la camara
    const captureImage = async () => {

        // variables 
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Establecer el ancho y el alto del lienzo para que coincida con el video
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;

        // Dibujar el fotograma actual del video en el lienzo
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Obtener la imagen como un blob
        canvas.toBlob(async (blob) => {
            try {
                const url = await uploadFile(blob)
                console.log('Imagen almacenada en Firestore con ID: ', url)
                setUrlPhoto(url)
                return url
            } catch (error) {
                console.error('Error al subir la imagen al almacenamiento de Firebase: ', error);
            }
        }, 'image/jpeg');

    };


    // 🟢🖼️ Tmamos foto 

    const handleShot = () => {
        captureImage()
        stopCamera()
        setModalOpen(false)

    }






    return (
        <div>
            <div>
                <Button onClick={startCamera}><CameraFilled /></Button>
                {/* <button onClick={stopCamera}>Stop Camera</button> */}
            </div>
            <Modal
                title="Take picture"
                open={modalOpen}
                onOk={handleShot}
                // confirmLoading={confirmLoading}
                onCancel={() => setModalOpen(false)}
            footer={[
                <Button key="shot" onClick={handleShot}>
                   <CameraFilled />
                </Button>
            ]}
            >

                <video ref={videoRef} autoPlay={true} style={{ width: '100%', maxWidth: '500px' }} />
                <canvas ref={canvasRef} style={{ display: 'none' }} />


            </Modal>           
        </div>
    );




};

export default Camera;
