import { Router } from "express";
import jwt from "jsonwebtoken";

const validateToken = Router();

validateToken.get("auth/validate", async (req,res) => {
    const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "Token não encontrado" });
  }

  // Pega só o token (remove o "Bearer ")
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return res.json({ user: decoded });
  } catch (err) {
    return res.status(401).json({ message: "Token inválido ou expirado" });
  }
});

export default validateToken;