import styles from './styles.module.css'
import { FcGoogle  } from 'react-icons/fc';
import { FaFacebook, FaApple, FaArrowLeft  } from 'react-icons/fa';

export function LoginArea({ onClose }) {
  return (
    <div className={styles.body}>
      <div className={styles.overlay}>
        <div className={styles.loginArea}>
          <div className={styles.float}>
            <FaArrowLeft 
              style={{ fontSize: '20px', cursor: 'pointer' }} 
              onClick={onClose} 
            />
          </div>
          
          <h1>Bem vindo de volta</h1>
          <h2>Faça login da forma que preferir.</h2>
          <nav>
            <ul>
              <li><FcGoogle style={{ fontSize: '30px' }} /></li>
              <li><FaFacebook style={{ fontSize: '30px' }} /></li>
              <li><FaApple style={{ fontSize: '30px' }} /></li>
            </ul>
          </nav>
          <h2>Ou</h2>
          <form>
            <span>E-mail</span>
            <input type="text" placeholder='Seu email'/>
            <span>Password</span>
            <input type="password" placeholder='Senha'/>
            <button type="submit">Entrar</button>
            <h3><a href="#">não possuo cadastro</a></h3>
          </form>
        </div>
      </div>
    </div>
  )
}
