import { Router } from "express";
import prisma from "../prisma/prisma";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginRoutes = Router();

loginRoutes.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { Email: email } });
    if (!user) return res.status(401).json({ error: "Usuário não encontrado" });

    const match = await bcrypt.compare(password, user.Password!);
    if (!match) return res.status(401).json({ error: "Senha incorreta" });

    const token = jwt.sign(
      { userId: user.ID, email: user.Email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

export default loginRoutes;
