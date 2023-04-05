import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"

const Login = () => {

  const [email, setEmail] = useState('wal@gmail.com')
  const [pass, setPass] = useState('123456')

  const { loginUser } = useContext(UserContext)
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('procesando form: ', email, pass)
    try {
      await loginUser(email, pass)
      console.log("Usuario logeado")
      navigate('/')
    } catch (error) {
      console.log(error.code)
    }
  }


  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder='Ingrese email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='Ingrese pass'
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type='submit'>Login</button>
      </form>
    </>
  )
}

export default Login