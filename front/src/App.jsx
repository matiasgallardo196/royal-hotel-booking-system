import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import NavBar from "./components/NavBar/NavBar";
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import MyAppointments from "./views/MisTurnos/MisTurnos";
import NewAppointment from "./views/NuevoTurno/NuevoTurno";
import Contacto from "./views/Contacto/Contacto";
import AboutProject from "./views/AboutProject/AboutProject";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/new-appointment" element={<NewAppointment />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/about" element={<AboutProject />} />

          {/* Protected routes for authenticated users */}
          <Route
            path="/my-appointments"
            element={
              sessionStorage.getItem("user") ? (
                <MyAppointments />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/new-appointment"
            element={
              sessionStorage.getItem("user") ? (
                <NewAppointment />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
