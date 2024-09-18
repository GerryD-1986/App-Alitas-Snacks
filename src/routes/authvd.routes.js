import { Router } from "express";
import {register, login, logout, profile} from "../controllers/authvd.controller.js"
import { authRequired } from "../middlewares/validateToken.js";

const router = Router()

router.post("/register-vendor", register)

router.post("/login-vendor", login)

router.post("/logout-vendor", logout)

router.get("/profile-vendor", authRequired, profile)

export default router;