import { FaUserCircle} from "react-icons/fa";
import styles from './styles.module.css';
import { useState } from "react";

const loged = false;

export function Login () {
    const [mostrar, setMostrar] = useState(false);
    const [primeiroClick, setPrimeiroClick] = useState(false);

    function toggle() {
        setMostrar((prev) => !prev); 
        }
    if (!primeiroClick) {
      setMostrar(true);
      setPrimeiroClick(true); 
    }
    if(loged) {
        
        return (
            <>
                <FaUserCircle size={35}/>
            </>
            
        )

    } else {
        return (
            <>
                <div className={styles.login} >Iniciar Sessao</div>
            </>
        )
    }
}