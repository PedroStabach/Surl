import styles from './styles.module.css';
import { useAuth } from "../Contexts/AuthContext.tsx";

interface LoginProps {
  onLoginClick?: () => void; // deixei opcional para maior flexibilidade
}

export function Login({ onLoginClick }: LoginProps) {
  const { loggedIn, user, logout } = useAuth();

  return (
    <div className={styles.login}>
      {loggedIn && user ? (
          <a onClick={logout}>Sair</a>
      ) : (
        <div
          onClick={onLoginClick}
          style={{ cursor: 'pointer' }}
        >
          Iniciar Sessão
        </div>
      )}
    </div>
  );
}
