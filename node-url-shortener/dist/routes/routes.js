"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma/prisma"));
const router = (0, express_1.Router)();
router.post("/users", async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await prisma_1.default.user.create({
            data: { name, email, creationDate: new Date() },
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
});
router.get('/users', (req, res) => {
    try {
    }
    catch (error) {
        res.status(500).json({ erro: "Erro ao criar usuario" });
    }
});
exports.default = router;
