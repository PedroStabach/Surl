import { useState } from "react";
import styles from "./styles.module.css";

export function CreateAccount() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password === confirmPassword) {
      try {
        const response = await fetch("http://localhost:3000/auth/CreateAcount", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) throw new Error("Erro ao criar conta");

        window.location.href = "/";

      } catch (err: any) {
        setError(err.message);
      }
    } else {
      alert("As senhas não conferem!");
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>Crie sua conta</h1>

        <label>Nome</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Senha</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label>Confirme a senha</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit">Criar Usuário</button>
      </form>
    </div>
  );
}
