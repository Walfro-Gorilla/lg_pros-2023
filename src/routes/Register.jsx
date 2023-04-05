import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

const Register = () => {

    const [email, setEmail] = useState('wal@gmail.com')
    const [pass, setPass] = useState('123456')

    const { registerUser } = useContext(UserContext)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('procesando form: ', email, pass)
        try {
            await registerUser(email, pass)
            console.log("USuario Creado")
            navigate('/')
        } catch (error) {
            console.log(error.code)
        }
    }

    return (
        <>
            <h1>Register</h1>
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
                <button type='submit'>Registrar</button>
            </form>
        </>
    )
}

export default Register