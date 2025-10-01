import { Link } from "react-router-dom";
import { Menu } from '../menu';
import { Login } from '../login';
import { useState } from 'react';
import { MenuItem } from '../menu-itens';
import styles from './styles.module.css';
import logoImg from '../images/surl-icon.png';
import { LoginArea } from '../LoginArea';

export function GenericMenu() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className={styles.header}>
      <Menu>
        <MenuItem>
          <div className={styles.logo}>
            <img src={logoImg} alt="logo" />
          </div>
        </MenuItem>
        <MenuItem><Link to="/links">Seus Links</Link></MenuItem>
        <MenuItem><Link to="/">Home</Link></MenuItem>
      </Menu>

      <Menu>
        <MenuItem>
          <Login onLoginClick={() => setShowLogin(true)} />
        </MenuItem>
      </Menu>

      {showLogin && <LoginArea onClose={() => setShowLogin(false)} />}
    </div>
  );
}
