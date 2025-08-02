import NavBar from './components/NavBar/NavBar'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import MisTurnos from './views/MisTurnos/MisTurnos'
import Register from './views/Register/Register'
import { Navigate, Route, Routes} from "react-router-dom"
import "./App.css"
import Contacto from './views/Contacto/Contacto'
import AboutProject from './views/AboutProject/AboutProject'
import NuevoTurno from './views/NuevoTurno/NuevoTurno'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'

function App() {
  const {user}=useContext(UserContext)
  return (
    <div className="Container">
      <NavBar/>
      <div className="Content">
        <Routes>
          <Route path='/' element={<Home/>}/> 
          {user ? (
            <>
              <Route path="/nuevoturno" element={<NuevoTurno />} />
              <Route path="/mis-turnos" element={<MisTurnos />} />
              <Route path='/register' element={<Navigate to="/mis-turnos" />} />
              <Route path='/login' element={<Navigate to="/mis-turnos" />} /> 
              <Route path="*" element={<Navigate to="/mis-turnos" />} />
            </>
          ) : (
            <>
              <Route path='/register' element={<Register/>}/>
              <Route path='/login' element={<Login/>}/> 
              <Route path="/mis-turnos" element={<Navigate to="/login" />} />
              <Route path="/nuevoturno" element={<Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
          <Route path='/contacto' element={<Contacto/>}/> 
          <Route path='/about' element={<AboutProject/>}/> 
        </Routes>
      </div>
    </div>
  )
}

export default App
