"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma/prisma"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = require("express");
const authLinks = (0, express_1.Router)();
function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.status(401).json({ error: "Token não fornecido" });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    }
    catch {
        return res.status(403).json({ error: "Token inválido" });
    }
}
authLinks.get('/auth/links', authMiddleware, async (req, res) => {
    const userId = req.userId; // vem do token
    const links = await prisma_1.default.shortlink.findMany({
        where: { fkUserId: userId }
    });
    return res.json(links);
});
exports.default = authLinks;
