import styles from './styles.module.css'
import { FaGoogle } from "react-icons/fa";

export function LoginArea () {
    return (
        <>
            <div className={styles.body}>
                <div className={styles.overlay}>
                <div className={styles.loginArea}>
                    <h1>Faca Login</h1>
                    <input type="text"  placeholder='Seu email'/>
                    <input type="password" placeholder='Senha'/>
                    <FaGoogle style={{ fontSize: '20px' }} />

                </div>
                </div>
            </div>            
        </>
    )
}