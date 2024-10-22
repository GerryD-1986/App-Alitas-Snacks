import Productos from "../models/items.model.js";



//obtener todos los items (Nat)
export const getListItems = async (req, res) => {
  try{
    const items = await Productos.find();
    res.json(items);
  } catch (error){
    res.status(500).json({message: "Error al obtener los productos", error})
  }
}


//crear item Nat
export const createItem = async (req, res) =>{
  console.log('Datos recibidos:', req.body);
  try{
    const { item, subsidiary, photo, price, discount, description, category, timecook, date } = req.body;
    if (!item || !price || !description || !category || !timecook ) {
      return res.status(400).json({ message: "Por favor, completa todos los campos obligatorios" });
    }
    const newItem = new Productos({
      item,
      subsidiary,
      photo,
      price,
      discount,
      description,
      category,
      timecook,
      date,
    });
    const saveItem = await newItem.save();
    res.status(201).json(saveItem); 
  } catch (error){
    console.error("Error details:", error);
    res.status(500).json({ message: "Error al crear el producto", error: error.message });
  }
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