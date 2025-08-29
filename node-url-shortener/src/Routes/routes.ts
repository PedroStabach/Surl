import {Router, Request, Response} from "express";
import prisma from "../prisma/prisma";
const router = Router();

router.get("/", (req: Request, res: Response) => {
    res.send("API is running");
});

router.post("/users", async (req: Request, res: Response) => {
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

router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({erro: "Erro ao criar usuario"});
    }
});
export default router;