import { Router } from "express";
import loginRoutes from "./loginRoutes";
import googleRoutes from "./googleRoutes";
import validateToken from "./validateTokenRoute";
import authGoogle from "./authGoogle";

const authRoutes = Router();

authRoutes.use(loginRoutes);
authRoutes.use(googleRoutes);
authRoutes.use(validateToken);
authRoutes.use(authGoogle);
export default authRoutes;
