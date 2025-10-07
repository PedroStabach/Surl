"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma/prisma"));
const redirectRouter = (0, express_1.Router)();
redirectRouter.get("/:shortUrl", async (req, res) => {
    try {
        const { shortUrl } = req.params;
        const link = await prisma_1.default.shortlink.findFirst({ where: { shortUrl } });
        if (!link || !link.originalUrl) {
            return res.status(404).json({ error: "Link não encontrado" });
        }
        return res.redirect(link.originalUrl);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});
exports.default = redirectRouter;
