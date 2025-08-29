"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../User/user"));
const router = (0, express_1.Router)();
router.post('/users', (req, res) => {
    try {
        const { name, email } = req.body;
        (0, user_1.default)(name, email);
        res.status(200).json({ status: "ok" });
    }
    catch (error) {
        res.status(500).json({ erro: "Erro ao criar usuario" });
    }
});
exports.default = router;
