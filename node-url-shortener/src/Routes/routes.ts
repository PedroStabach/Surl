import {Router} from "express";
import userRoutes from './userRoutes';
import linkRouter from "./linkRoutes";
import authRoutes from "../auth/authRoutes";

const router = Router();

//CRUD USER
router.use(userRoutes);
//CRUD LINK
router.use(linkRouter);
//AUTH
router.use(authRoutes)

export default router;