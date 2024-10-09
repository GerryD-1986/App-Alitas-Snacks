const express = require('express');
const router = express.Router();
const Producto = require('../models/insumos.model');

// Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
    const { nombre, unidadesDisponibles, inventario, disponible } = req.body;
    const nuevoProducto = new Producto({ nombre, unidadesDisponibles, inventario, disponible });

    try {
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, unidadesDisponibles, inventario, disponible } = req.body;

    try {
        const productoActualizado = await Producto.findByIdAndUpdate(id, { nombre, unidadesDisponibles, inventario, disponible }, { new: true });
        res.json(productoActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Producto.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
