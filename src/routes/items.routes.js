import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createItem, getItem, updateItems, deleteItem, getListItems} from "../controllers/items.controller.js";
import { get } from "mongoose";

const router = Router()

//router.get("/items", authRequired  , getItems)
router.get("/items/:id",getItem)
//router.post("/items", authRequired,createItems)
router.delete("/items/:id", deleteItem)
router.put("/items/:id", updateItems)
 
//Nat
router.get("/items", getListItems);
router.post("/item", createItem);

export default router;

 