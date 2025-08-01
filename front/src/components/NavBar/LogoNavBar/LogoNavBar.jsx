import TheRoyalLogo from "../../../assets/img/The-Royal-Logo.png"; 
import styles from "./LogoNavBar.module.css"


const LogoNavBar=()=>{
    return(<>
         <img className={styles.LogoNavBar} src={TheRoyalLogo} alt="Logo" />
    </>)
}

export default LogoNavBar