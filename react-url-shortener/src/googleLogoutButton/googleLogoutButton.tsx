import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}
function GoogleLogoutButton() {
  useEffect(() => {
    /* Carrega o script da Google API (caso ainda não tenha carregado) */
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleLogout = () => {
    /* Revoga o token atual */
    const token = localStorage.getItem("google_token"); // se você salvou o token
    if (token) {
      window.google.accounts.id.revoke(token, (done: any) => {
        console.log("Usuário deslogado do Google", done);
        localStorage.removeItem("google_token"); // limpa o token local
      });
    }
  };

  return <button onClick={handleLogout}>Logout Google</button>;
}

export default GoogleLogoutButton;
