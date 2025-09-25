import { useState } from "react";
import styles from './styles.module.css';

type User = {
  name: string;
  avatar: string;
};

export function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null); // <-- tipagem

  const handleLogin = () => {
    setUser({
      name: "Pedro",
      avatar: "https://i.pravatar.cc/40",
    });
    setLoggedIn(false);
  };

  const handleLogout = () => {
    setUser(null);
    setLoggedIn(false);
  };

  if (loggedIn && user) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <img
          src={user.avatar}
          alt={user.name}
          style={{ width: "35px", height: "35px", borderRadius: "50%" }}
        />
        <span>{user.name}</span>
        <button onClick={handleLogout}>Sair</button>
      </div>
    );
  } else {
    return <div className={styles.login} onClick={handleLogin}>Iniciar Sessão</div>; //mudar Evento
  }
}
