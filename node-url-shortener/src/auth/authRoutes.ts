import { Router } from "express";
import loginRoutes from "./loginRoutes";
import googleRoutes from "./googleRoutes";

const authRoutes = Router();

authRoutes.use(loginRoutes);
authRoutes.use(googleRoutes);
export default authRoutes;
