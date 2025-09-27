import { Router } from "express";
import loginRoutes from "./loginRoutes";
import googleRoutes from "./googleRoutes";
import validateToken from "./validateTokenRoute";

const authRoutes = Router();

authRoutes.use(loginRoutes);
authRoutes.use(googleRoutes);
authRoutes.use(validateToken);

export default authRoutes;
