import React, { useContext, useEffect, useState } from 'react'


// imprtamos los componentes  de ANTD necesarios.
import {
  Button, Col, Divider,
  Form, Input, Layout,
  Popconfirm,
  Row, Space, Typography,
  Upload,
  message, Table
} from 'antd'
const { Header, Footer, Sider, Content } = Layout;
const { Title, Text } = Typography;

// importamos los como COMPONENTS requeridos
import Banner from '../components/Banner'
import UploadLogo from '../components/UploadLogo';
import UploadList from '../components/UploadList';
import UploadVideo from '../components/UploadVideo';
import UploadAntd from '../components/UploadAntd';

// importamos el context con los estados globales
import { UserContext } from '../context/UserProvider';
// importamos el useFirestore para obtener los CRUD's
import { useFirestore } from '../hooks/useFirestore';
import ImgCrop from 'antd-img-crop';

// importamos iconos de antd
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import ListItems from '../components/ListItems';
import { nanoid } from 'nanoid';




const Admin = () => {


  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageURL',
      key: 'imageURL',
      render: (text) => <img src={text}></img>,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'desc',
      key: 'desc',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Delete',
      key: 'delete',
      render: () => <Button></Button>,
    },

  ]


  // handle para actualizar el CONTEXTo global
  const [dataLoaded, setDataLoaded] = useState(false)
  // handle para saber que tipo de imagen es
  const [imgType, setImgType] = useState('')

  // Servicio and Review new
  const [servicio, setServicio] = useState([])
  const [review, setReview] = useState([])



  // iniciliazmos los metodos del message
  const [messageApi, contextHolder] = message.useMessage()


  // obtenemos el CONTEXT de UserContext
  const {
    idUser, setIdUser,
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
    reviews, setReviews
  } = useContext(UserContext)




  // obtenemos los metodos de usefirestore.js
  const {
    data,
    error,
    loading,
    getData,
    addData,
    deleteData,
    updateData,
    uploadFile
  } = useFirestore()





  // USEEFECT para opbener la data
  useEffect(() => {
    if (!dataLoaded) {
      getData()
      setDataLoaded(true)
    }
    if (data && data.length > 0) {

      setNombre(data[0].name),
        setLogoURL(data[0].logoURL),
        setEmail(data[0].email),
        setTelefono(data[0].telephone),
        setDireccion(data[0].address),
        setIdUser('MEtaEfRB8'),
        setMision(data[0].mision),
        setVision(data[0].vision),
        setFacebook(data[0].facebook),
        setInstagram(data[0].instagram),
        setLogoBBBUrl(data[0].logoBBBURL),
        setChampionData(data[0].championData),
        setVideoURL(data[0].videoURL),
        setBannerPhotos(data[0].bannerPhotos),
        setServicios(data[0].servicios),
        setReviews(data[0].reviews)
    }
  }, [data, dataLoaded])






  // HANDLE para actualizar datos del form en la bd
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form on click")
    // aquí podrías enviar los datos a una API o hacer cualquier otra acción con ellos
  };






  ///*** -- // FUNCTION para subir las imágenes al firestore // -- ***//

  const uploadData = async (e) => {

    // Asignamos el tipo de imagen de 'e' a 'isJpgOrPng'
    const isJpgOrPng = e.type === 'image/jpeg' || e.type === 'image/png' || (e.name && e.name.toLowerCase().endsWith('.svg'))
    // Asignamos el tamaño de'e' a la variable 'isLt5m'
    const isLt5m = (e.size / 1024 / 1024) < 5



    // evaluamos si es el tipo de image valido, si no lo es muestra un mensaje
    if (!isJpgOrPng) { return message.error('Solo puedes subir imágenes JPG o PNG') }
    // evaluamos si es el tamaño valido, si no lo es muestra un mensaje
    if (!isLt5m) { return message.error('La imagen que intentas subir, pesa mas de 5MB') }



    // inicializamos un TRY para verificar el tipo de archivo y asignarlo al state correspondiente
    try {

      // asignamos el resultado de la función 'uploadFile(e)' a la constante result
      const result = await uploadFile(e)

      // evaluamos 'imgType' y asignamos el resultado al state correspondiente
      if (imgType === 'about') {
        setImgList(prev => ({ ...prev, aboutURL: result }));
      }
      else if (imgType === 'banner') {
        setBannerPhotos(result);
      }
      else if (imgType === 'logo') {
        setLogoURL(result);
      }
      else if (imgType === 'logoBBB') {
        setLogoBBBUrl(result);
      }
      else if (imgType === 'champion') {
        setChampionData({ ...championData, championURL: result })
      }
      else if (imgType === 'service') {
        setServicio(prev => ({ ...prev, imageURL: result, id: nanoid(6) }))
      }
      else if (imgType === 'review') {
        setReview(prev => ({ ...prev, imageURL: result, id: nanoid(6) }))
      }

    }
    catch (error) {
      // mostramos en consola si es que fallo
      console.log(error)
    }
  }



  const headerStyle = {
    textAlign: 'center',
    // color: '#fff',
    // height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    // backgroundColor: '#7dbcea',
  };
  const contentStyle = {
    // textAlign: 'center',
    minHeight: 500,
    // lineHeight: '120px',
    // color: '#fff',
    // backgroundColor: '#108ee9',
  };
  const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#061629',
  };
  const siderStyle = {
    textAlign: 'center',
    lineHeight: '120px',
    color: '#fff',
    backgroundColor: '#3ba0e9',
  };


  // --- // ⚙️ handle ADD SERVICE form ⚙️ // --- //
  // -------------------------------- //
  const handleAddService = async () => {

    //Evaluams que todos los states esten llenos
    if (!servicio.title || servicio.title === '') {
      messageApi.open({
        type: 'warning',
        content: 'Ingresa el titulo del servicio nuevo'
      })
      return
    }
    else if (!servicio.desc || servicio.desc === '') {
      messageApi.open({
        type: 'warning',
        content: 'Ingresa la descripcion del servicio'
      })
      return
    }
    else if (!servicio.imageURL || servicio.imageURL === '') {
      messageApi.open({
        type: 'warning',
        content: 'Selecciona una imagen para el servicio'
      })
      return
    }


    if (!Array.isArray(servicios)) {
      setServicios([servicio]);
    } else {
      setServicios([...servicios, servicio]);
    }



    messageApi.open({
      type: 'success',
      content: ' Se agrego el Servicio'
    })

    setServicio([])

  }


  // --- // ⚙️ handle ADD REVIEW form ⚙️ // --- //
  // -------------------------------- //
  const handleAddReview = async () => {

    //Evaluams que todos los states esten llenos
    if (!review.title || review.title === '') {
      messageApi.open({
        type: 'warning',
        content: 'Ingresa el nombre del cliente'
      })
      return
    }
    else if (!review.desc || review.desc === '') {
      messageApi.open({
        type: 'warning',
        content: 'Ingresa el review'
      })
      return
    }
    else if (!review.imageURL || review.imageURL === '') {
      messageApi.open({
        type: 'warning',
        content: 'Selecciona una imagen para el cliente'
      })
      return
    }


    if (!Array.isArray(reviews)) {
      setReviews([review]);
    } else {
      setReviews([...reviews, review]);
    }



    messageApi.open({
      type: 'success',
      content: ' Se agrego el review'
    })

    setReview([])

  }




  // --- // handle SUBMIT form // --- //
  // -------------------------------- //
  const handleOnFinishForm = async () => {

    // Evaluamos si STATE firstName esta vacio
    if (!nombre || nombre === '') {
      messageApi.open({
        type: 'warning',
        content: 'Ingresa el nombre del negocio.',
      });
      return
    }
    else if (!mision || mision === '') {
      messageApi.open({
        type: 'warning',
        content: 'Ingrese la MISIÓN'
      });
      return
    }
    // // Evaluamos si STATE type esta vacio
    else if (!vision || vision === '') {
      messageApi.open({
        type: 'warning',
        content: 'Escriba la VISION.',
      });
      return
      // Evaluamos si STATE telephone esta vacio
    }
    else if (!email || email === '') {
      messageApi.open({
        type: 'warning',
        content: 'Ingrese el email de contacto.',
      });
      return
    }
    // Evaluamos el state vidYoutubeURL 
    else if (!telefono || telefono === "") {
      messageApi.open({
        type: 'warning',
        content: 'Agregue el telefono.',
      });
      return
    }
    // Evaluamos el state direccion 
    else if (!direccion || direccion === null) {
      messageApi.open({
        type: 'warning',
        content: 'Ingresa la direccion.',
      });
      return
    }
    // Evaluamos el state facebook
    else if (!facebook || facebook === "") {
      messageApi.open({
        type: 'warning',
        content: 'Ingrese el link de FB.',
      });
      return
    }
    // // Evaluamos el state instagram 
    else if (!instagram || instagram === "") {
      messageApi.open({
        type: 'warning',
        content: 'Ingrese el link de IG.',
      });
      return
    }
    // // Evaluamos el state incluye 
    else if (!videoURL || videoURL.length === 0) {
      messageApi.open({
        type: 'warning',
        content: 'Ingrese el URL del video de YouTube.',
      });
      return
    }
    // // Evaluamos si STATE imagenes esta vacio
    // else if (
    //   !imgList.bannerURL || imgList.bannerURL === null ||
    //   !imgList.logoURL || imgList.logoURL === null ||
    //   !imgList.aboutURL || imgList.aboutURL === null
    // ) {
    //   messageApi.open({
    //     type: 'warning',
    //     content: 'Seleccione todas las imagenes requeridas',
    //   });
    //   return
    // }
    // // Evaluamos si STATE reviews esta vacio
    // else if (reviews.length === 0) {
    //   messageApi.open({
    //     type: 'warning',
    //     content: 'Agrega al menos un review',
    //   });
    //   return
    // }
    // // Evaluamos si STATE features esta vacio
    // else if (features.length === 0) {
    //   messageApi.open({
    //     type: 'warning',
    //     content: 'Agrega al menos un feature',
    //   });
    //   return
    // }
    // // Evaluamos si STATE services esta vacio
    // else if (services.length === 0) {
    //   messageApi.open({
    //     type: 'warning',
    //     content: 'Agrega al menos una propiedad',
    //   });
    //   return
    // }
    // // Evaluamos si STATE services esta vacio
    // else if (salesName.length === 0) {
    //   messageApi.open({
    //     type: 'warning',
    //     content: 'Agrega el nombre de vendedor',
    //   });
    //   return
    // }



    // MODO EDIT : si el idUser esta undefined o esta en modo edicion

    // actualizamos los datos
    await updateData(
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
      logoBBBUrl,
      championData,
      videoURL,
      bannerPhotos,
      servicios,

      reviews,
      // imgList,
      // features,

      // salesImgURL,
      // salesName

    )
    // Reseteamos los states implicados
    // resetStates()

    // msj success
    messageApi.open({
      type: 'success',
      content: 'Data  updated.',
    });
    return
  }


  return (
    <>
      {contextHolder}
      <Layout>
        <Header style={headerStyle}>
          <Banner />
        </Header>
        {/* <Divider /> */}
        <Content style={contentStyle}>

          <Row style={{ height: '100px' }} gutter={[24, 16]}>
            <Col span={11} style={{ margin: '30px' }}>
              <Title level={4}>Bienvenido  👋🏽</Title>
              <Text>Actualiza la información de tu website desde este panel.</Text>
            </Col>
            <Col span={11} style={{ marginTop: '10px' }}>
              <Row justify="end">

                <Space>
                  <Title level={5}>Logo (200x80 px):</Title>

                  <ImgCrop
                    aspect={200 / 80}
                    modalTitle='Ajusta el tamaño del tu logo'
                    rotationSlider={false}
                  >
                    <Upload
                      name='logo'
                      listType="picture-card"
                      className='avatar-uploader'
                      showUploadList={false}
                      onClick={() => setImgType('logo')}

                      beforeUpload={uploadData}
                    >
                      {logoURL ?
                        <img src={logoURL} alt="Logo" style={{ width: '100%' }} />
                        :
                        <PlusOutlined />
                      }
                    </Upload>
                  </ImgCrop>

                </Space>

                <Space>
                  <Title level={5}>Logo BBB (222x82 px):</Title>

                  <ImgCrop
                    aspect={222 / 82}
                    modalTitle='Ajusta el tamaño del logo BBB'
                    rotationSlider={false}
                  >
                    <Upload
                      name='logoBBB'
                      listType="picture-card"
                      className='avatar-uploader'
                      showUploadList={false}
                      onClick={() => setImgType('logoBBB')}

                      beforeUpload={uploadData}
                    >
                      {logoBBBUrl ?
                        <img src={logoBBBUrl} alt="Logo" style={{ width: '100%' }} />
                        :
                        <PlusOutlined />
                      }
                    </Upload>
                  </ImgCrop>

                </Space>


              </Row>
            </Col>
          </Row>

          <Divider orientation='left'>Datos Generales</Divider>

          <Form onSubmit={handleSubmit} style={{ margin: '30px' }}>

            <Row gutter={[24, 16]}>
              <Col span={5}>
                <label>
                  Nombre:
                  <Input type="text" value={nombre} onChange={(event) => setNombre(event.target.value)} />
                </label>
              </Col>
              <Col span={5}>
                <label>
                  Email:
                  <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>
              </Col>

              <Col span={5}>

                <label>
                  Teléfono:
                  <Input type="tel" value={telefono} onChange={(event) => setTelefono(event.target.value)} />
                </label>
              </Col>
              <Col span={9}>

                <label>
                  Dirección de oficina:
                  <Input type="text" value={direccion} onChange={(event) => setDireccion(event.target.value)} />
                </label>
              </Col>

              <Col span={7}>
                <label>
                  Misión:
                  <Input.TextArea type="text" value={mision} onChange={(event) => setMision(event.target.value)} />
                </label>
              </Col>

              <Col span={7}>
                <label>
                  Visión:
                  <Input.TextArea type="text" value={vision} onChange={(event) => setVision(event.target.value)} />
                </label>
              </Col>

              <Col span={5}>
                <label>

                  Facebook:
                  <Input type="text" value={facebook} onChange={(event) => setFacebook(event.target.value)} />
                </label>
              </Col>

              <Col span={5}>

                <label>
                  Instagram:
                  <Input
                    type="text"
                    value={instagram}
                    onChange={(event) => setInstagram(event.target.value)}
                  />
                </label>
              </Col>

              <Divider orientation='left'>Imagenes y Videos</Divider>



              {/* ✅ START Uploading Logo Champ */}
              <Col span={6}>
                <Title level={5}>Logo Champs:(700x350 px):</Title>
                <Input
                  type='text'
                  placeholder='Titulo'
                  value={championData ? championData.desc : null}
                  onChange={(e) => setChampionData({ ...championData, desc: e.target.value })}
                />

                <Row style={{ marginTop: 10 }} >

                  <ImgCrop
                    aspect={700 / 350}
                    modalTitle='Ajusta el tamaño del logo Champion'
                    rotationSlider={false}
                  >
                    <Upload
                      name='champion'
                      listType="picture-card"
                      className='avatar-uploader'
                      showUploadList={false}
                      onClick={() => setImgType('champion')}

                      beforeUpload={uploadData}
                    >
                      {championData.championURL ?
                        <img src={championData.championURL} alt="Logo" style={{ width: '100%' }} />
                        :
                        <PlusOutlined />
                      }
                    </Upload>
                  </ImgCrop>
                </Row>


              </Col>
              {/* END Uploading Logo Champ */}







              {/* ✅ START UPLOAD video LG Pros */}
              <Col span={6}>
                <Title level={5}>Video LG Pro:(mp4 format):</Title>

                <Row style={{ marginBottom: 10 }} >
                  <Input
                    placeholder='Titulo'
                    type='text'
                    value={videoURL ? videoURL.title : null}
                    onChange={(e) => setVideoURL({ ...videoURL, title: e.target.value })}
                  />
                </Row>
                <Row style={{ marginBottom: 10 }}>
                  <Input.TextArea
                    placeholder='Descripción'
                    type='text'
                    value={videoURL ? videoURL.desc : null}
                    onChange={(e) => setVideoURL({ ...videoURL, desc: e.target.value })}
                  />
                </Row>
                <UploadVideo
                  videoURL={[]}
                  type={'video'}
                />

              </Col>
              {/* END UPLOAD video LG Pros */}






              {/* ✅ START UPLOAD image banner */}
              <Col span={6}>


                <Title level={5}>Banner images:(3x 1920x1080 px):</Title>

                <Row>


                  <Col span={6}>
                    <ImgCrop
                      aspect={1920 / 1080 }
                      modalTitle='Ajusta el tamaño de la imagen del banner'
                      rotationSlider={false}
                    >
                      <Upload
                        name='banner'
                        listType="picture-card"
                        className='avatar-uploader'
                        showUploadList={false}
                        onClick={() => setImgType('banner')}

                        beforeUpload={uploadData}
                      >
                        {bannerPhotos ?
                          <img src={bannerPhotos} alt="Logo" style={{ width: '100%' }} />
                          :
                          <PlusOutlined />
                        }
                      </Upload>
                    </ImgCrop>
                  </Col>

                  <Col span={6} style={{marginLeft:50}}>
                    <ImgCrop
                      aspect={1920 / 1080}
                      modalTitle='Ajusta el tamaño de la imagen del banner'
                      rotationSlider={false}
                    >
                      <Upload
                        name='banner'
                        listType="picture-card"
                        className='avatar-uploader'
                        showUploadList={false}
                        onClick={() => setImgType('banner')}

                        beforeUpload={uploadData}
                      >
                        {bannerPhotos ?
                          <img src={bannerPhotos} alt="Logo" style={{ width: '100%' }} />
                          :
                          <PlusOutlined />
                        }
                      </Upload>
                    </ImgCrop>
                  </Col>

                  <Col span={6} style={{marginLeft:50}}>
                    <ImgCrop
                      aspect={1920 / 1080}
                      modalTitle='Ajusta el tamaño de la imagen del banner'
                      rotationSlider={false}
                    >
                      <Upload
                        name='banner'
                        listType="picture-card"
                        className='avatar-uploader'
                        showUploadList={false}
                        onClick={() => setImgType('banner')}

                        beforeUpload={uploadData}
                      >
                        {bannerPhotos ?
                          <img src={bannerPhotos} alt="Logo" style={{ width: '100%' }} />
                          :
                          <PlusOutlined />
                        }
                      </Upload>
                    </ImgCrop>
                  </Col>

                </Row>


              </Col>
              {/* END UPLOAD image banner */}




              {/* 🟢 START Services form 🟢 */}
              <Divider orientation='left'>Servicios</Divider>

              <Col span={24}>
                <Row>

                  {/* 🔷 START Form add service 🔷 */}
                  <Col span={13} >
                    <Row >
                      <Space>
                        <ImgCrop
                          aspect={512 / 512}
                          modalTitle='Ajusta el tamaño de imagen de servicio'
                          rotationSlider={false}
                        >
                          <Upload
                            name='service'
                            listType="picture-card"
                            className='avatar-uploader'
                            showUploadList={false}
                            onClick={() => setImgType('service')}

                            beforeUpload={uploadData}
                          >
                            {servicio.imageURL ?
                              <img src={servicio.imageURL} alt="Service" style={{ width: '100%' }} />
                              :
                              <PlusOutlined />
                            }
                          </Upload>
                        </ImgCrop>
                        <Input
                          placeholder='Titulo'
                          type='text'
                          value={servicio.title}
                          onChange={(e) => setServicio({ ...servicio, title: e.target.value })}
                        />
                        <Input.TextArea
                          placeholder='Descripcion'
                          type="text"
                          value={servicio.desc}
                          onChange={(e) => setServicio({ ...servicio, desc: e.target.value })}
                        />
                        <Popconfirm
                          title=' Agregar servicio'
                          description='¿Estas seguro de agregar este servicio nuevo?'
                          onConfirm={handleAddService}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            type='primary'
                            style={{ backgroundColor: 'skyblue' }}
                          >
                            Add
                          </Button>
                        </Popconfirm>
                      </Space>
                    </Row>
                  </Col>

                  {/* 🔷 END Form add service 🔷 */}


                  {/* 🟧 START LIST of features 🟧 */}
                  <Col span={10} >
                    <Row style={{ alignSelf: "center" }}>
                      <Col span={24} >
                        <ListItems
                          type='services'
                          data={servicios}
                        // handleEdit={(item) => handleEditFeature(item)}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {/* 🟧 END LIST of features 🟧 */}

                </Row>
              </Col>
              {/* 🟢 END Services form 🟢 */}







              {/* 🟢 START Reviews form 🟢 */}
              <Divider orientation='left'>Reviews</Divider>

              <Col span={24}>
                <Row>

                  {/* 🔷 START Form add review 🔷 */}
                  <Col span={13} >
                    <Row >
                      <Space>
                        <ImgCrop
                          aspect={300 / 300}
                          modalTitle='Ajusta el tamaño de imagen del cliente'
                          rotationSlider={false}
                        >
                          <Upload
                            name='review'
                            listType="picture-card"
                            className='avatar-uploader'
                            showUploadList={false}
                            onClick={() => setImgType('review')}

                            beforeUpload={uploadData}
                          >
                            {review.imageURL ?
                              <img src={review.imageURL} alt="Review" style={{ width: '100%' }} />
                              :
                              <PlusOutlined />
                            }
                          </Upload>
                        </ImgCrop>
                        <Input
                          placeholder='Name'
                          type='text'
                          value={review.title}
                          onChange={(e) => setReview({ ...review, title: e.target.value })}
                        />
                        <Input.TextArea
                          placeholder='Review'
                          type="text"
                          value={review.desc}
                          onChange={(e) => setReview({ ...review, desc: e.target.value })}
                        />
                        <Popconfirm
                          title=' Agregar review'
                          description='¿Estas seguro de agregar este review nuevo?'
                          onConfirm={handleAddReview}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            type='primary'
                            style={{ backgroundColor: 'skyblue' }}
                          >
                            Add
                          </Button>
                        </Popconfirm>
                      </Space>
                    </Row>
                  </Col>

                  {/* 🔷 END Form add review 🔷 */}


                  {/* 🟧 START LIST of features 🟧 */}
                  <Col span={10} >
                    <Row style={{ alignSelf: "center" }}>
                      <Col span={24} >
                        <ListItems
                          type='reviews'
                          data={reviews}
                        // handleEdit={(item) => handleEditFeature(item)}
                        />
                      </Col>
                    </Row>
                  </Col>
                  {/* 🟧 END LIST of features 🟧 */}

                </Row>
              </Col>
              {/* 🟢 END Services form 🟢 */}




            </Row>

            <Row style={{ marginTop: '50px' }} justify="center">
              <Popconfirm
                title="Actualizar información"
                description="¿Estas seguro que quieres actualizar el website?"
                onConfirm={handleOnFinishForm}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="primary"
                  style={{ backgroundColor: 'greenyellow' }}
                  loading={loading.updateDataService}
                >
                  {loading.updateDataService ? 'Loading...' : 'Actualizar'}
                </Button>
              </Popconfirm>
            </Row>



          </Form >

        </Content>
        <Footer style={footerStyle}>Developed by: Gorilla-Labs</Footer>
      </Layout>

    </>
  )
}

export default Admin