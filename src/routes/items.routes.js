import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {getItems, getItem, createItems, updateItems, deleteItem} from "../controllers/items.controller.js";
import { get } from "mongoose";

const router = Router()

router.get("/items", authRequired, getItems)
router.get("/items/:id", authRequired,getItem)
router.post("/items", authRequired,createItems)
router.delete("/items/:id", authRequired, deleteItem)
router.put("/items/:id", authRequired, updateItems)


export default router;