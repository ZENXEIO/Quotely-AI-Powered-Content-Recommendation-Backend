import { Router } from "express";
import { UserRegister, UserLogin } from "../controllers/user.controller.js";
import { VerifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/user/register").post(UserRegister);
router.route("/user/Login").post(VerifyJWT, UserLogin);

export default router;
