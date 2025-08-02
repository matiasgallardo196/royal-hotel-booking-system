import { useContext, useEffect, useState } from "react";
import Turno from "../../components/Turno/Turno";
import NavButton from "../../components/NavBar/NavButton/NavButton";
import styles from "./MisTurnos.module.css";
import { UserContext } from "../../context/UserContext";

const MisTurnos = () => {
  const [turnos, setTurnos] = useState([]);
  const { getAppointments } = useContext(UserContext);

  const fetchTurnos = async () => {
    try {
      setTurnos(await getAppointments());
    } catch (error) {
      console.error("Error getting appointments:", error);
    }
  };

  useEffect(() => {
    fetchTurnos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className={styles.titulo}>Appointments View</h1>
      <NavButton texto={"New Appointment"} link={"/nuevoturno"} />
      {turnos.map((turno) => {
        return <Turno key={turno.id} {...turno} />;
      })}
    </>
  );
};

export default MisTurnos;
