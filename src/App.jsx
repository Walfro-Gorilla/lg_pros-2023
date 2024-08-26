import { Route, Routes } from "react-router-dom"
import { useContext } from "react"
import { Typography } from "antd"

///context
import { UserContext } from "./context/UserProvider"

//ROUTES
import Login from './routes/Login'
import Home from './routes/Home'
import Home_2 from './routes/Home_2'
import Home_3 from './routes/Home_3'
import Register from "./routes/Register"
import Perfil from "./routes/Perfil"
import Dashboard from "./routes/Dashboard"
import NotFound from "./routes/NotFound"
import Admin from "./routes/Admin"
import ContactUs from "./routes/ContactUs"
import AboutUs from "./routes/AboutUs"
import Services from "./routes/Services"

// LAYOUTS
import LayoutRequireAuth from "./layouts/LayoutRequireAuth"
import LayoutContainerForm from "./layouts/LayoutContainerForm"

// COMPONENTS
import Navbar2 from "./components/Navbar2"
import Header from "./components/Header"

const { Title, Paragraph, Text, Link } = Typography;

const App = () => {

  const { user } = useContext(UserContext)

  if (user === false) {
    return <p>Loading...</p>
  }

  return (
    <div style={{ margin: 0 }}>


      {/* {/* <Header /> */}
      <Routes>

        {/* Rutas Prtegidas */}
        <Route path="/" element={<LayoutRequireAuth />} >
          <Route path="/admin" element={<Admin />} />
        </Route>

        {/* Rutas publicas */}
        <Route path="/" element={<LayoutContainerForm />}>
          
          <Route index element={<Home />} />
          <Route path="/home2" element={<Home_2 />} />
          <Route path="/home3" element={<Home_3 />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<NotFound />} />

      </Routes>
    </div>
  )
}

export default App