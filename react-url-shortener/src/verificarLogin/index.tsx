import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export function VerificarLogin() {
  return (
    <GoogleOAuthProvider clientId="102427410203-bq7khqdk153rb7phagc9jir0a3ugfcjj.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          const token = credentialResponse.credential;

          // Envia o token do Google para o backend
          const res = await fetch("http://localhost:3000/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });

          const data = await res.json();

          if (data.appToken) {
            localStorage.setItem("token", data.appToken);
            alert("Login Google concluído!");
          } else {
            alert("Erro ao autenticar com backend!");
          }
        }}
        onError={() => {
          alert("Erro no login Google!");
        }}
      />
    </GoogleOAuthProvider>
  );
}
