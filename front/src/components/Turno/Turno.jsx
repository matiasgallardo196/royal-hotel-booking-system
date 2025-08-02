import { useContext, useState } from "react";
import style from "./Turno.module.css";
import validarTiempoCancelacion from "../../helpers/validarTiempoCancelacion";
import { errorAlert, successAlert } from "../../helpers/alerts";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { UserContext } from "../../context/UserContext";

const Turno = ({ id, date, time, status }) => {
  const { cancelAppointment } = useContext(UserContext);
  const [valores, setValores] = useState({
    id: id,
    date: date,
    time: time,
    status: status,
  });

  const [showModal, setShowModal] = useState(false);
  const [confirmCallback, setConfirmCallback] = useState(null);

  const handleValue = (value) => {
    if (confirmCallback) confirmCallback(value);
    setShowModal(false);
  };

  const onClick = async (event) => {
    event.preventDefault();
    let errorMensaje = { message: null };
    try {
      errorMensaje.message = validarTiempoCancelacion(valores);

      if (errorMensaje.message) throw new Error();
      setShowModal(true);
      const userConfirmed = await new Promise((resolve) => {
        setConfirmCallback(() => resolve);
      });

      if (!userConfirmed) throw new Error();
      const res = await cancelAppointment(id);
      setValores(res);
      successAlert(
        "Appointment Cancelled",
        `Date: ${res.date} Time: ${res.time} `
      );
    } catch (error) {
      errorAlert("", errorMensaje.message ? errorMensaje : error);
    }
  };

  return (
    <div className={style.turno}>
      <p>
        <strong>Appointment ID: </strong>
        {valores.id}
      </p>
      <p>
        <strong>Date: </strong>
        {valores.date}
      </p>
      <p>
        <strong>Time: </strong>
        {valores.time}
      </p>
      <p className={style[valores.status]}>{valores.status.toUpperCase()}</p>
      <button
        disabled={valores.status == "cancelled"}
        className={style.boton}
        onClick={onClick}
      >
        Cancel
      </button>
      {showModal && <ConfirmModal handleValue={handleValue} />}
    </div>
  );
};

export default Turno;
