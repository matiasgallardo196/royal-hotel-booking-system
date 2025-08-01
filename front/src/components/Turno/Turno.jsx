import style from "./Turno.module.css";
import { useState } from "react";
import { putAppointment } from "../../helpers/myAppointments";
import { successAlert, errorAlert } from "../../helpers/alerts";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

const Appointment = ({ id, date, time, status }) => {
  const [showModal, setShowModal] = useState(false);
  const [valores, setValores] = useState({ id, date, time, status });

  const onClick = () => {
    setShowModal(true);
  };

  const handleConfirm = async (confirmed) => {
    setShowModal(false);
    if (confirmed) {
      try {
        const res = await putAppointment(valores.id);
        setValores({ ...valores, status: "cancelled" });
        successAlert(
          "Appointment Cancelled",
          `Date: ${res.date} Time: ${res.time}`
        );
      } catch (error) {
        errorAlert("Failed to cancel appointment", error.message);
      }
    }
  };

  return (
    <>
      <div className={style.appointment}>
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
        <p>
          <strong>Status: </strong>
          {valores.status}
        </p>
        <button
          disabled={valores.status == "cancelled"}
          className={style.button}
          onClick={onClick}
        >
          Cancel
        </button>
      </div>
      {showModal && <ConfirmModal onConfirm={handleConfirm} />}
    </>
  );
};

export default Appointment;
