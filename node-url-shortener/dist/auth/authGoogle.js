"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../prisma/prisma"));
const authGoogle = (0, express_1.Router)();
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, "http://localhost:3000/google/callback" // mesmo redirectUri do frontend
);
authGoogle.post("/auth/google", async (req, res) => {
    try {
        const { code } = req.body;
        if (!code)
            return res.status(400).json({ error: "Code não enviado" });
        const { tokens } = await client.getToken(code);
        client.setCredentials(tokens);
        const userInfo = await client.request({
            url: "https://www.googleapis.com/oauth2/v2/userinfo",
        });
        const userData = userInfo.data;
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
        const appToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.json({ token: appToken, user });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro na autenticação com Google" });
    }
});
exports.default = authGoogle;
