import { useState } from "react"

export function CreateAcount () {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit (e : React.FormEvent) {
        e.preventDefault();
        if(password === confirmPassword) {
            try {
            const response = await fetch("http://localhost:3000/auth/CreateAcount", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body : JSON.stringify({ name, email, password})
            });
        } catch (err : any) {
            setError(err.message);
        }
        } else {
            alert("As senhas nao conferem!")
        }
        window.location.href = "/";
    }
    return (
        <>
        <h1>Crie Sua Conta</h1>
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text" placeholder="Seu Nome" value={name} onChange={(e) => setName(e.target.value)} required/>
            <label>Email</label>
            <input type="text" placeholder="Seu Melhor Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <label>Password</label>
            <input type="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            <label>Repita a senha</label>
            <input type="Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
            <button type="submit">Criar Usuario</button>
        </form>
        </>
    )
}