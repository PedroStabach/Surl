import { Router, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import prisma from "../prisma/prisma";

const loginRoutes = Router();

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

    // exemplo de token ou resposta
    res.json({
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
