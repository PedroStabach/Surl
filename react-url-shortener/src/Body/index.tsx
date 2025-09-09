import styles from './styles.module.css';
import logo from '../images/surl-logo.png';
export function Body() {
    return (
        <>
            <div className={styles.Body}>
                <div className={styles.container}>
                    <h1>Simplificar, Compartilhar, Superar</h1>
                    <h2>Transforme longos links para poderosos links acessiveis</h2>
                    <input type="text" placeholder='Copie seu longo URL aqui'/> <button>Diminua</button>
                </div>
                <div className={styles.container}>
                    <img src={logo} alt="" />
                </div>
            </div>
        </>
    )

}