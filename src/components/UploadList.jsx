import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { useFirestore } from '../hooks/useFirestore';
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';


const UploadList = () => {

    // CONTEXT de las imagenes de banner
    const {bannerPhotos, setBannerPhotos} = useContext(UserContext)

    // Destructuring del useFirestore
    const { uploadLogo } = useFirestore()

    // HANDLE al subir archivos
    const handleBeforeUpload = async (file, fileList) => {
        const result = uploadLogo(file)
        setBannerPhotos(result)
        console.log("RESULTTT: ", result)
    }
    return (
        <Upload
            action={null}
            onChange={(file, fileList) => handleBeforeUpload(file, fileList)}
            // beforeUpload={}
        >
            <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload >
    )

};

export default UploadList;

