"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (0, express_1.Router)();
validateToken.get("/auth/validate", async (req, res) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(401).json({ message: "Token não encontrado" });
    }
    const token = authHeader.split(" ")[1]; // remove "Bearer "
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        return res.json({ user: decoded });
    }
    catch (err) {
        return res.status(401).json({ message: "Token inválido ou expirado" });
    }
});
exports.default = validateToken;
