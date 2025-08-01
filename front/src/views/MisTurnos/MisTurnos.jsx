import Appointment from "../../components/Turno/Turno";
import NavButton from "../../components/NavBar/NavButton/NavButton";
import styles from "./MisTurnos.module.css";
import { useState, useEffect } from "react";
import { getAppointments } from "../../helpers/myAppointments";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      setAppointments(await getAppointments());
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Appointments View</h1>
      <NavButton texto={"New Appointment"} link={"/new-appointment"} />
      {appointments.map((appointment) => {
        return <Appointment key={appointment.id} {...appointment} />;
      })}
    </div>
  );
};

export default MyAppointments;
