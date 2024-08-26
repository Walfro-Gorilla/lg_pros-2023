import React, { useContext, useEffect, useRef, useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import {
  Input, Card, Popconfirm,
  message, Button, Form,
  Space, Typography, Select,
  Row, Col, List, Modal, Divider, Rate, Switch,
  Avatar
} from 'antd'

// importaMOs los iconos necesarios
import { UserOutlined } from '@ant-design/icons';

// Desctructuramos los componetne necesarios para la typogrfia
const { Title, Text } = Typography

// Importamos los componentes necesarios

// Importamos el context del usuario
import { UserContext } from '../context/UserProvider'

// Importamos el NANOID
import { nanoid } from 'nanoid'
import Pictures from '../components/Pictures'


import { ScanOutlined } from '@ant-design/icons'
import QuaggaScan from '../components/scanner/QuaggaScan'
import { uploadFile } from '../firebase'


const Dashboard = () => {

  // inicializamos los states
  const [newOriginID, setNewOriginID] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAvaibleSwitch, setIsAvaaibleSwitch] = useState(true)
  const [isAvaiblePicklist, setIsAvaiblePicklist] = useState(true)
  // creamos la variable necesaria
  var newArray = ''



  // importamos las funciones de useFirestore
  const {
    data,
    error,
    loading,
    getData,
    addData,
    deleteData,
    updateData,
    updateStatus
  } = useFirestore()



  // Inicializamos el contexto de usuario
  const {
    folioDoc, setFolioDoc,
    nameGuardia, setNameGuardia,
    urlPhoto, setUrlPhoto,
    incidentTitle, setIncidentTitle,
    incidentDesc, setIncidentDesc,
    incidentRate, setIncidentRate,
    statusIncident, setStatusIncident,
    createdDate, setCreateDate,
    idUser, setIdUser,
    urlsCorrective, setUrlsCorrective,
    fileList, setFileList,
    uid, setUid,
  } = useContext(UserContext)



  // // Obtenemos los comp de message de antd
  const [messageApi, contextHolder] = message.useMessage()



  useEffect(() => {
    getData()
  }, [])

  if (loading.getData) return <p>Loading getData...</p>
  if (error) return <p> {error} </p>


  // Function colors
  const getColor = (item) => {
    if (item === 'NEW') {
      return 'green';
    }
    else if (item === 'OPEN') {
      return 'yellow';
    }
    else if (item === 'CLOSE') {
      return 'red';
    }
    else {
      return 'black';
    }
  }


  // FUNCTION  View/Do incident
  const handleClickDo =
    async (
      nanoid,
      folioDoc,
      incidentTitle,
      incidentDesc,
      incidentStatus,
      createdDate,
      urlPhoto,
      idUser,
      incidentRate,
      urlsCorrective
    ) => {


      if (incidentStatus != 'CLOSE') {
        // Evaluamos el state, si esta en CANCEL
        await updateStatus(nanoid, 'OPEN')
        setIsAvaaibleSwitch(false)
      }


      // Asignamos el valor del item de cada campo  
      setFolioDoc(folioDoc)
      setStatusIncident(incidentStatus)
      setIncidentRate(incidentRate)
      setIncidentTitle(incidentTitle)
      setIncidentDesc(incidentDesc)
      setCreateDate(createdDate)
      setUrlPhoto(urlPhoto)
      setIdUser(idUser)
      setIncidentRate(incidentRate)
      setUrlsCorrective(urlsCorrective)
      setUid(nanoid)
      // Abrimos el modal
      setIsModalOpen(true)

      console.log("nanoid: ", nanoid)
      console.log("folioDoc:", folioDoc)
      console.log("uid: ", uid)
    }




  // Actualizamos el state al cambiar de empleado
  const handleOnchangeGuardia = (value) => {
    setNameGuardia(value)
  }

  // Al hacer submit al FORM 
  // const onFinishForm = async () => {

  //   if (idUser === '') {
  //     messageApi.open({
  //       type: 'warning',
  //       content: 'Falta ID Admin!'
  //     });
  //     return
  //   }
  //   else if (numTrailer === '') {
  //     messageApi.open({
  //       type: 'warning',
  //       content: 'Falta No. Trailer!'
  //     });
  //     return
  //   }
  //   else if (nameGuardia === '') {
  //     messageApi.open({
  //       type: 'warning',
  //       content: 'Falta Guardia!'
  //     });
  //     return
  //   } else {

  //     // Function to upload data
  //     await addData(
  //       folioDoc,
  //       numTrailer,
  //       idUser,
  //       nameGuardia
  //     )
  //     // MENSAJE  de alerta correcto.
  //     messageApi.open({
  //       type: 'success',
  //       content: 'Creado con exito'
  //     });
  //     // Reset all states
  //     setFolioDoc(nanoid(9))
  //     setIdUser('')
  //     setNumTrailer('')
  //     setNameGuardia('')
  //     setUrlPhoto('')
  //   }
  // }










  // HANDLEOK para subir files al storage y almacenar la informacion en la BD
  const handleOk = async (folioDoc) => {

    // Validacion de datos del formulario
    if (idUser === '') {
      messageApi.open({
        type: 'warning',
        content: 'Falta ID User!'
      });
      return
    }
    else if (incidentRate === '') {
      messageApi.open({
        type: 'warning',
        content: 'Falta calificar!'
      });
      console.log("fileList: ", fileList)
      return
    }
    else if (fileList.length < 1) {
      messageApi.open({
        type: 'warning',
        content: `Faltan ${4 - fileList.length} fotos!`
      });
      return
    }


    try {
      // MAP  del arreglo de fotos seleccionadas
      newArray = await Promise.all(
        fileList.map(async (file) => {

          const url = await uploadFile(file.originFileObj, nanoid(21))
          return url



          // console.log('result url: ', url)
          // console.log('urlsPicklist: ', urlsPicklist)
        }))
    } catch (error) {

      console.log("ERROR al registrar data: ", error)

    }

    console.log("URLs saved: ", newArray)
    setUrlsCorrective(newArray)

    // Realizamos la actualizacion del state segun los props
    await updateData(folioDoc, 'CLOSE', idUser, incidentRate, newArray)
    // Asignamos el valor del item de cada campo
    setStatusIncident('CLOSE')
    setIdUser('')
    setIncidentRate('')
    setFileList([])
    // Cerramos el modal
    setIsModalOpen(false);

    // console.log("URLs list: ", urlsPicklist)
  };

  // HANDLE CLOSE MODAL
  const handleModalClose = () => {

    setFolioDoc('')
    setStatusIncident('')
    setIncidentRate('')
    setIncidentTitle('')
    setIncidentDesc('')
    setCreateDate('')
    setUrlPhoto('')
    setIdUser('')
    setIncidentRate('')
    setUrlsCorrective('')
    setUid('')

    setIsAvaaibleSwitch(true)

    setIsModalOpen(false);
    console.log('again its woooooorkiing agaaain!!! ma bro')
  }










  // ONCHANGE switch OPEN picklist
  const onChangeSwitch = (checked) => {
    console.log(`switch to ${checked}`);
    setIsAvaiblePicklist(!checked)
    console.log("Avaible: ", isAvaiblePicklist)


  };




  return (
    <>
      {contextHolder}

      <Typography>

        <Row>

          <Col span={24}>
            {/* <Button onClick={() => console.log("FOTOSL: ", urlsPicklist)}>Fotos</Button> */}
            <List
              header={<Title level={2}>Incidentes:</Title>}
            >
              <Row gutter={12}>

                {
                  data.map((item, id) => (
                    <>

                      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <List.Item >

                          <Card
                            id={id}
                            title={item.incidentTitle}
                            bordered={false}
                            extra={
                              <>
                                <Popconfirm
                                  title="Abrir Incidencia"
                                  description={"Seguro que quieres abrir esta Incidencia?"}
                                  onConfirm={() =>
                                    handleClickDo(
                                      item.nanoid,
                                      item.folioDoc,
                                      item.incidentTitle,
                                      item.incidentDesc,
                                      item.incidentStatus,
                                      item.createdDate,
                                      item.urlPhoto,
                                      item.idUser,
                                      item.incidentRate,
                                      item.urlsCorrective,
                                    )}
                                >
                                  <Button
                                    type='primary'

                                  >
                                    do
                                  </Button>
                                </Popconfirm>
                              </>
                            }
                          >
                            <Card.Grid style={{ width: '50%', textAlign: 'center' }}>
                              Owner: {item.nameGuardia}
                            </Card.Grid>
                            <Card.Grid style={{ width: '50%', textAlign: 'center', backgroundColor: getColor(item.incidentStatus) }}>
                              {item.incidentStatus}
                            </Card.Grid>

                          </Card>
                        </List.Item>
                      </Col>

                    </>

                  ))
                }
              </Row>
            </List>
          </Col>

        </Row>



        {/* MODAL para procesar el picklist */}
        <Modal
          title={`Folio: ${folioDoc ? folioDoc : null}`}
          open={isModalOpen}
          // onOk={() => handleOk(folioDoc)}
          // onCancel={handleCancel}
          onCancel={handleModalClose}
          footer={[
            // Utilizamos una expresión condicional para renderizar el botón OK solo si la variable showOkButton es true
            <Button hidden={isAvaibleSwitch} key="ok" onClick={() => handleOk(folioDoc)}>OK</Button>,
            <Button key="cancel" onClick={handleModalClose}>Cancelar</Button>
          ]}
        >
          <>
            <Divider dashed />

            <Row justify='start'>

              <Col span={9}>
                <Row  >
                  <Col span={12}>
                    <Text strong>Incidencia:</Text>
                  </Col>
                  <Col span={12} >
                    <Input size='small' value={incidentTitle} disabled />
                  </Col>
                </Row>
              </Col>

              <Col span={9}>
                <Row>
                  <Col span={12}>
                    <Text strong>Fecha:</Text>
                  </Col>
                  <Col span={12}>
                    <Input size='small' value={createdDate} disabled />
                  </Col>
                </Row>
              </Col>

              <Col span={6}>
                <Row>
                  <Col span={12}>
                    <Text strong>Status:</Text>
                  </Col>
                  <Col span={12}>
                    <Input style={{ backgroundColor: getColor(statusIncident) }} size='small' value={statusIncident} disabled />
                  </Col>
                </Row>
              </Col>

            </Row>

            <Row style={{ marginTop: 25 }}>
              <Col span={24}>
                <Row>
                  <Col span={8}>
                    <Text strong>Descripción:</Text>
                  </Col>
                  <Col span={16}>
                    <Input.TextArea value={incidentDesc} disabled />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row style={{ marginTop: 25 }}>
              <Col span={24}>
                <Row>
                  <Col span={8}>
                    <Text>Evidencia:</Text>
                  </Col>

                  <Col span={16}>
                    <Avatar shape="square" size={128} icon={<UserOutlined />} src={urlPhoto} />
                  </Col>

                </Row>
              </Col>
            </Row>




            <Divider dashed />



            {/*  SWITCH para iniciar el chequeo de trailer */}
            <Row>
              <Col span={10}>
                <Text strong >Iniciar: </Text>
                <Switch disabled={isAvaibleSwitch} onChange={onChangeSwitch} defaultChecked={false} />
              </Col>
              <Col span={14}>
                {
                  isAvaibleSwitch ? <Text style={{ color: 'white', backgroundColor: 'yellowgreen', padding: '5px' }} strong>INCIDENCIA revisada ✅</Text> : ''

                }
              </Col>
            </Row>

            <Divider orientation='left'>Proceso</Divider>
            <Row>
              <Col span={12}>
                <Title level={5}>ID: {idUser}</Title>
              </Col>
              <Col span={12}>
                <Title level={5}>Rate: {incidentRate}</Title>
              </Col>
            </Row>

            <Row>
              <Col span={12} >
                <Row>
                  <Col span={12}>
                    <Input
                      disabled={isAvaiblePicklist}
                      onChange={(e) => setIdUser(e.target.value)}
                      value={idUser}
                      placeholder='ID user'
                    />
                  </Col>
                  <Col span={12}>
                    <QuaggaScan isAvaiblePicklist={isAvaiblePicklist} />
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Rate
                  value={incidentRate}
                  onChange={(value) => setIncidentRate(value)}
                  disabled={isAvaiblePicklist}
                />
              </Col>
            </Row>
            <Divider>Fotos de Correctivo</Divider>
            <Row>
              <Col span={24}>


                {
                  isAvaibleSwitch ?
                    <Avatar shape="square" size={128} icon={<UserOutlined />} src={urlsCorrective[0]} />
                    :
                    <Pictures nanoid={nanoid} isAvaiblePicklist={isAvaiblePicklist} />
                }

              </Col>
            </Row>

          </>
        </Modal>

      </Typography >

    </>
  )
}

export default Dashboard