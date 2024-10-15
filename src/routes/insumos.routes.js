import express from "express";

import {getInsumos, postInsumos} from "../controllers/insumos.controller.js";

const router = express.Router();

router.get('/insumos', getInsumos)
router.post('/insumos', postInsumos)

export default router;  //exportamos el router para poder usarlo en otros archivos.  //