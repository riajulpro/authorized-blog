import { Router } from "express";
import { AuthRoutes } from "../modules/user/user.routes";

const router = Router();

router.use("/auth", AuthRoutes);

export default router;
