import { Route, Routes } from "react-router-dom"

import Login from './routes/Login'
import Home from './routes/Home'
import Navbar from "./components/Navbar"

import RequireAuth from "./components/RequireAuth"

const App = () => {
  return (
    <>
      <div>App</div>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        } />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App