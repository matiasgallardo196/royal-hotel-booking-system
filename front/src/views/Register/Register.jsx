import { useContext, useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import style from "./Register.module.css";
import axios from "axios";
import validateRegister from "../../helpers/validateRegister";
import { useNavigate } from "react-router-dom";
import { errorAlert, successAlert } from "../../helpers/alerts";
import { UserContext } from "../../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { registerUser } = useContext(UserContext);

  const [datosFormulario, setDatosFormulario] = useState({
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    password: "",
    file: null,
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    birthdate: "",
    nDni: "",
    password: "",
  });

  const [touch, setTouch] = useState({
    name: false,
    email: false,
    birthdate: false,
    nDni: false,
    password: false,
  });

  useEffect(() => {
    setErrors(validateRegister(datosFormulario));
  }, [datosFormulario]);

  const manejadorDeCambios = (evento) => {
    const { name, value, files } = evento.target;
    setDatosFormulario({
      ...datosFormulario,
      [name]: name === "file" ? files[0] : value,
    });
    setTouch({ ...touch, [name]: true });
  };

  const imgCloudinary = async (img) => {
    try {
      const imgToUp = new FormData();
      imgToUp.append("file", img);
      imgToUp.append("upload_preset", "demo_upload");
      const urlImg = await axios.post(
        "https://api.cloudinary.com/v1_1/dxhwv3byy/image/upload",
        imgToUp
      );
      return urlImg.data.secure_url;
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return null;
    }
  };

  const enviadorDeCambios = async (evento) => {
    evento.preventDefault();
    try {
      const respuesta = await registerUser(
        errors,
        datosFormulario,
        imgCloudinary
      );
      successAlert(`Registration successful!`, respuesta.statusText);
      navigate("/login");
    } catch (error) {
      errorAlert("Submission failed ", error);
    }
  };

  return (
    <div>
      <form className={style.form} onSubmit={enviadorDeCambios}>
        <Input
          name="name"
          type="text"
          body="Name:"
          onChange={manejadorDeCambios}
        />
        {touch.name && errors.name && (
          <p style={{ color: "red" }}>{errors.name}</p>
        )}

        <Input
          name="email"
          type="email"
          body="E-mail:"
          onChange={manejadorDeCambios}
        />
        {touch.email && errors.email && (
          <p style={{ color: "red" }}>{errors.email}</p>
        )}

        <Input
          name="birthdate"
          type="date"
          body="Birth Date:"
          onChange={manejadorDeCambios}
        />
        {touch.birthdate && errors.birthdate && (
          <p style={{ color: "red" }}>{errors.birthdate}</p>
        )}

        <Input
          name="nDni"
          type="number"
          body="ID Number:"
          onChange={manejadorDeCambios}
        />
        {touch.nDni && errors.nDni && (
          <p style={{ color: "red" }}>{errors.nDni}</p>
        )}

        <Input
          name="password"
          type="password"
          body="Password:"
          onChange={manejadorDeCambios}
        />
        {touch.password && errors.password && (
          <p style={{ color: "red" }}>{errors.password}</p>
        )}

        <Input
          name="file"
          type="file"
          body="Profile Picture:"
          onChange={manejadorDeCambios}
        />
        {touch.file && errors.file && (
          <p style={{ color: "red" }}>{errors.file}</p>
        )}

        <button
          disabled={Object.keys(errors).length}
          className={style.boton}
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
