export const formValidate = () => {
    return {
        required: "Campo obligatorio",
        minLength: 6,
        validateTrim: {
            trim: (v) => {
                if (!v.trim()) {
                    return "No seas 🤡, escribe algo"
                }
                return true
            }
        },
        validateEquals(getValues) {
            return {
                equals: v =>
                    v === getValues("password") ||
                    "No Coinciden las contraseñas"
            }
        }
    }
}