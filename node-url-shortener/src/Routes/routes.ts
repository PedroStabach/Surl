import {Router, Request, Response} from "express";
import prisma from "../prisma/prisma";
import {generateRandomShortUrl} from '../shortnerLink/transformerBase';
const router = Router();

//CRUD USER
router.post("/users", async (req: Request, res: Response) => {
  try {
    const { Name, Email } = req.body;
    const user = await prisma.user.create({
      data: { Name, Email, CreationDate: new Date() },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});
router.get('/users', async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        res.status(500).json({erro: "Erro ao encontrar os usuarios"});
    }
});

router.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const user = await prisma.user.findFirst({
      where: { ID: id },
    });

    if (!user) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
});
router.put('/user/:id', (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const {Name, Email} = req.body;
    const user = prisma.user.update({
      where: {ID:id},
      data: {
        Name,
        Email
      }
    });
    return res.json(user);
  } catch (error) {

  }
});
router.delete('/user/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ erro: "ID inválido" });
    }

    const user = await prisma.user.delete({
      where: { ID: id },
    });

    if (!user) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ erro: "Erro interno no servidor" });
  }
});


//CRUD link
router.post('/link',async (req: Request, res: Response) => {
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
router.get('/link', async (req: Request, res: Response) => {
    try {
        const links = await prisma.shortlink.findMany();
        return res.json(links)
    } catch (error) {
      return res.status(500).json({erro : "nao foi possivel encontrar os links"})
    } 
});
router.get('/surl/:shortCode', async (req: Request, res:Response) => {
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
export default router;