import styles from './styles.module.css'
import { FcGoogle  } from 'react-icons/fc';
import { FaFacebook, FaApple, FaArrowLeft  } from 'react-icons/fa';

export function LoginArea () {
    return (
        <>
            <div className={styles.body}>
                <div className={styles.overlay}>
                <div className={styles.loginArea}>
                    <div className={styles.float}>
                        <FaArrowLeft style={{ fontSize: '20px' }}/>
                    </div>
                    
                    <h1>Bem vindo de volta</h1>
                    <h2>Faca login da forma que preferir.</h2>
                    <nav>
                        <ul>
                            <li> <FcGoogle style={{ fontSize: '30px' }} /></li>
                            <li> <FaFacebook style={{ fontSize: '30px' }} /></li>
                            <li> <FaApple style={{ fontSize: '30px' }} /></li>
                        </ul>
                    </nav>
                     <h2>Ou</h2>
                    <form action="">
                        <span>E-mail</span>
                        <input type="text"  placeholder='Seu email'/>
                        <span>Password</span>
                        <input type="password" placeholder='Senha'/>
                        <button>Entrar</button>
                        <h3><a href="">nao possuo cadastro</a></h3>
                    </form>
                </div>
                </div>
            </div>            
        </>
    )
}