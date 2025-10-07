import {Router, Request, Response} from "express";
import * as bcrypt from "bcrypt";
import prisma from "../prisma/prisma";
const userRoutes = Router();

userRoutes.post('/users', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, creationDate: new Date() },
    });
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      creationDate: user.creationDate
      });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});
userRoutes.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({erro: "Erro ao encontrar os usuarios"});
    }
});

userRoutes.get('/user/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const user = await prisma.user.findFirst({
      where: { id},
    });

    if (!user) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
});
userRoutes.put('/user/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const {name, password} = req.body;
    const user = await prisma.user.update({
      where: {id},
      data: {
        name,
        password
    }
    });
    return res.json(user);
  } catch (error) {
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
});
userRoutes.delete('/user/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }
    await prisma.shortlink.deleteMany({
        where: {fkUserId: id}
    })
    const user = await prisma.user.delete({
      where: { id: id },
    });
    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
});

export default userRoutes;