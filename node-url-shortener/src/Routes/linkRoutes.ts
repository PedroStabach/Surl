import {Router, Request, Response, response} from "express";
import prisma from "../prisma/prisma";
import {generateRandomShortUrl} from '../shortnerLink/shortnerLink';

const linkRouter = Router();
linkRouter.post('/link',async (req: Request, res: Response) => {
  try {
    const {originalUrl,fkUserId} = req.body;
    const shortUrl = await generateRandomShortUrl(originalUrl);
    
    const url = await prisma.shortlink.create({
      data: {
        originalUrl,
        shortUrl,
        fkUserId      }
    });
    return res.json(url);
  } catch (error) {
    console.error(error);
    res.status(500).json({erro : "nao foi possivel criar o link"})
  }
});
linkRouter.get('/link', async (req: Request, res: Response) => {
    try {
        const links = await prisma.shortlink.findMany();
        return res.json(links)
    } catch (error) {
      return res.status(500).json({erro : "nao foi possivel encontrar os links"})
    } 
});
linkRouter.get('/:shortCode', async (req: Request, res:Response) => {
  try {
    const shortCode = (req.params.shortCode);
    const surl = await prisma.shortlink.findFirst({
      where: {shortUrl: shortCode}
    });
    if(!surl) {
      return res.status(404).json({erro : "link nao encontrado"});
    }
    return res.redirect(surl.originalUrl!)
  } catch (error) {
    return res.status(500).json({erro : "nao foi possivel encontrar o link"});
  }
});
linkRouter.delete('/:shortCode', async (req : Request, res : Response) => {
  try {
    const shortCode = req.params.shortCode;
    if (!(shortCode)) {
      return res.status(400).json({ erro: "ID inválido" });
    }
    const link = await prisma.shortlink.delete({
      where : {shortUrl : shortCode}
    })
    return res.json(link);
  } catch (e) {
    return res.status(500).json({erro : "nao foi possivel apagar o link"});
  }
});
export default linkRouter;