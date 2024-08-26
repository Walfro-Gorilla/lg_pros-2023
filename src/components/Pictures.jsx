import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Upload, message } from 'antd';
import { useState, useContext } from 'react';
import { uploadFile } from '../firebase';
import { nanoid } from 'nanoid';

// Importamos el contexto del usuario
import { UserContext } from '../context/UserProvider';



const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });



const Pictures = ({ isAvaiblePicklist }) => {

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const {
    fileList, setFileList,
  } = useContext(UserContext)

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };


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

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  }

  // -- // function uploadData IMG // -- //
  // const uploadData = async (e) => {

  //   // uploadFile(e, nanoid(21))

  //   console.log("file e: ", e)
  // }

  const handleConfirmPictures = () => {
    console.log("Estas son las pictures: ", fileList)
    fileList.map((file) => {
      uploadFile(file.originFileObj, nanoid(21))
    })
  }

  return (
    <>
      <Upload
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        accept="image/png, image/jpeg"
        // beforeUpload={uploadData}
        disabled={isAvaiblePicklist}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
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
export default Pictures;