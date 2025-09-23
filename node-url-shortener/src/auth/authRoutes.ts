import { Router } from "express";
import prisma from "../prisma/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import "dotenv/config";

const authRoutes = Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ------------------- LOGIN TRADICIONAL -------------------
authRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email e senha obrigatórios" });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

  if (!user.password)
    return res.status(401).json({ error: "Usuário cadastrado via Google" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(401).json({ error: "Senha inválida" });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  res.json({ token });
});

// ------------------- LOGIN COM GOOGLE -------------------
authRoutes.post("/google", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "Token do Google é obrigatório" });

    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload: TokenPayload | undefined = ticket.getPayload();
    if (!payload || !payload.email)
      return res.status(401).json({ error: "Token inválido do Google" });

    const { email, name, picture, sub } = payload;

    // verifica se já existe
    let user = await prisma.user.findUnique({ where: { email } });

    // se não existir, cria
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || "Usuário Google",
          password: null, // Login via Google, sem senha
          googleId: sub,
          avatar: picture,
        },
      });
    }

    const appToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.json({ user, token: appToken });
  } catch (err) {
    console.error("Erro login Google:", err);
    res.status(500).json({ error: "Erro interno no login com Google" });
  }
});

export default authRoutes;
