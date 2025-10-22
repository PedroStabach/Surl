import prisma from "../prisma/prisma";
import jwt from "jsonwebtoken";
import { Router, Request, Response, NextFunction } from "express";

const authLinks = Router();

function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token não fornecido" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(403).json({ error: "Token inválido" });
  }
}
authLinks.get('/auth/links', authMiddleware, async (req, res) => {
    const userId = req.userId; // vem do token
    const links = await prisma.shortlink.findMany({
        where: { fkUserId: userId }
    });
    return res.json(links);
});

export default authLinks;