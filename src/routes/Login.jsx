import { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { erroresFirebase } from "../utils/erroresFirebase"
import FormError from "../components/FormError"
import FormInput from "../components/FormInput"
import { formValidate } from "../utils/formValidate"



const Login = () => {
  
  const { loginUser } = useContext(UserContext)
  const navigate = useNavigate()
  const { required, minLength, validateTrim } = formValidate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    
    setError,
  } = useForm()

  const onSubmit = async ({ email, password }) => {
    try {
      await loginUser(email, password)
      navigate('/')
    } catch (error) {
      console.log(error.code)
      setError("email", {
        message: erroresFirebase(error.code)
      })
    }
  }





  return (
    <>
      <h1>Login</h1>
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

        <button type='submit'>Login</button>
      </form>
    </>
  )
}

export default Login