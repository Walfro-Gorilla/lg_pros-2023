import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'

import { useForm } from 'react-hook-form'

const Register = () => {

    const navigate = useNavigate()
    const { registerUser } = useContext(UserContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm()

    const onSubmit = async ({ email, password }) => {
        console.log(email, password)
        try {
            await registerUser(email, password)
            console.log("USuario Creado")
            navigate('/')
        } catch (error) {
            console.log(error.code)
            switch (error.code) {
                case "auth/email-already-in-use":
                    // console.log('Usuario ya existe')
                    setError("email", {
                        message: "Usuario ya existe"
                    })
                    break;
                case "auth/invalid-email":
                    setError("email", {
                        message: "Formato de email no valido",
                    })
                    break;
                default:
                    console.log("Ocurrio un error inesperado")
            }
        }
    }




    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    placeholder='Ingrese email'
                    {...register("email", {
                        required: "Email obligatorio"
                    })}
                />
                {errors.email && <span>{errors.email.message}</span>}
                <input
                    type="password"
                    placeholder='Ingrese pass'
                    {...register("password", {
                        required: "Pass min 6 characters",
                        minLength: -6
                    })}
                />
                {errors.password && <span>{errors.password.message}</span>}
                <input
                    type="password"
                    placeholder='Vuelve a ingresa el pass'
                    {...register("repassword", {
                        validate: {
                            equals: v => v === getValues("password") || "No Coinciden las contraseñas"
                        }
                    })}
                />
                {
                    errors.repassword && <p> {errors.repassword.message} </p>
                }
                <button type='submit'>Registrar</button>
            </form>
        </>
    )
}

export default Register