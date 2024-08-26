import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"

import { formValidate } from "../utils/formValidate"
import { erroresFirebase } from "../utils/erroresFirebase"

import FormError from "../components/FormError"
import FormInput from "../components/FormInput"
import { Button, Form, Input, Space, Typography, message } from "antd";

const { Title, Text } = Typography;



const Login = () => {

  const { loginUser } = useContext(UserContext)
  const navigate = useNavigate()
  const { required, minLength, validateTrim } = formValidate()

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  // importamos los meotdos de mssage
  const [messageApi, contextHolder] = message.useMessage()


  // importamos el context de UserContext
  const { modalLoginOpen, setModalLoginOpen } = useContext(UserContext)



  const handleSubmit = async (email, pass) => {
    if (email === '' || pass === '') {
      messageApi.open({
        type: 'warning',
        content: 'Rellena todos los campos',
      });
      console.log("Rellena todos los campos")
      return
    }
    try {
      console.log("LOGIN")
      await loginUser(email, pass)
      messageApi.open({
        type: 'success',
        content: 'Login correcto. Bienvenid@.',
      });
      // navigate('/')
      setEmail('')
      setPass('')
      setModalLoginOpen(false)
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        messageApi.open({
          type: 'error',
          content: 'Credenciales incorrectas.',
        });
      }
      console.log(error.code)
      setError("email", {
        message: erroresFirebase(error.code)
      })
    }
  }





  return (
    <>
      {contextHolder}
      <Title level={2}>Ingresa tu cuenta:</Title>
      <Form onSubmit={() => handleSubmit(email, pass)}>
        <Space>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Ingresa tu email"
          />
          <Input
            onChange={(e) => setPass(e.target.value)}
            value={pass}
            type="password"
            placeholder="Ingresa tu pass"
          />
          <Button
            style={{ backgroundColor: 'blueviolet', fontStyle: "italic", color: 'white' }}
            onClick={() => handleSubmit(email, pass)}
            type="submit"
          >
            <Text >Login</Text>
          </Button>


        </Space>
      </Form>
    </>
  )
}

export default Login