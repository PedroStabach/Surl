import { Menu } from '../menu';
import { Login } from '../login';
import { useState } from 'react';
import { MenuItem } from '../menu-itens';
import styles from './styles.module.css';
import { FiSettings } from "react-icons/fi";
import { Bandeiras } from '../bandeiras';
import logoImg from '../images/surl-icon.png';
import { LoginArea } from "../LoginArea";

export function Header() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className={styles.header}>
      {showLogin && <LoginArea onClose={() => setShowLogin(false)} />}

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
        <MenuItem><FiSettings size={20} /></MenuItem>
        <MenuItem><Bandeiras /></MenuItem>

        <MenuItem>
          <div onClick={() =>setShowLogin(true)} style={{ cursor: "pointer" }}>
            <Login />
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
