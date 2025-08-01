import style from "./ConfirmModal.module.css";

const ConfirmModal = ({ onConfirm }) => {
  return (
    <div className={style.modal}>
      <div className={style.content}>
        <p>Are you sure you want to cancel the appointment?</p>
        <div className={style.buttons}>
          <button className={style.button} onClick={() => onConfirm(true)}>
            Confirm
          </button>
          <button className={style.button} onClick={() => onConfirm(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
