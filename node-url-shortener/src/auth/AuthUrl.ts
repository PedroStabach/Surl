import { Router, Request, Response, NextFunction } from "express";
import prisma from "../prisma/prisma";
import jwt, { JwtPayload } from "jsonwebtoken";
import { generateRandomShortUrl } from "../shortnerLink/shortnerLink";

// extendendo o Request
declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const AuthUrl = Router();

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token não fornecido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(403).json({ error: "Token inválido" });
  }
}

AuthUrl.post("/auth/url", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { OriginalUrl } = req.body;
    if (!OriginalUrl) {
      return res.status(400).json({ error: "OriginalUrl é obrigatório" });
    }
    const ShortUrl = await generateRandomShortUrl(OriginalUrl);

    const newUrl = await prisma.shortlink.create({
      data: {
        OriginalUrl,
        ShortUrl,
        fk_UserID: req.userId!, // `!` porque sabemos que veio do token
      },
    });

    return res.status(201).json(newUrl);
  } catch (err) {
    console.error("Erro ao criar URL:", err);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default AuthUrl;
