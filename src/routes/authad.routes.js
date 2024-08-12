import { Router } from "express";
import {login, register, logout, profile} from "../controllers/authad.controller.js"
import { authRequired } from "../middlewares/validateToken.js";

const router = Router()

router.post("/register-admin", register)

router.post("/login-admin", login)

router.post("/logout-admin", logout)

router.get("/profile-admin", authRequired, profile)

export default router;