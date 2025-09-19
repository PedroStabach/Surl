import {Router, Request, Response} from "express";
import * as bcrypt from "bcrypt";
import prisma from "../prisma/prisma";
const userRoutes = Router();

userRoutes.post('/users', async (req: Request, res: Response) => {
  try {
    const { Name, Email, Password } = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(Password, saltRounds);
    const user = await prisma.user.create({
      data: { Name, Email, Password: hashedPassword, CreationDate: new Date() },
    });
    res.json({
      ID: user.ID,
      Name: user.Name,
      Email: user.Email,
      Password: user.Password,
      CreationDate: user.CreationDate
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
userRoutes.put('/user/:ID', async (req: Request, res: Response) => {
  try {
    const ID = parseInt(req.params.ID);
    const {Name, Password} = req.body;
    const user = await prisma.user.update({
      where: {ID},
      data: {
        Name,
        Password
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
        where: {fk_UserID: id}
    })
    const user = await prisma.user.delete({
      where: { ID: id },
    });
    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
});

export default userRoutes;