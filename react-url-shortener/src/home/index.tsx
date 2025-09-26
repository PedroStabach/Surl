import styles from './styles.module.css'
import logo from '../images/surl-logo.png';
import { Works } from '../works';
export function Home () {
    return (
        <>
        <div className={styles.Home}>
                <div className={styles.container}>
                    <h1>Simplificar, Compartilhar, Superar</h1>
                    <h2>Transforme longos links para poderosos links acessiveis</h2>
                    <input type="text" placeholder='Copie seu longo URL aqui'/> <button>Diminua</button>
                </div>
                <div className={styles.container}>
                    <img src={logo} alt="logo Surl" />
                </div>
            </div>
        <div className={styles.Home}>
            <Works />
        </div>
        </>
    )
}