import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

const LayoutRequireAuth = () => {

    const { user } = useContext(UserContext)

    if (!user) {
        return <Navigate to="/" />
    }

    return (
        <div >
            <Outlet />
        </div>
    )
}

export default LayoutRequireAuth