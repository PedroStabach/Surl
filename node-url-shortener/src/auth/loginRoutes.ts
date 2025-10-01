import { Router } from "express";
import prisma from "../prisma/prisma";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginRoutes = Router();

loginRoutes.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { Email : email} });
    const match = await bcrypt.compare(password, user!.Password!);
    if (!user || !match) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const token = jwt.sign(
      { userId: user.ID, email: user.Email, name: user.Name },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});


export default loginRoutes;