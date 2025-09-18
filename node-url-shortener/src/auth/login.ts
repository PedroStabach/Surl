import { Router } from "express";
import prisma from "../prisma/prisma";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authRoutes = Router();

authRoutes.post("/login", async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) return res.status(400).json({ error: "Email e senha obrigatórios" });

  const user = await prisma.user.findUnique({ where: { Email } });
  if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

  const validPassword = await bcrypt.compare(Password, user.Password);
  if (!validPassword) return res.status(401).json({ error: "Senha inválida" });

  const token = jwt.sign({ userId: user.ID }, "SUA_CHAVE_SECRETA", { expiresIn: "1h" });

  res.json({ token });
});

export default authRoutes;
