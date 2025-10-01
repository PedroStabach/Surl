import { Router } from "express";
import loginRoutes from "./loginRoutes";
import googleRoutes from "./googleRoutes";
import validateToken from "./validateTokenRoute";
import authGoogle from "./authGoogle";
import AuthUrl from "./AuthUrl";
import authLinks from "./authYourLinks";

const authRoutes = Router();

authRoutes.use(loginRoutes);
authRoutes.use(googleRoutes);
authRoutes.use(validateToken);
authRoutes.use(authGoogle);
authRoutes.use(AuthUrl);
authRoutes.use(authLinks);
export default authRoutes;
