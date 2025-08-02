import style from "./ConfirmModal.module.css";

const ConfirmModal = ({ handleValue }) => {
  return (
    <div className={style.divCaja}>
      <p>Are you sure you want to cancel the appointment?</p>
      <div className={style.divBotones}>
        <button className={style.boton} onClick={() => handleValue(true)}>
          Confirm
        </button>
        <button className={style.boton} onClick={() => handleValue(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
