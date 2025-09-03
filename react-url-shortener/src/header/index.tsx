import { Menu } from '../menu';
import { Login } from '../login';
import { MenuItem } from '../menu-itens';
import styles from  './styles.module.css';

export function Header () {
    return (
        <div className={styles.header}>
            <Menu>
                <MenuItem><div className={styles.logo}><img src="" alt="" /></div></MenuItem>
                <MenuItem>Seus links</MenuItem>
                <MenuItem>Como funciona?</MenuItem>
            </Menu>
            <Menu>
                <MenuItem>configuracoes</MenuItem>
                <MenuItem>idioma</MenuItem>
                <MenuItem><Login /> </MenuItem>
            </Menu>
        </div>
    )
}