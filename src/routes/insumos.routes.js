import express from "express";
import { getInsumos, postInsumos, patchInsumo, deleteInsumo } from "../controllers/insumos.controller.js";

const router = express.Router();

// Ruta para obtener todos los insumos
router.get('/insumos', getInsumos);

// Ruta para crear un nuevo insumo
router.post('/insumos', postInsumos);

// Ruta para actualizar un insumo por ID
router.patch('/insumos/:id', patchInsumo);

// Ruta para eliminar un insumo por ID
router.delete('/insumos/:id', deleteInsumo);

export default router;  // exportamos el router para poder usarlo en otros archivos.
