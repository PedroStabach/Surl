import { Router, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import prisma from "../prisma/prisma";
import jwt from "jsonwebtoken";

const loginRoutes = Router();

const JWT_SECRET = process.env.JWT_SECRET;

loginRoutes.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return res.status(400).json({ error: "Email ou senha incorretos" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ error: "Email ou senha incorretos" });
    }

    // gerar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.json({
      token, // <- enviar o token para o frontend
      userId: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

export default loginRoutes;
