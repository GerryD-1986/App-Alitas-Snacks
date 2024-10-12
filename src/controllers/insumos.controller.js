import Insumos from '../models/insumos.model.js';



// Ruta para obtener todos los Insumos
export const getInsumos = async (req, res) => {
    try {
        const productos = await Insumos.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Ruta para crear un nuevo Insumos
export const postInsumos = async (req, res) => {
  

    try {
        const { nombre, unidadesDisponibles, inventario, disponible } = req.body;
        const nuevoInsumos = new Insumos({ nombre, unidadesDisponibles, inventario, disponible });
        
        const newProduct = await nuevoInsumos.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

