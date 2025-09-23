import { Router } from "express";
import loginRoutes from "./login";
import googleRoutes from "./google";

const authRoutes = Router();

authRoutes.use(loginRoutes);
authRoutes.use(googleRoutes);

export default authRoutes;
