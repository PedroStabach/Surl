"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma/prisma"));
const shortnerLink_1 = require("../shortnerLink/shortnerLink");
const linkRouter = (0, express_1.Router)();
linkRouter.post('/link', async (req, res) => {
    try {
        const { originalUrl, fkUserId } = req.body;
        const shortUrl = await (0, shortnerLink_1.generateRandomShortUrl)(originalUrl);
        const url = await prisma_1.default.shortlink.create({
            data: {
                originalUrl,
                shortUrl,
                fkUserId
            }
        });
        return res.json(url);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ erro: "nao foi possivel criar o link" });
    }
});
linkRouter.get('/link', async (req, res) => {
    try {
        const links = await prisma_1.default.shortlink.findMany();
        return res.json(links);
    }
    catch (error) {
        return res.status(500).json({ erro: "nao foi possivel encontrar os links" });
    }
});
linkRouter.get('/:shortCode', async (req, res) => {
    try {
        const shortCode = (req.params.shortCode);
        const surl = await prisma_1.default.shortlink.findFirst({
            where: { shortUrl: shortCode }
        });
        if (!surl) {
            return res.status(404).json({ erro: "link nao encontrado" });
        }
        return res.redirect(surl.originalUrl);
    }
    catch (error) {
        return res.status(500).json({ erro: "nao foi possivel encontrar o link" });
    }
});
linkRouter.delete('/:shortCode', async (req, res) => {
    try {
        const shortCode = req.params.shortCode;
        if (!(shortCode)) {
            return res.status(400).json({ erro: "ID inválido" });
        }
        const link = await prisma_1.default.shortlink.delete({
            where: { shortUrl: shortCode }
        });
        return res.json(link);
    }
    catch (e) {
        return res.status(500).json({ erro: "nao foi possivel apagar o link" });
    }
});
exports.default = linkRouter;
