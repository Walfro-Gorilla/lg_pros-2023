import React, { useContext, useState, useEffect } from 'react'

import { UploadOutlined } from '@ant-design/icons';

import { message, Upload, Button } from 'antd';

import { useFirestore } from '../hooks/useFirestore'
import { UserContext } from '../context/UserProvider';
import { uploadFile } from '../firebase';



const UploadVideo = (props) => {

    // definimos el state para el cover de la imagen
    const [imgCover, setImgCover] = useState()
    // Destructuring del useFirestore
    const { uploadLogo } = useFirestore()

    // obtenemos el contexto de log y video 
    const {
        logoURL, setLogoURL,
        videoURL, setVideoURL,
    } = useContext(UserContext)


    useEffect(() => {
        setLogoURL(props ? props.logoURL : [])
    }, [])

    const [loading, setLoading] = useState(false)
    // //const [file, setFile] = useState(null)


    // -- // FUNCTION uploadData MP4 // -- //
    const uploadData = async (e) => {

        const isMp4File = e.type === 'video/mp4'
        const isLt5m = (e.size / 1024 / 1024) < 50

        if (!isMp4File) { return message.error('Solo puedes subir videos MP4') }
        if (!isLt5m) { return message.error('El video que intentas subir, pesa mas de 50MB') }

        try {
            const result = await uploadFile(e)

            if (props.type === "video") {
                setVideoURL({ ...videoURL, urlVideo: result })
                // setImgCover(result)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            <Upload
                name='videoLG'

                // listType="picture-card"
                // className='avatar-uploader'
                // showUploadList={false}
                accept='vide/mp4'

                beforeUpload={uploadData}
            // onChange={e => onChangeBanner(e)}
            >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                {/* {props ? <img src={props.videoURL} alt="VideoLG" style={{ width: '100%' }} /> : "subir..."} */}
                {/* {fileList.length < 1 && <p> {imgBanner} </p>} */}
            </Upload>
        </>
    );
};

export default UploadVideo;