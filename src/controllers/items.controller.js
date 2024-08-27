import Productos from "../models/items.model.js";

//obtener items
export const getItems = async (req, res) => {
  const items = await Productos.find({
    user: req.user.id
  }).populate('user');
  res.json(items);
};

//crear items
export const createItems = async (req, res) => {
const {product, description, price, category, date } = req.body;

console.log(req.user)

const newitem = new Productos({
    product,
    description,
    price,
    category,
    date,
    user: req.user.id,
});
const savedItem = await newitem.save();
res.json(savedItem);
}

//obtener un solo item
export const getItem = async (req, res) => {
  const item = await Productos.findById(req.params.id)
  if(!item) return res.status(404).json({message: "Producto no encontrado"})
  res.json(item)
}

//eliminar item
export const deleteItem = async (req, res) => {
    const item = await Productos.findByIdAndDelete(req.params.id)
    if(!item) return res.status(404).json({message: "Producto no encontrado"})
    return res.sendStatus(204);
}

//actualizar item
export const updateItems = async (req, res) => {

    const item = await Productos.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
        }
    )
    if(!item) return res.status(404).json({message: "Producto no encontrado"})
    res.json(item)
}