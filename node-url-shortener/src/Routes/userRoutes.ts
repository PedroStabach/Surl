import {Router, Request, Response} from "express";
import prisma from "../prisma/prisma";
const userRoutes = Router();

userRoutes.post('/users', async (req: Request, res: Response) => {
  try {
    const { Name, Email } = req.body;
    const user = await prisma.user.create({
      data: { Name, Email, CreationDate: new Date() },
    });
    res.json(user);
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
      where: { ID: id },
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
userRoutes.put('/user/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const {Name, Email} = req.body;
    const user = prisma.user.update({
      where: {ID:id},
      data: {
        Name,
        Email
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

    const user = await prisma.user.delete({
      where: { ID: id },
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

export default userRoutes;