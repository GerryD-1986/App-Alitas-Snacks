import mongoose from 'mongoose';

const insumosSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    unidadesDisponibles: { type: Number, required: true },
    inventario: { type: Number, required: true }, 
    disponible: { type: Boolean, default: true }, 
});

// Exporta el modelo como una exportación por defecto
const Insumos = mongoose.model('insumos', insumosSchema);

export default Insumos;
