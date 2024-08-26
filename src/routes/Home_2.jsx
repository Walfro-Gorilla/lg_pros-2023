import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useFirestore } from '../hooks/useFirestore'
import { formValidate } from '../utils/formValidate'
import { Col, Input, Row, message, Button } from 'antd'

// Importamos el context del usuario
import { UserContext } from '../context/UserProvider'

import FormError from '../components/FormError'
import FormInput from '../components/FormInput'
import QuaggaScan from '../components/scanner/QuaggaScan'
import QuaggaScan2 from '../components/scanner/QuaggaScan2'
import Scanner from '../components/scanner/Scanner'

const Home_2 = () => {

  const { data, error, loading, getData, addData, deleteData, updateData } = useFirestore()

  const [newOriginID, setNewOriginID] = useState()
  const [results, setResults] = useState([]);

  // Inicializamos el contexto de usuario
  const { idUser, setIdUser } = useContext(UserContext)
  // Obtenemos los comp de message de antd
  const [messageApi, contextHolder] = message.useMessage()

  const scannerRef = useRef(null);



  const { required } = formValidate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
  } = useForm();


  useEffect(() => {
    getData()
  }, [])

  if (loading.getData) return <p>Loading getData...</p>
  if (error) return <p> {error} </p>




  // START Function al aceptar el form //
  const onSubmit = async ({ url, trailer }) => {

    // Si existe MODO edicion, realiza esta funcion
    if (newOriginID) {
      await updateData(newOriginID, url)
      setNewOriginID('')
    } else {
      // ADD data si no se encuentra en modo edicion 
      console.log("URL: ", url)
      await addData(url, trailer)
    }
    resetField('url')
    resetField('trailer')
  }
  // END Function al aceptar el form //






  // Boton DELETE
  const handleClickDelete = async (nanoid) => {
    console.log('DELETEEEE')
    await deleteData(nanoid)
  }

  // Boton EDITAR
  const handleClickEdit = (item) => {
    setValue("url", item.origin)
    setNewOriginID(item.nanoid)
  }

  // Onchange del ID
  const handleOnchangeID = async(e) => {
    await setIdUser(e.target.value)
    // messageApi.info('Tu id es ', idUser)
  }

  return (
    <>
      {contextHolder}
      <h1>Home_2</h1>
    <h3>{idUser}</h3>

      <form onSubmit={handleSubmit(onSubmit)} >
        {/* <QuaggaScan2 /> */}

        <Row>
          <Col span={16}>
            <Input
              placeholder='Escanea tu gafete'
              value={idUser}
              onChange={handleOnchangeID}
            />

            <FormInput
              type="text"
              placeholder='Ingrese URL'
              {...register("url", {
                required,
              })}
            />
          </Col>
          <Col span={8}>
            <QuaggaScan />
          </Col>
        </Row>


        <Row>
          <Col span={24}>
            <Scanner
              scannerRef={scannerRef}
              onDetected={(result) => setResults([...results, result])}
            />
          </Col>
        </Row>


        <FormError error={errors.url} />

        <FormInput
          type="text"
          placeholder='# Trailer'
          {...register("trailer", {
            required,
          })}
        ></FormInput>
        <FormError error={errors.trailer} />

        {
          newOriginID ? (
            <button style={{ backgroundColor: "blue" }} type='submit'>edit</button>
          ) : (
            <button style={{ backgroundColor: "green" }} type='submit'>add</button>

          )
        }

      </form>

      {
        data.map((item) => (
          <div key={item.nanoid}>
            <p>{item.nanoid} </p>
            <p> {item.origin} </p>
            <p> {item.uid} </p>
            <button
              style={{ backgroundColor: 'red' }}
              onClick={() => handleClickDelete(item.nanoid)}
            >
              delete
            </button>
            <button
              style={{ backgroundColor: 'orange' }}
              onClick={() => handleClickEdit(item)}
            >
              edit
            </button>
          </div>

        ))}
    </>
  )
}

export default Home_2