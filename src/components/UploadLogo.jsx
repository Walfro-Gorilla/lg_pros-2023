import React, { useContext, useState, useEffect } from 'react'
import { message, Upload, Modal } from 'antd';
import ImgCrop from 'antd-img-crop';

import { useFirestore } from '../hooks/useFirestore'
import { UserContext } from '../context/UserProvider';

import { PlusOutlined } from '@ant-design/icons';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });



const UploadLogo = (props) => {

    // Declaramos el state de los archivos
    const [cropArea, setCropArea] = useState()
    const [cropHeight, setCropHeight] = useState()
    const [cropWidth, setCropWidth] = useState()


    // Destructuring del useFirestore
    const { uploadLogo } = useFirestore()

    // Obtenemos el CONTEXT de usuario
    const {
        logoURL, setLogoURL,
        logoBBBUrl, setLogoBBBUrl,
        championData, setChampionData,
        videoURL, setVideoURL,
        testimonials, setTestimonials,
        bannerPhotos, setBannerPhotos,
        fileList, setFileList,
        imagesWebsite, setImageWebsite
    } = useContext(UserContext)

    // iniciamos los states para el PREVIEW de las img subidas
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    // HANDLES para el previes de im
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        try {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
        } catch (error) {
            console.log("ERROR PREVIEW: ", error)
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    // BUTTON para subir files
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const [loading, setLoading] = useState(false)
    // //const [file, setFile] = useState(null)


    // Seteamos las medidas del crop antes de subir la imagen
    useEffect(() => {

        // setLogoURL(props ? props.logoURL : {})


        if (props.type === 'bbb') {
            setCropHeight(855)
            setCropWidth(1673)
            // setImgUpload(props ? props.imgCovertura : '')
            setCropArea('855/1673')
            // console.log('imagen COVERTURA')

        } else if (props.type === 'logo') {
            setImageWebsite(logoURL)
            console.log("PROPS useEfect: ", props.type, logoURL)
            setCropHeight(250)
            setCropWidth(250)
            // setImgUpload(props ? props.imgCovertura : '')
            setCropArea('500/500')

            // console.log('imagen COVERTURA')
        } else if (props.type === 'champion') {
            setCropHeight(250)
            setCropWidth(250)
            // setImgUpload(props ? props.imgCovertura : '')
            setCropArea('500/500')
            // console.log('imagen COVERTURA')
        } else if (props.type === 'banner') {
            setCropHeight(250)
            setCropWidth(250)

            setImageWebsite(bannerPhotos)
            // setImgUpload(props ? props.imgCovertura : '')
            setCropArea('500/500')
            // console.log('imagen COVERTURA')
        }





    }, [logoURL])



    // -- // FUNCTION uploadData IMG // -- //
    const uploadData = async (e) => {

        const isJpgOrPng = e.type === 'image/jpeg' || e.type === 'image/png'
        const isLt5m = (e.size / 1024 / 1024) < 5

        if (!isJpgOrPng) { return message.error('Solo puedes subir imagenes JPG o PNG') }
        if (!isLt5m) { return message.error('La imagen que intentas subir, pesa mas de 5MB') }

        try {
            // Ejecutamos la funcion 'uploadLogo' y esperamos la repsuesta del URL
            const result = await uploadLogo(e)
            console.log("file: ", e)
            // Evaluamos el 'type' de los props
            if (props.type === "logo") {
                await setLogoURL([{
                    uid: '0',
                    name: e.name,
                    status: 'done',
                    url: result,
                }])
            } else if (props.type === "bbb") {
                setLogoBBBUrl({ ...logoBBBUrl, urlLogo: result })
            } else if (props.type === "champion") {
                setChampionData({ ...championData, urlLogo: result })
            } else if (props.type === "banner") {
                setBannerPhotos([...bannerPhotos, {
                    uid: bannerPhotos.length,
                    name: e.name,
                    status: 'done',
                    url: result,
                }])
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            <ImgCrop aspect={cropWidth / cropHeight} modalTitle='Ajusta la Imagen' rotationSlider={false} >
                <Upload
                    name='banner'
                    listType="picture-card"
                    // className='avatar-uploader'
                    showUploadList={props.showUploadList}
                    fileList={imagesWebsite}
                    onPreview={handlePreview}
                    // onChange={handleChange}

                    beforeUpload={uploadData}
                // onChange={e => onChangeBanner(e)}
                >
                    {imagesWebsite.length >= 5 ? null : uploadButton}
                    {/* {props ? <img src={imgCover} alt="Banner" style={{ width: '100%' }} /> : "subir..."} */}
                    {/* {fileList.length < 1 && <p> {imgBanner} </p>} */}
                </Upload>
            </ImgCrop>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};

export default UploadLogo;