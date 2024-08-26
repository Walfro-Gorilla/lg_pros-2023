import { useContext, useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"




//  <!-- External CSS libraries -->
import '../css/bootstrap.min.css'
import '../css/animate.min.css'
import '../css/bootstrap-submenu.css'

import '../css/bootstrap-select.min.css'
import '../css/magnific-popup.css'
import '../assets/fonts/font-awesome/css/font-awesome.min.css'
import '../assets/fonts/flaticon/font/flaticon.css'
import '../assets/fonts/linearicons/style.css'
import '../css/jquery.mCustomScrollbar.css'
import '../css/dropzone.css'
import '../css/slick.css'
import '../css/lightbox.min.css'
import '../css/jnoty.css'

// <!-- Custom stylesheet -->
import '../css/sidebar.css'
import '../css/style.css'
import '../css/skins/default.css'

// <!-- Favicon icon -->
// <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon'

// <!-- Google fonts -->
// <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,600,700%7CUbuntu:300,400,700" rel="stylesheet'
// <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800,900&display=swap"
//     rel="stylesheet'

// <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
import '../css/ie10-viewport-bug-workaround.css'
import { Button, Modal, Row, Typography, Popconfirm } from "antd"
import Login from "../routes/Login"


const { Text, Title } = Typography;





const Navbar = (props) => {

    // states e lainfo de la pagina
    const [logoURL,setLogoURL] = useState('')

    // Consumimos el contexto de UserProvider
    const {
        user, signOutUser, modalLoginOpen, setModalLoginOpen
    } = useContext(UserContext)

    // importamos el useNAvigate
    const navigate = useNavigate()

    useEffect(() => {
        if(props.data && props.data.length > 0) {
            setLogoURL(props.data[0].logoURL)
        }
    }, [props.data])





    // HANDLE para cerrar sesion
    const handleClickLogout = async () => {

        try {
            await signOutUser()
        } catch (error) {
            console.log(error.code)
        }
    }

    return (
        <div>
            <Modal
                open={modalLoginOpen}
                onCancel={() => setModalLoginOpen(false)}
                footer={null}
                title="LOGIN"
            >
                <Login />
                <br />
                <Text code>**Solo personal autorizado de LG Pros puede acceder.</Text>
            </Modal>
            {/* <!-- Main header start --> */}
            <header className="main-header sticky-header sh-2 sh-3">
                <div className="container">
                    <div className="row">
                        <nav className="navbar navbar-expand-lg navbar-light ">
                            <a className="navbar-brand company-logo" onClick={() => navigate('/')} >
                                <img src={logoURL} alt="logo" />
                            </a>
                            <button className="navbar-toggler" type="button" id="drawer">
                                <span className="fa fa-bars"></span>
                            </button>
                            <div className="navbar-collapse collapse w-100" id="navbar">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className="nav-link dropdown-toggle" to="/" >Home</NavLink>
                                    </li>

                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" to="/services" >Services</NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink className="nav-link dropdown-toggle" to="/aboutus" >About Us</NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink className="nav-link dropdown-toggle" to="/contactus" >Contact</NavLink>
                                    </li>
                                    {user ? (
                                        <>

                                            <li className="nav-item">
                                                <NavLink className="nav-link dropdown-toggle" to="/admin" >Admin</NavLink>
                                            </li>

                                            <li className="nav-item ml-auto" >
                                                <Popconfirm
                                                    title="Logout"
                                                    description="Are you sure to Logout?"
                                                    onConfirm={handleClickLogout}
                                                    // onCancel={cancel}
                                                    okText="Yes"
                                                    cancelText="No"
                                                >
                                                    <Button
                                                        type="primary"
                                                        style={{ backgroundColor: 'tomato', marginTop: '40%' }}
                                                    // onClick={}
                                                    >
                                                        <Text style={{ color: '#fff' }}>
                                                            Logout
                                                        </Text>

                                                    </Button>
                                                </Popconfirm>
                                            </li>


                                        </>
                                    ) : (

                                        <>
                                            <li className="nav-item">
                                                <NavLink onClick={() => setModalLoginOpen(true)} className="nav-link dropdown-toggle"  >Login</NavLink>
                                            </li>

                                            {/* <li className="nav-item">
                                                <NavLink className="nav-link dropdown-toggle" to="/register" >Register</NavLink>
                                            </li> */}
                                        </>

                                    )}


                                </ul>
                            </div>
                        </nav>
                    </div>

                </div>




            </header>

            {/* <!-- Main header end --> */}

            {/* {user ? (
                <>
                    <NavLink to="/">Home |</NavLink>
                    <NavLink to="/perfil"> Perfil |</NavLink>
                    <NavLink to="/dashboard"> Dashboard |</NavLink>
                </>
            ) : (
                <>
                    <NavLink to="/login" >Login |</NavLink>
                    <NavLink to="/register" >Register |</NavLink>
                </>

            )} */}

        </div>
    )
}

export default Navbar