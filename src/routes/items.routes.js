import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {getItems, getItem, createItems, updateItems, deleteItem} from "../controllers/items.controller.js";
import { get } from "mongoose";

const router = Router()

router.get("/items",getItems)
router.get("/items/:id",getItem)
router.post("/items", createItems)
router.delete("/items/:id",deleteItem)
router.put("/items/:id", updateItems)


export default router;