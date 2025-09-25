import { FaGoogle } from 'react-icons/fa';
import styles from './styles.module.css';
function GoogleLoginButton() {
  // URL para iniciar o login no Google
  const handleGoogleLogin = () => {
    const redirectUri = "http://localhost:3000/google/callback"; // MESMO valor que está no Google Cloud
    
    
    const clientId =  "102427410203-bq7khqdk153rb7phagc9jir0a3ugfcjj.apps.googleusercontent.com";
    const scope = encodeURIComponent("openid profile email");
    const responseType = "code";
    const accessType = "offline"; // se quiser refresh_token
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile`;
    // abre o login
    window.location.href = googleAuthUrl;
  };

  return (
      <div onClick={handleGoogleLogin} className={styles.GoogleLoginButton}>
         <FaGoogle
          style={{
            width: '25px',
            height: '25px',
            cursor: 'pointer',
            color: 'linear-gradient(45deg, #4285F4, #34A853, #FBBC05, #EA4335)',
          }} />
      </div>
  );
}

export default GoogleLoginButton;
