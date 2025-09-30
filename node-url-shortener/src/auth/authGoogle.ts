// src/routes/googleAuth.ts
import { Router } from "express";
import fetch from "node-fetch"; // npm install node-fetch@2
import jwt from "jsonwebtoken";

const authGoogle = Router();

// Substitua pelas suas credenciais do Google Cloud
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = "http://localhost:3000/google/callback";

interface GoogleTokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  scope: string;
  token_type: string;
  refresh_token?: string;
}

interface GoogleIdTokenPayload {
  sub: string;
  email: string;
  name: string;
  picture?: string;
  [key: string]: any;
}

authGoogle.post("/auth/google", async (req, res) => {
  const { code } = req.body;

  if (!code) return res.status(400).json({ error: "Code não enviado" });

  try {
    // Troca o code pelo token do Google
    const params = new URLSearchParams();
    params.append("code", code);
    params.append("client_id", CLIENT_ID);
    params.append("client_secret", CLIENT_SECRET);
    params.append("redirect_uri", REDIRECT_URI);
    params.append("grant_type", "authorization_code");

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const tokenData = (await tokenResponse.json()) as GoogleTokenResponse;
    const { id_token } = tokenData;

    if (!id_token) {
      return res.status(400).json({ error: "id_token não recebido do Google" });
    }

    // Decodifica id_token (JWT do Google)
    const base64Payload = id_token.split(".")[1];
    const payload: GoogleIdTokenPayload = JSON.parse(
      Buffer.from(base64Payload, "base64").toString()
    );

    // Cria objeto do usuário
    const user = {
      id: payload.sub,
      name: payload.name,
      email: payload.email,
    };

    // Cria JWT do seu backend
    const backendToken = jwt.sign(user, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return res.json({ token: backendToken, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao autenticar com Google" });
  }
});

export default authGoogle;
