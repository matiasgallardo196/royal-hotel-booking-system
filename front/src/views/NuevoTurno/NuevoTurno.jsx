import style from "./NuevoTurno.module.css";
import { useState } from "react";
import validateNewAppointment from "../../helpers/validateNuevoTurno";
import { useNavigate } from "react-router-dom";
import { postAppointment } from "../../helpers/myAppointments";
import { successAlert, errorAlert } from "../../helpers/alerts";

const NewAppointment = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateNewAppointment(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await postAppointment(formData);
      successAlert("Appointment created successfully!");
      navigate("/my-appointments");
    } catch (error) {
      errorAlert(error.message || "Failed to create appointment");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit} className={style.form}>
        <h1>New Appointment</h1>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={errors.date ? style.error : ""}
        />
        {errors.date && <p className={style.errorText}>{errors.date}</p>}

        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className={errors.time ? style.error : ""}
        />
        {errors.time && <p className={style.errorText}>{errors.time}</p>}

        <button type="submit" className={style.button}>
          Create Appointment
        </button>
      </form>
    </div>
  );
};

export default NewAppointment;
