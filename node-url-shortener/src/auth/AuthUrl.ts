import { Router, Request, Response } from "express";
import prisma from "../prisma/prisma";
import { authMiddleware } from "./authMiddleware"; 
import { generateRandomShortUrl } from "../shortnerLink/shortnerLink";

const authLinks = Router();

// Criar link curto
authLinks.post("/auth/url", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) return res.status(400).json({ error: "OriginalUrl é obrigatório" });

    const shortUrl = await generateRandomShortUrl(originalUrl);

    const newUrl = await prisma.shortlink.create({
      data: {
        originalUrl,
        shortUrl,
        fkUserId: req.userId!, // vem do token
      },
    });

    res.status(201).json(newUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

// Listar todos os links do usuário logado
authLinks.get("/auth/links", authMiddleware, async (req: Request, res: Response) => {
  try {
    const links = await prisma.shortlink.findMany({
      where: { fkUserId: req.userId },
    });
    res.json(links);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar links" });
  }
});

export default authLinks;
