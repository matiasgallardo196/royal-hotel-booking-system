import styles from "./NavBar.module.css";
import LogoNavBar from "./LogoNavBar/LogoNavBar";
import NavButton from "./NavButton/NavButton";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const NavBar = () => {
  const { logout } = useContext(UserContext);
  const user = JSON.parse(sessionStorage.getItem("user"));
  return (
    <nav className={styles.navBar}>
      <LogoNavBar />
      <ul className={styles.buttons}>
        <NavButton texto="Home" link="/" />
        <NavButton texto="Appointments" link="/mis-turnos" />
        <NavButton texto="Contact" link="/Contacto" />
        <NavButton texto="About" link="/about" />

        {sessionStorage.getItem("user") /*user*/ ? (
          <>
            <span className={styles.span}>Welcome, {user.name}</span>
            {user.file ? (
              <img src={user.file} alt="avatar" className={styles.imagen} />
            ) : (
              <div className={styles.sinImagen}>
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <button className={styles.button1} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <></>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
