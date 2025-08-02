import NavButton from "../NavBar/NavButton/NavButton";
import style from "./RegisterButton.module.css";

const RegisterButton = () => {
  return (
    <div className={style.registerButton}>
      <NavButton texto={"Register"} link={"/register"} />
    </div>
  );
};

export default RegisterButton;
