import {Router, Request, Response} from "express";
import prisma from "../prisma/prisma";
import {generateRandomShortUrl} from '../shortnerLink/shortnerLink';

const linkRouter = Router();
linkRouter.post('/link',async (req: Request, res: Response) => {
  try {
    const {OriginalUrl,fk_UserID} = req.body;
    const ShortUrl = await generateRandomShortUrl(OriginalUrl);
    
    const url = await prisma.shortlink.create({
      data: {
        OriginalUrl: OriginalUrl,
        ShortUrl,
        fk_UserID: parseInt(fk_UserID, 10)
      }
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
linkRouter.get('/surl/:shortCode', async (req: Request, res:Response) => {
  try {
    const shortCode = (req.params.shortCode);
    const surl = await prisma.shortlink.findFirst({
      where: {ShortUrl: shortCode}
    });
    if(!surl) {
      return res.status(404).json({erro : "link nao encontrado"});
    }
    return res.redirect(surl.OriginalUrl!)
  } catch (error) {
    return res.status(500).json({erro : "nao foi possivel encontrar o link"});
  }
});

export default linkRouter;