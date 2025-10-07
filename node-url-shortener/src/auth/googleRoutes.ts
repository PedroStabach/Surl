import { Router } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import prisma from "../prisma/prisma";

const googleRoutes = Router();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/google/callback"
);

googleRoutes.get("/google/callback", async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).send("Code não enviado");

    //troca o code pelo token
    const { tokens } = await client.getToken(code as string);
    client.setCredentials(tokens);

    const userInfo = await client.request({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
    });

    //pega os dados do usuario
    const userData = userInfo.data as { email: string; name: string; picture: string; id: string };

    //verifica se o usuario ja existe no banco
    let user = await prisma.user.findUnique({ where: { email: userData.email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: userData.email,
          name: userData.name,
          avatar: userData.picture,
          googleId: userData.id,
        },
      });
    }

    //cria token do app
    const appToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    //redireciona para o front
    res.redirect(`http://localhost:5173?token=${appToken}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro na autenticação com Google");
  }
});

export default googleRoutes;
