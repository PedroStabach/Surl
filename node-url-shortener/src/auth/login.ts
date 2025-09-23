import { Router } from "express";
import prisma from "../prisma/prisma";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginRoutes = Router();

loginRoutes.post("/login", async (req, res) => {
 const { email, password } = req.body;

 if (!email || !password) return res.status(400).json({ error: "Email e senha obrigatórios" });

  const user = await prisma.user.findUnique({ where: { Email: email } });
  if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

  const validPassword = await bcrypt.compare(password, user.Password!);
 if (!validPassword) return res.status(401).json({ error: "Senha inválida" });

 const token = jwt.sign({ userId: user.ID }, "SUA_CHAVE_SECRETA", { expiresIn: "1h" });

 res.json({ token });
});

export default loginRoutes;