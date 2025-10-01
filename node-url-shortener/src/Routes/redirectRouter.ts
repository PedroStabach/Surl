import { Router, Request, Response } from "express";
import prisma from "../prisma/prisma";

const redirectRouter = Router();

redirectRouter.get("/:shortUrl", async (req: Request, res: Response) => {
    try {
        const { shortUrl } = req.params;

        const link = await prisma.shortlink.findFirst({
            where: { ShortUrl: shortUrl }
        });

        if (!link) {
            return res.status(404).json({ error: "Link não encontrado" });
        }

        // redireciona para o link original
        if (!link || !link.OriginalUrl) {
            return res.status(404).json({ error: "Link não encontrado" });
        }
        return res.redirect(link.OriginalUrl);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
    }
});

export default redirectRouter;
