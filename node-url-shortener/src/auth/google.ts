import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma.js"; // ajuste o path pro seu projeto

const authRoutes = Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /auth/google
authRoutes.post("/google", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.status(400).json({ error: "Token do Google obrigatório" });

    // Verifica token com Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { Name, Email, sub, picture } = payload; // sub = ID único do Google

    // Verifica se usuário já existe no banco
    let user = await prisma.user.findUnique({ where: { Email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          Email,
          Name,
          avatar: picture,
          googleId: sub,
        },
      });
    }

    // Gera token JWT próprio da sua API
    const appToken = jwt.sign(
      { id: user.ID, email: user.Email },
      process.env.JWT_SECRET;
      { expiresIn: "7d" }
    );

    return res.json({ user, token: appToken });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: "Token inválido ou erro na autenticação" });
  }
});

export default authRoutes;
