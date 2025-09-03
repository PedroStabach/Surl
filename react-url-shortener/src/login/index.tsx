import styles from './styles.module.css';

const loged = false; // arrumar
export function Login () {
    if(loged) {
        return (
            <h1>
                voce esta logado
            </h1>
        )

    } else {
        return (
            <>
                <div className={styles.login}>Iniciar Sessao</div>
            </>
        )
    }
}