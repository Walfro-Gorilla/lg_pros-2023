import React, { useContext, useEffect, useRef, useState } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import {
  Input, Card, Popconfirm,
  message, Button, Form,
  Space, Typography, Select,
  Row, Col, List, Modal, Divider, Rate, Switch
} from 'antd'


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

  const {
    data, error, loading, getData, addData, deleteData, updateData
  } = useFirestore()

  const [newOriginID, setNewOriginID] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAvaiblePicklist, setIsAvaiblePicklist] = useState(true)
  var newArray = ''



  // Inicializamos el contexto de usuario
  const {
    folioDoc, setFolioDoc,
    idUser, setIdUser,
    nameGuardia, setNameGuardia,
    numTrailer, setNumTrailer,
    statusPicklist, setStatusPicklist,
    createdDate, setCreateDate,
    fileList, setFileList,
    rateTrailer, setRateTrailer,
    urlsPicklist, setUrlsPicklist,

  } = useContext(UserContext)



  // // Obtenemos los comp de message de antd
  const [messageApi, contextHolder] = message.useMessage()



  useEffect(() => {
    getData()
  }, [])

  if (loading.getData) return <p>Loading getData...</p>
  if (error) return <p> {error} </p>




  // BUTTON procesar picklist
  const handleClickDo = async (nanoid, status, numTrailer, createdDate) => {
    // Realizamos la actualizacion del state
    await updateData(nanoid, 'OPEN')
    // Asignamos el valor del item de cada campo
    setStatusPicklist('OPEN')
    setNumTrailer(numTrailer)
    setCreateDate(createdDate)
    setFolioDoc(nanoid)
    // Abrimos el modal
    setIsModalOpen(true)
  }

  // Boton EDITAR
  const handleClickEdit = (item) => {
    setValue("url", item.origin)
    setNewOriginID(item.nanoid)
  }

  // Onchange del ID
  const handleOnchangeID = async (e) => {
    await setIdUser(e.target.value)
    // messageApi.info('Tu id es ', idUser)
  }

  // GENERAMOS el numero random para el folio
  // const uniqueId = nanoid()

  // 
  const guardiasData = [
    {
      value: 'jack',
      label: 'Jack',
    },
    {
      value: 'lucy',
      label: 'Lucy',
    },
    {
      value: 'tom',
      label: 'Tom',
    }
  ]


  // Actualizamos el state al cambiar de empleado
  const handleOnchangeGuardia = (value) => {
    setNameGuardia(value)
  }

  // Al hacer submit al FORM 
  const onFinishForm = async () => {

    if (idUser === '') {
      messageApi.open({
        type: 'warning',
        content: 'Falta ID Admin!'
      });
      return
    }
    else if (numTrailer === '') {
      messageApi.open({
        type: 'warning',
        content: 'Falta No. Trailer!'
      });
      return
    }
    else if (nameGuardia === '') {
      messageApi.open({
        type: 'warning',
        content: 'Falta Guardia!'
      });
      return
    } else {

      // Function to upload data
      await addData(
        folioDoc,
        numTrailer,
        idUser,
        nameGuardia
      )
      // MENSAJE  de alerta correcto.
      messageApi.open({
        type: 'success',
        content: 'Creado con exito'
      });
      // Reset all states
      setFolioDoc(nanoid(9))
      setIdUser('')
      setNumTrailer('')
      setNameGuardia('')
    }
  }


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


  // HANDLEOK para subir files al storage y almacenar la informacion en la BD
  const handleOk = async (folioDoc) => {

    // Validacion de datos del formulario
    if (idUser === '') {
      messageApi.open({
        type: 'warning',
        content: 'Falta ID Admin!'
      });
      return
    }
    else if (rateTrailer === '') {
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
    setUrlsPicklist(newArray)

    // Realizamos la actualizacion del state segun los props
    await updateData(folioDoc, 'CLOSE', idUser, rateTrailer, urlsPicklist)
    // Asignamos el valor del item de cada campo
    setStatusPicklist('CLOSE')
    setIdUser('')
    setRateTrailer('')
    setFileList([])
    // Cerramos el modal
    setIsModalOpen(false);

    // console.log("URLs list: ", urlsPicklist)
  };


  // HNADLE para cancelar el picklist
  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
            <Button onClick={() => console.log("FOTOSL: ", urlsPicklist)}>Fotos</Button>
            <List
              header={<Title level={2}>Picklist:</Title>}
            >
              <Row gutter={12}>

                {
                  data.map((item) => (
                    <>

                      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
                        <List.Item>

                          <Card
                            title={item.numTrailer}
                            bordered={false}
                            extra={
                              <>
                                <Popconfirm
                                  title="Abrir Picklist"
                                  description={"Seguro que quieres abrir este picklist?"}
                                  onConfirm={() =>
                                    handleClickDo(
                                      item.nanoid,
                                      item.status,
                                      item.numTrailer,
                                      item.createdDate
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
                            <Card.Grid style={{ width: '50%', textAlign: 'center', backgroundColor: getColor(item.status) }}>
                              {item.status}
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
          onOk={() => handleOk(folioDoc)}
          onCancel={handleCancel}
        >
          <>
            <Divider dashed />

            <Row justify='start'>
              <Col span={9}>
                <Row  >
                  <Col span={12}>
                    <Text strong># trailer:</Text>
                  </Col>
                  <Col span={12} >
                    <Input size='small' value={numTrailer} disabled />
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
                    <Input style={{ backgroundColor: getColor(statusPicklist) }} size='small' value={statusPicklist} disabled />
                  </Col>
                </Row>
              </Col>

            </Row>

            <Divider dashed />

            {/*  SWITCH para iniciar el chequeo de trailer */}
            <Row>
              <Col span={24}>
                <Text strong >Iniciar: </Text>
                <Switch onChange={onChangeSwitch} defaultChecked={false} />
              </Col>
            </Row>

            <Divider orientation='left'>Proceso</Divider>
            <Row>
              <Col span={12}>
                <Title level={5}>ID: {idUser}</Title>
              </Col>
              <Col span={12}>
                <Title level={5}>Rate del trailer: {rateTrailer}</Title>
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
                  onChange={(value) => setRateTrailer(value)}
                  disabled={isAvaiblePicklist}
                />
              </Col>
            </Row>
            <Divider>Fotos del Trailer</Divider>
            <Row>
              <Col span={24}>
                <Pictures nanoid={nanoid} isAvaiblePicklist={isAvaiblePicklist} />
              </Col>
            </Row>

          </>
        </Modal>

      </Typography>

    </>
  )
}

export default Dashboard