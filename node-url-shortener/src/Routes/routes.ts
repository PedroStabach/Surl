import {Router, Request, Response} from "express";
import create from "../User/user";
const router = Router();

router.post('/users', (req: Request, res: Response) => {
    try {
        const {name, email} = req.body;
        create(name, email);

        res.status(200).json({status: "ok"})
    } catch (error) {
        res.status(500).json({erro: "Erro ao criar usuario"});
    }
});

export default router;