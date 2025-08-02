import { useContext, useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import style from "./Login.module.css";
import validate from "../../helpers/validateLogin";
import RegisterButton from "../../components/RegisterButton/RegisterButton";
import { useNavigate } from "react-router-dom";
import { errorAlert, successAlert } from "../../helpers/alerts";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const [datosLogin, setDatosLogin] = useState({
    username: "",
    password: "",
  });

  const [error, setErros] = useState({
    username: "Username is required",
    password: "Password is required",
  });

  const [touch, setTouch] = useState({
    username: false,
    password: false,
  });

  useEffect(() => {
    setErros(validate(datosLogin));
  }, [datosLogin]);

  const manejadorCambios = (evento) => {
    const { name, value } = evento.target;

    setDatosLogin({ ...datosLogin, [name]: value });
    setTouch({ ...touch, [name]: true });
  };

  const eventoEnviar = async (evento) => {
    evento.preventDefault();
    try {
      const respuesta = await login(error, datosLogin);
      successAlert(`Welcome, ${respuesta?.data?.user?.name}!`);
      navigate("/mis-turnos");
    } catch (error) {
      errorAlert("Could not login: ", error);
    }
  };

  return (
    <div>
      <form className={style.form} onSubmit={eventoEnviar}>
        <Input
          name="username"
          type="text"
          body="Email:"
          onChange={manejadorCambios} /*onBlur={onBlurHandler}*/
        />
        {error.username && touch.username && (
          <p style={{ color: "red" }}>{error.username}</p>
        )}
        <Input
          name="password"
          type="password"
          body="Password:"
          onChange={manejadorCambios} /*onBlur={onBlurHandler}*/
        />
        {error.password && touch.password && (
          <p style={{ color: "red" }}>{error.password}</p>
        )}
        <button
          className={style.boton}
          disabled={error.password || error.username}
          type="submit"
        >
          Login
        </button>
        <RegisterButton />
      </form>
    </div>
  );
};

export default Login;
