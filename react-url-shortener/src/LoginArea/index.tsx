import styles from './styles.module.css';
import { useState } from 'react';
import GoogleLoginButton from '../googleLoginButton';
import {  FaArrowLeft  } from 'react-icons/fa';


export function LoginArea({ onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erro ao logar");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      onClose();                 // fecha modal/login area
    } catch (err: any) {
      setError(err.message);
    }
}
  return (
    <div className={styles.body}>
      <div className={styles.overlay}>
        <div className={styles.loginArea}>
          <div className={styles.float}>
            <FaArrowLeft 
              style={{ fontSize: '20px', cursor: 'pointer'}} 
              onClick={onClose} 
            />
          </div>
          
          <h1>Bem vindo de volta</h1>
          <h2>Faça login da forma que preferir.</h2>
            <GoogleLoginButton />
          <h2>Ou</h2>
          <form onSubmit={handleSubmit}>
            <label>E-mail</label>
            <input type="text" 
            placeholder='Seu email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/>
            <label>Password</label>
            <input type="password" 
            placeholder='Senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
            <button type="submit">Entrar</button>
            <h3><a href="#">não possuo cadastro</a></h3>

            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
