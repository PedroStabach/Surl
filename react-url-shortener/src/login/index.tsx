import { FaUserCircle} from "react-icons/fa";
import styles from './styles.module.css';

const loged = false; // arrumar
export function Login () {
    if(loged) {
        return (
            <FaUserCircle size={35}/>
        )

    } else {
        return (
            <>
                <div className={styles.login}>Iniciar Sessao</div>
            </>
        )
    }
}