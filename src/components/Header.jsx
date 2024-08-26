import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

import '../css/style.css'
import '../css/bootstrap.min.css'

const Header = () => {
    // Consumimos el contexto de UserProvider
    const { user, signOutUser } = useContext(UserContext)

    const handleClickLogout = async () => {
        try {
            await signOutUser()
        } catch (error) {
            console.log(error.code)
        }
    }

    return (

        <div>

            {/* <!-- Top header start --> */}
            <header className="top-header bg-active" id="top-header-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-8 col-sm-7">
                            <div className="list-inline">
                                <a href="tel:1-915-474-1087"><i className="fa fa-phone"></i>Need Support? 1-915-474-1087</a>
                                <a href="tel:info@LGProshvac.com"><i className="fa fa-envelope"></i>info@LGProshvac.com</a>


                            </div>

                        </div>

                        <div className="col-lg-6 col-md-4 col-sm-5">
                            <div className="list-inline">

                                <a href="#">Hablamos ESPAÑOL</a>

                            </div>

                        </div>

                    </div>
                </div>
            </header>
            {/* <!-- Top header end --> */}
           

        </div>
    )
}

export default Header