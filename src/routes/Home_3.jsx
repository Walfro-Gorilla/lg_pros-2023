import React, { useContext, useEffect } from 'react'
import { useFirestore } from '../hooks/useFirestore'
import {
  Input,  Popconfirm,
  message, Button, Form,
  Space, Typography, Select, Row, Col, List,
} from 'antd'


// Desctructuramos los componetne necesarios para la typogrfia
const { Title } = Typography

// Importamos los componentes necesarios

// Importamos el context del usuario
import { UserContext } from '../context/UserProvider'

// Importamos el NANOID
import { nanoid } from 'nanoid'



const Home_3 = () => {

  const {
    data, error, loading, getData, addData, deleteData, updateData
  } = useFirestore()


  // Inicializamos el contexto de usuario
  const {
    folioDoc, setFolioDoc,
    idUser, setIdUser,
    nameGuardia, setNameGuardia,
    numTrailer, setNumTrailer
  } = useContext(UserContext)



  // // Obtenemos los comp de message de antd
  const [messageApi, contextHolder] = message.useMessage()



  useEffect(() => {
    getData()
    setFolioDoc(nanoid(9))
  }, [])

  if (loading.getData) return <p>Loading getData...</p>
  if (error) return <p> {error} </p>







  // Boton DELETE
  const handleClickDelete = async (nanoid) => {
    console.log('DELETEEEE')
    await deleteData(nanoid)
    messageApi.open({
      type: 'success',
      content: 'Eliminado con exito!'
    });
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



  return (
    <>
      {contextHolder}
      <Typography>

        <Row>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Title level={2}>Creacion de picklist</Title>
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

              {/* ID del usuario que crea el shipping */}
              <Form.Item label="ID admin">
                <Space>
                  <Input
                    value={idUser ? idUser : null}
                    onChange={(e) => setIdUser(e.target.value)}
                  />
                  {/* <Button type='primary'>
                Scan
              </Button> */}
                </Space>
              </Form.Item>

              {/* Input del numero de TRAILER a verificar */}
              <Form.Item label="# de trailer">
                <Space>
                  <Input
                    value={numTrailer ? numTrailer : null}
                    onChange={(e) => setNumTrailer(e.target.value)}
                  />
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
              header={<Title level={2}>Picklist:</Title>}
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
                            avatar={
                              <div style={{  textAlign: 'center', backgroundColor: getColor(item.status) }}>
                                {item.status}
                              </div>
                            }
                            title={item.numTrailer}
                            description={item.nameGuardia}
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