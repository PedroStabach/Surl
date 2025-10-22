import { useState, useEffect } from "react";
import styles from './styles.module.css';
interface Link {
  id: number;
  originalUrl: string;
  shortUrl: string;
}

export function YourLinks() {
  const [links, setLinks] = useState<Link[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLinks() {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Usuário não logado");
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/auth/links`, {
          headers: { "Authorization": `Bearer ${token}` },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erro inesperado");
        }

        setLinks(data);
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchLinks();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Seus Links</h2>
      {error && <p className={styles.error}>{error}</p>}

      {links.length === 0 && !error && <p className={styles.empty}>Nenhum link encontrado.</p>}

      <ul className={styles.list}>
        {links.map((link) => (
          <li className={styles.card} key={link.id}>
            <strong>Original:</strong>{" "}
            <a href={link.originalUrl} target="_blank" rel="noreferrer">
              {link.originalUrl}
            </a>
            <br />
            <strong>Curto:</strong>{" "}
            <a href={`http://localhost:3000/${link.shortUrl}`} target="_blank" rel="noreferrer">
              {`http://localhost:3000/${link.shortUrl}`}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
