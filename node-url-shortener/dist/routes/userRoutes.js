"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt = __importStar(require("bcrypt"));
const prisma_1 = __importDefault(require("../prisma/prisma"));
const userRoutes = (0, express_1.Router)();
userRoutes.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await prisma_1.default.user.create({
            data: { name, email, password: hashedPassword, creationDate: new Date() },
        });
        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            creationDate: user.creationDate
        });
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao criar usuário" });
    }
});
userRoutes.get('/users', async (req, res) => {
    try {
        const users = await prisma_1.default.user.findMany();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ erro: "Erro ao encontrar os usuarios" });
    }
});
userRoutes.get('/user/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ erro: "ID inválido" });
        }
        const user = await prisma_1.default.user.findFirst({
            where: { id },
        });
        if (!user) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }
        res.json(user);
    }
    catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
});
userRoutes.put('/user/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, password } = req.body;
        const user = await prisma_1.default.user.update({
            where: { id },
            data: {
                name,
                password
            }
        });
        return res.json(user);
    }
    catch (error) {
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
});
userRoutes.delete('/user/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ erro: "ID inválido" });
        }
        await prisma_1.default.shortlink.deleteMany({
            where: { fkUserId: id }
        });
        const user = await prisma_1.default.user.delete({
            where: { id: id },
        });
        res.json(user);
    }
    catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.status(500).json({ erro: "Erro interno no servidor" });
    }
});
exports.default = userRoutes;
