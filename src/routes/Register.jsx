import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserProvider'
import { useForm } from 'react-hook-form'

import { erroresFirebase } from '../utils/erroresFirebase'
import { formValidate } from '../utils/formValidate'

import FormError from '../components/FormError'
import FormInput from '../components/FormInput'

const Register = () => {

    const navigate = useNavigate()
    const { registerUser } = useContext(UserContext)

    const { required, minLength, validateTrim, validateEquals } = formValidate()



    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        setError,
    } = useForm()

    const onSubmit = async ({ email, password }) => {
        try {
            await registerUser(email, password)
            navigate('/')
        } catch (error) {
            setError("email", {
                message: erroresFirebase(error.code)
            })
        }
    }

    return (
        <>
            <h1>Register</h1>
            <FormError error={errors.email} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    placeholder='Ingrese email'
                    {...register("email", {
                        required
                    })}
                ></FormInput>

                <FormInput
                    type="password"
                    placeholder='Ingrese pass'
                    {...register("password", {
                        required: "Pass min 6 characters",
                        minLength,
                        validate: validateTrim,
                    })}
                ></FormInput>
                <FormError error={errors.password} />

                <FormInput
                    type="password"
                    placeholder='Vuelve a ingresa el pass'
                    {...register("repassword", {
                        validate: validateEquals(getValues)
                    })}
                ></FormInput>
                <FormError error={errors.repassword} />

                <button type='submit'>Registrar</button>
            </form>
        </>
    )
}

export default Register