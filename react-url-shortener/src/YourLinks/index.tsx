import { useState, useEffect } from "react";

interface Link {
  id: number;
  OriginalUrl: string;
  ShortUrl: string;
}

export function YourLinks() {
  const [links, setLinks] = useState<Link[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLinks() {
      const token = localStorage.getItem("token");
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
    <div> 
      <h2>Seus Links</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {links.length === 0 && !error && <p>Nenhum link encontrado.</p>}
      <ul>
        {links.map((link) => (
          <li key={link.id}>
            Original: <a href={link.OriginalUrl} target="_blank" rel="noreferrer">{link.OriginalUrl}</a> <br />
            Curto: <a href={`http://localhost:3000/${link.ShortUrl}`} target="_blank" rel="noreferrer">{`http://localhost:3000/${link.ShortUrl}`}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
