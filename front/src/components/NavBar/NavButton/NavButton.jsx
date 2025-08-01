import styles from "./NavButton.module.css"
import { Link } from "react-router-dom";


const NavButton=({texto,link})=>{
    return(
        <li className={styles.button}>
           <Link to={link}>{texto}</Link> 
        </li>

    )
}

export default NavButton