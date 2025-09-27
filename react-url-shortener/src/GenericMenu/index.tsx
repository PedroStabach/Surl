import { Menu } from '../menu';
import { Login } from '../login';
import { useState } from 'react';
import { MenuItem } from '../menu-itens';
import styles from './styles.module.css';
import logoImg from '../images/surl-icon.png';
import { LoginArea } from "../LoginArea";
import { useAuth } from '../contexts/AuthContext';
export function GenericMenu() {
    const [showLogin, setShowLogin] = useState(false);
    const { isLoggedIn, user, logout } = useAuth();
    return (
        <div className={styles.header}>
      {showLogin && <LoginArea onClose={() => setShowLogin(false)} />}
        {isLoggedIn ? (
        <div>
          Olá, {user?.name}!
          <button onClick={logout}>Sair</button>
        </div>
      ) : (
        <div>
          <div>voce nao esta logado</div>
        </div>
      )}




      <Menu>
        <MenuItem>
          <div className={styles.logo}>
            <img src={logoImg} alt="logo" />
          </div>
        </MenuItem>
        <MenuItem><a href="">Seus Links</a></MenuItem>
        <MenuItem><a href="">Home</a></MenuItem>
      </Menu>

      <Menu>
        <MenuItem>
          <div onClick={() =>setShowLogin(true)} style={{ cursor: "pointer" }}>
            <Login />
          </div>
        </MenuItem>
      </Menu>
    </div>
    )
}