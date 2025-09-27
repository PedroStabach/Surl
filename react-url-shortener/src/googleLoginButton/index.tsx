import { FaGoogle } from "react-icons/fa";
import styles from "./styles.module.css";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

function GoogleLoginButton() {
  const { login } = useAuth();

  const handleGoogleLogin = () => {
    const redirectUri = "http://localhost:3000/google/callback"; 
    const clientId = "102427410203-bq7khqdk153rb7phagc9jir0a3ugfcjj.apps.googleusercontent.com";
    const scope = encodeURIComponent("openid profile email");
    const responseType = "code";

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=openid%20email%20profile`;
    
    window.location.href = googleAuthUrl;
  };

  // Processa callback do Google
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      // Remove o code da URL
      window.history.replaceState({}, document.title, "/");

      // Envia para o backend trocar por token
      fetch("http://localhost:3000/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          // data deve conter { token, user }
          login(data.token, data.user);
        })
        .catch((err) => console.error(err));
    }
  }, [login]);

  return (
    <div onClick={handleGoogleLogin} className={styles.GoogleLoginButton}>
      <FaGoogle
        style={{
          width: "25px",
          height: "25px",
          cursor: "pointer",
          marginRight: "10px",
          color: "#4285F4", // gradiente não funciona direto no color
        }}
      />
      <h2>Faça login com o Google</h2>
    </div>
  );
}

export default GoogleLoginButton;
