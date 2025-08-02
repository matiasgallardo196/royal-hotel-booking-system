import style from "./NuevoTurno.module.css";
import { useContext, useEffect, useState } from "react";
import Input from "../../components/Input/Input";
import validateDateTime from "../../helpers/validateNuevoTurno";
import { useNavigate } from "react-router-dom";
import { errorAlert, successAlert } from "../../helpers/alerts";
import { UserContext } from "../../context/UserContext";

const NuevoTurno = () => {
  const { createAppointment } = useContext(UserContext);
  const navigate = useNavigate();

  const [datosFormulario, setDatosFormulario] = useState({
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState({
    date: "Date is required",
    time: "Time is required",
  });

  const [touch, setTouch] = useState({
    date: false,
    time: false,
  });

  useEffect(() => {
    setErrors(validateDateTime(datosFormulario));
  }, [datosFormulario]);

  const manejadorDeCambios = (evento) => {
    const { name, value } = evento.target;
    setDatosFormulario({ ...datosFormulario, [name]: value });
    setTouch({ ...touch, [name]: true });
  };

  const enviadorDeCambios = async (evento) => {
    evento.preventDefault();
    try {
      const respuesta = await createAppointment(errors, datosFormulario);
      successAlert(
        "Registration successful",
        `Date: ${respuesta.data.date} Time: ${respuesta.data.time} `
      );
      navigate("/mis-turnos");
    } catch (error) {
      errorAlert("Submission failed ", error);
    }
  };

  return (
    <div>
      <form className={style.form} onSubmit={enviadorDeCambios}>
        <h1>New Appointment</h1>
        <Input
          name="date"
          type="date"
          body="Day:"
          onChange={manejadorDeCambios}
        />
        {touch.date && errors.date && (
          <p style={{ color: "red" }}>{errors.date}</p>
        )}

        <Input
          name="time"
          type="time"
          body="Time:"
          onChange={manejadorDeCambios}
        />
        {touch.time && errors.time && (
          <p style={{ color: "red" }}>{errors.time}</p>
        )}

        <button
          disabled={errors.date || errors.time}
          className={style.boton}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NuevoTurno;
