import {Router, Request, Response} from "express";
import prisma from "../prisma/prisma";
const router = Router();

router.post("/users", async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    const user = await prisma.user.create({
      data: { name, email, creationDate: new Date() },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

router.get('/users', (req: Request, res: Response) => {
    try {

    } catch (error) {
        res.status(500).json({erro: "Erro ao criar usuario"});
    }
});
export default router;