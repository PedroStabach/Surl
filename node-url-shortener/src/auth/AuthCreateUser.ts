import { Router } from "express";
import prisma from "../prisma/prisma";
import * as bcrypt from "bcrypt";

const AuthCreateUser = Router();

AuthCreateUser.post("/auth/CreateAcount", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email},
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email já está em uso!" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        creationDate: new Date(),
      },
    });

    res.status(201).json({ message: "Usuário criado com sucesso!", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});


export default AuthCreateUser;
