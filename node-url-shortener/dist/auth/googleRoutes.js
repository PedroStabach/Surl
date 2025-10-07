"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
require("dotenv/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const google_auth_library_1 = require("google-auth-library");
const prisma_1 = __importDefault(require("../prisma/prisma"));
const googleRoutes = (0, express_1.Router)();
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, "http://localhost:3000/google/callback");
googleRoutes.get("/google/callback", async (req, res) => {
    try {
        const { code } = req.query;
        if (!code)
            return res.status(400).send("Code não enviado");
        //troca o code pelo token
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);
        const userInfo = await client.request({
            url: "https://www.googleapis.com/oauth2/v2/userinfo",
        });
        //pega os dados do usuario
        const userData = userInfo.data;
        //verifica se o usuario ja existe no banco
        let user = await prisma_1.default.user.findUnique({ where: { email: userData.email } });
        if (!user) {
            user = await prisma_1.default.user.create({
                data: {
                    email: userData.email,
                    name: userData.name,
                    avatar: userData.picture,
                    googleId: userData.id,
                },
            });
        }
        //cria token do app
        const appToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
        //redireciona para o front
        res.redirect(`http://localhost:5173?token=${appToken}`);
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Erro na autenticação com Google");
    }
});
exports.default = googleRoutes;
