import { FaUserCircle } from "react-icons/fa";
import styles from './styles.module.css';
import { useAuth } from "./AuthContext";

export function Login() {
  const loggedIn = false;

  if (loggedIn) {
    return <FaUserCircle size={35} />;
  } else {
    return <div className={styles.login}>Iniciar Sessão</div>;
  }
}
