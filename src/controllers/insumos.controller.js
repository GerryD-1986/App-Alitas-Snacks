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
    console.log('cuerpo de la solicitud:', req.body);
    try {
        const { nombre, unidadesDisponibles, inventario, disponible } = req.body;
        const nuevoInsumos = new Insumos({ nombre, unidadesDisponibles, inventario, disponible });
        const newProduct = await nuevoInsumos.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Ruta para editar un Insumo por ID
export const putInsumo = async (req, res) => {
    try {
        const { id } = req.params;
        const insumoActualizado = await Insumos.findByIdAndUpdate(id, req.body, { new: true });

        if (!insumoActualizado) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }

        res.json({
            success: true,
            message: 'Insumo actualizado correctamente',
            data: insumoActualizado
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el insumo',
            error: error.message
        });
    }
};

// Ruta para eliminar un insumo por ID
export const deleteInsumo = async (req, res) => {
    const { id } = req.params; // Obtener ID de la ruta

    try {
        const deletedInsumo = await Insumos.findByIdAndDelete(id);
        if (!deletedInsumo) {
            return res.status(404).json({ message: 'Insumo no encontrado' });
        }
        res.status(200).json({ message: 'Insumo eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

