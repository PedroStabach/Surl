import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma";

const authGoogle = Router();

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/google/callback" // mesmo redirectUri do frontend
);

authGoogle.post("/auth/google", async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ error: "Code não enviado" });

    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    const userInfo = await client.request({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
    });

    const userData = userInfo.data as { email: string; name: string; picture: string; id: string };

    let user = await prisma.user.findUnique({ where: { Email: userData.email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          Email: userData.email,
          Name: userData.name,
          avatar: userData.picture,
          googleId: userData.id,
        },
      });
    }

    const appToken = jwt.sign(
      { id: user.ID, email: user.Email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    );

    res.json({ token: appToken, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro na autenticação com Google" });
  }
});

export default authGoogle;
