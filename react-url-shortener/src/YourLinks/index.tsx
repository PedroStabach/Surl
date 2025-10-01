import { useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";

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
        // Decodifica o token se você quiser usar o userId localmente (opcional)
        const decoded: any = jwtDecode(token);
        const userId = decoded.userId;

        // Faz a requisição para buscar os links do usuário
        const response = await fetch(`http://localhost:3000/auth/links/${userId}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Erro inesperado" }));
          throw new Error(errorData.error || "Erro ao buscar links");
        }

        const data: Link[] = await response.json();
        setLinks(data);
      } catch (err: any) {
        setError(err.message);
      }
    }

    fetchLinks();
  }, []); // Executa só uma vez ao montar o componente

  return (
    <div>
      <h2>Seus Links</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {links.length === 0 && !error && <p>Nenhum link encontrado.</p>}

      <ul>
        {links.map((link) => (
          <li key={link.id}>
            Original: <a href={link.OriginalUrl} target="_blank" rel="noreferrer">{link.OriginalUrl}</a> <br />
            Curto: <a href={`http://localhost:3030/${link.ShortUrl}`} target="_blank" rel="noreferrer">{`http://localhost:3000/${link.ShortUrl}`}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
