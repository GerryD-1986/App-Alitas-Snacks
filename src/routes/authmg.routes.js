import { Router } from "express";
import {register, login, logout, profile} from "../controllers/authmg.controller.js"
import { authRequired } from "../middlewares/validateToken.js";

const router = Router()

router.post("/register-manager", register)

router.post("/login-manager", login)

router.post("/logout-manager", logout)

router.get("/profile-manager", authRequired, profile)

export default router;