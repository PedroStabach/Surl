import { Menu } from '../menu';
import { Login } from '../login';
import { MenuItem } from '../menu-itens';
import styles from  './styles.module.css';
import { FiSettings } from "react-icons/fi";

export function Header () {
    return (
        <div className={styles.header}>
            <Menu>
                <MenuItem><div className={styles.logo}><img src="" alt="" /></div></MenuItem>
                <MenuItem>Seus links</MenuItem>
                <MenuItem>Como funciona?</MenuItem>
            </Menu>
            <Menu>
                <MenuItem><FiSettings size={20} /></MenuItem>
                <MenuItem>🏳️‍🌈</MenuItem>
                <MenuItem><Login /></MenuItem>
            </Menu>
        </div>
    )
}