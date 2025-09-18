import styles from './styles.module.css'

export function LoginArea () {
    return (
        <>
            <div className={styles.body}>
                <div className={styles.overlay}>
                <div className={styles.loginArea}>
                    <h1>Bem vindo de volta</h1>
                    <h2>Faca login da forma que preferir.</h2>
                     
                     <h2>Ou</h2>
                    <form action="">
                        <span>E-mail</span>
                        <input type="text"  placeholder='Seu email'/>
                        <span>Password</span>
                        <input type="password" placeholder='Senha'/>
                        <h3><a href="">nao possuo cadastro</a></h3>
                    </form>
                </div>
                </div>
            </div>            
        </>
    )
}