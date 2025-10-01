// src/googleLoginButton.tsx
import { FaGoogle } from "react-icons/fa";
import styles from "./styles.module.css";

export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    const clientId = "102427410203-bq7khqdk153rb7phagc9jir0a3ugfcjj.apps.googleusercontent.com";
    const redirectUri = "http://localhost:3000/google/callback";
    const scope = encodeURIComponent("openid profile email");
    const responseType = "code";

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;
    window.location.href = googleAuthUrl;
  };

  return (
    <div onClick={handleGoogleLogin} className={styles.GoogleLoginButton}>
      <FaGoogle style={{ width: 25, height: 25, cursor: "pointer", marginRight: 10, color: "#4285F4" }} />
      <h2>Faça login com o Google</h2>
    </div>
  );
}
