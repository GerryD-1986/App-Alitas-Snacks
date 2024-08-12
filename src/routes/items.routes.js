import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router()

router.get("/items", authRequired, (req, res) => res.send("items"))

export default router;