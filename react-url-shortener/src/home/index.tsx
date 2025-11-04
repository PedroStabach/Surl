import styles from './styles.module.css'
import logo from '../images/surl-logo.png';
import { Works } from '../works/index.tsx';
import { useState } from 'react';

export function Home () {
    const [error, setError] = useState("");
    const [OriginalUrl, setOriginalUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    async function handleUrl(e: React.FormEvent) {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    if (!token) {
        setError("Usuário não logado");
        return;
    }
    setError("");
    setShortUrl("");

    try {
        const response = await fetch("http://localhost:3000/auth/url", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ originalUrl: OriginalUrl }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: "Erro inesperado" }));
            throw new Error(errorData.error || "Erro ao criar link");
        }

        const data = await response.json();
        setShortUrl(`http://localhost:3000/${data.shortUrl}`);
    } catch (err: any) {
        setError(err.message);
    }
}

    return (
        <>
        <div className={styles.Home}>
            <div className={styles.container}>
                <h1>Simplificar, Compartilhar, Superar</h1>
                <h2>Transforme longos links para poderosos links acessiveis</h2>
                <form onSubmit={handleUrl}>
                    <input 
                        type="text" 
                        placeholder='Copie seu longo URL aqui' 
                        value={OriginalUrl}  
                        onChange={(e) => setOriginalUrl(e.target.value)} 
                        required
                    /> 
                    <button type='submit'>Diminua</button>
                </form>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {shortUrl && (
                    <p>
                        Seu link curto:{" "}
                        <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
                    </p>
                )}
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
