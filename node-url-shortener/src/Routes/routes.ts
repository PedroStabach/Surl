import {Router} from "express";
import userRoutes from './userRoutes';
import linkRouter from "./linkRoutes";
const router = Router();

//CRUD USER
router.use(userRoutes);
//CRUD LINK
router.use(linkRouter);
export default router;