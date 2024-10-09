const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    unidadesDisponibles: { type: Number, required: true },
    inventario: { type: Number, required: true }, 
    disponible: { type: Boolean, default: true }, 
});

module.exports = mongoose.model('Producto', productoSchema);
