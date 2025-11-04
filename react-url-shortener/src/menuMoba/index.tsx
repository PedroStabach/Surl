import { Menu } from '../Menu/index.tsx';
import { Login } from '../Login/index.tsx';
import { useState } from 'react';
import { MenuItem } from '../MenuItem/index.tsx';
import styles from './styles.module.css';
import { LoginArea } from "../LoginArea";
export function MenuMoba() {
    const [showLogin, setShowLogin] = useState(false);
    return (
        <div className={styles.header}>
      {showLogin && <LoginArea onClose={() => setShowLogin(false)} />}
      <Menu>
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