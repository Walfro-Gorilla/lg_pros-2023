import React, { useContext, useEffect } from 'react'
// importamos los componentes necesarios de ANTD
import {
  Input, Popconfirm,
  message, Button, Form,
  Space, Typography, Select, Row, Col, List,
  Avatar
} from 'antd'

// importaMOs los iconos necesarios de antd desoigne
import { UserOutlined } from '@ant-design/icons';

// Desctructuramos los componetne necesarios para la typogrfia
const { Title } = Typography


// importamos las funciones de firebase
import { useFirestore } from '../hooks/useFirestore'
// Importamos el context del usuario
import { UserContext } from '../context/UserProvider'

// Importamos el NANOID
import { nanoid } from 'nanoid'

//importtamos los componentes necesarios para la pantalla
import Navbar3 from '../components/Navbar3'
import CameraApp from '../components/CameraApp'







const Home_3 = () => {



  // Function state colors
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

  //  Data de guardias
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
    },
    {
      value: 'david',
      label: 'David',
    },
    {
      value: 'Wal',
      label: 'Wal',
    },
    {
      value: 'Lucero',
      label: 'Lucero',
    },

  ]

  // Actualizamos el state al cambiar de empleado
  const handleOnchangeGuardia = (value) => {
    setNameGuardia(value)
  }


  // inicializamos las funciones CRUD desde useFirestore
  const {
    data, error, loading, getData, addData, deleteData, updateData
  } = useFirestore()


  // Inicializamos el contexto de usuario
  const {
    folioDoc, setFolioDoc,  
    nameGuardia, setNameGuardia,    
    urlPhoto, setUrlPhoto,
    incidentTitle, setIncidentTitle,
    incidentDesc, setIncidentDesc
  } = useContext(UserContext)


  // // Obtenemos los comp de message de antd
  const [messageApi, contextHolder] = message.useMessage()



  useEffect(() => {
    // obtenemos la data de la BD firebase
    getData()
    // seteamos el valor del primer folio con nanoid
    setFolioDoc(nanoid(9))
  }, [])

  // controlamos la visualizacion de crga de datos
  if (loading.getData) return <p>Loading getData...</p>
  if (error) return <p> {error} </p>



  //💡 FUNCTION to add a new incident
  const onFinishForm = async () => {


    // States evaluate, if empty show message
    if (nameGuardia === '') {
      messageApi.open({
        type: 'warning',
        content: 'Falta Guardia!'
      });
      return
    }
    else if (incidentTitle === '') {
      messageApi.open({
        type: 'warning',
        content: 'Falta Incidencia!'
      });
      return
    }
    else if (incidentDesc === '') {
      messageApi.open({
        type: 'warning',
        content: 'Falta Detalles de Incidencia!'
      });
      return
    }
    else if (urlPhoto === '') {
      messageApi.open({
        type: 'warning',
        content: 'Ingresa la imagen de evidencia'
      })
    } else {


      // If all states are fully, then add a Doc=incident on firebase
      await addData(
        folioDoc,
        nameGuardia,
        incidentTitle,
        incidentDesc,
        urlPhoto
      )
      // MENSAJE  de alerta correcto.
      messageApi.open({
        type: 'success',
        content: 'Creado con exito'
      });
      // Reset all states
      setFolioDoc(nanoid(9))
      setNameGuardia('')
      setIncidentTitle('')
      setIncidentDesc('')
      setUrlPhoto('')
    }
  }


  // 💡 FUNCTION to DELETE incident
  const handleClickDelete = async (nanoid) => {
    //console.log('DELETEEEE')
    await deleteData(nanoid)
    messageApi.open({
      type: 'success',
      content: 'Incidencia eliminada con éxito!'
    });
  }






  return (
    <>

      {contextHolder}
      <Typography>

        <Row style={{ marginTop: 25, marginLeft: 25 }}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Title level={2}>Registro Incidencia </Title>
            {/* START - Form to upload shipping data */}
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              style={{ maxWidth: 600 }}
              onFinish={onFinishForm}
            >

              {/* Input del FOLIO automatico generado por  */}
              <Form.Item
                label='Folio'
                name='folioNumbre'
              >
                <Space>
                  <Input value={folioDoc ? folioDoc : null} disabled />
                </Space>
              </Form.Item>


              {/* Select de los GUARDIAS registrados */}
              <Form.Item label="Guardia" >
                <Space>

                  <Select
                    style={{ width: 160 }}
                    options={guardiasData}
                    value={nameGuardia}
                    onChange={handleOnchangeGuardia}
                  />
                </Space>
              </Form.Item>

              {/* ID del usuario que crea el shipping */}
              <Form.Item label="Incidencia">
                <Space>
                  <Input
                    value={incidentTitle ? incidentTitle : null}
                    onChange={(e) => setIncidentTitle(e.target.value)}
                  />
                  {/* <Button type='primary'>
                Scan
              </Button> */}
                </Space>
              </Form.Item>

              {/* Input del numero de TRAILER a verificar */}
              <Form.Item label="Detalles:">
                <Space>
                  <Input.TextArea
                    value={incidentDesc ? incidentDesc : null}
                    onChange={(e) => setIncidentDesc(e.target.value)}
                  />
                </Space>
              </Form.Item>

              {/* Camer */}
              <Form.Item label="Camera">
                <Space>
                  <CameraApp />
                  <Avatar shape="square" size={64} icon={<UserOutlined />} src={urlPhoto} />
                </Space>
              </Form.Item>



              {/* BUtton para submit el form */}
              <Form.Item label=" " colon={false}>
                <Button type="primary" htmlType="submit">
                  Ok
                </Button>
              </Form.Item>

            </Form >
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <List
              header={<Title level={2}>Incidencias:</Title>}
            >
              <Row gutter={12}>

                {
                  data.map((item) => (

                    <>

                      <Col span={24}>
                        <List.Item


                          actions={[
                            <Popconfirm
                              title="Eliinar Picklist"
                              description={"Seguro que quieres eliminarlo?"}
                              onConfirm={() => handleClickDelete(item.nanoid)}
                            >
                              <Button
                                type='primary'
                                danger
                              >
                                x
                              </Button>
                            </Popconfirm>
                          ]}
                        >
                          <List.Item.Meta
                            key={item.nanoid}
                            avatar={
                              <div style={{ textAlign: 'center', backgroundColor: getColor(item.incidentStatus) }}>
                                {item.incidentStatus}
                              </div>
                            }
                            title={item.incidentTitle}
                            description={item.incidentDesc}
                          />

                        </List.Item>


                      </Col>

                    </>

                  ))
                }
              </Row>
            </List>
          </Col>
        </Row>

      </Typography>
    </>
  )
}

export default Home_3