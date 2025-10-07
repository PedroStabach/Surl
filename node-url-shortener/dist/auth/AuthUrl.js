"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma/prisma"));
const authMiddleware_1 = require("./authMiddleware");
const shortnerLink_1 = require("../shortnerLink/shortnerLink");
const authLinks = (0, express_1.Router)();
// Criar link curto
authLinks.post("/auth/url", authMiddleware_1.authMiddleware, async (req, res) => {
    try {
        const { originalUrl } = req.body;
        if (!originalUrl)
            return res.status(400).json({ error: "OriginalUrl é obrigatório" });
        const shortUrl = await (0, shortnerLink_1.generateRandomShortUrl)(originalUrl);
        const newUrl = await prisma_1.default.shortlink.create({
            data: {
                originalUrl,
                shortUrl,
                fkUserId: req.userId, // vem do token
            },
        });
        res.status(201).json(newUrl);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
});
// Listar todos os links do usuário logado
authLinks.get("/auth/links", authMiddleware_1.authMiddleware, async (req, res) => {
    try {
        const links = await prisma_1.default.shortlink.findMany({
            where: { fkUserId: req.userId },
        });
        res.json(links);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao buscar links" });
    }
});
exports.default = authLinks;
