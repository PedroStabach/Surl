import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

export function VerificarLogin() {
  return (
    <GoogleOAuthProvider clientId="102427410203-bq7khqdk153rb7phagc9jir0a3ugfcjj.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const token = credentialResponse.credential;
          
          // Salva no localStorage
          localStorage.setItem("token", token!);

          // Decodifica dados do usuário
          const user: any = jwtDecode(token!);
          console.log("Usuário:", user);

          alert("Login Google concluído!");
        }}
        onError={() => {
          alert("Erro no login Google!");
        }}
      />
    </GoogleOAuthProvider>
  );
}