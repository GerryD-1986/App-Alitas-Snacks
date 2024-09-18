import Supervisor from "../models/vendor.model.js"
import bcrypt from "bcryptjs"
import { createAccessToken } from "../libs/jwt.js"

export const register =  async (req, res) => {
    const {email,password,username} = req.body;

    try{
        const passwordHash = await bcrypt.hash(password, 10)//guardar variable de encriptado de contraseña


        const newVendor = new Vendedor({
            username,
            email,
            password: passwordHash,
        });
    
        //guardar usuario en mondodb
         const vendorSaved = await newVendor.save(); //guardas el usuario
         const token = await createAccessToken({id:vendorSaved._id}); //creas el token
          
         res.cookie("token", token); //estableces una cookie en la respuesta
         //envias respuesta
         res.json({
            id: vendorSaved,      
            username: vendorSaved.username,
            email: vendorSaved.email,
            createdAt: vendorSaved.createdAt,
            updatedAt: vendorSaved.updatedAt,
         });
        }catch(error){
        res.status(500).json({ message: error.message });
    }
};


export const login =  async (req, res) => {
    const {email,password} = req.body;

    try{

        //buscar el usuario si existe
        const vendorFound = await Vendedor.findOne({ email });

        //si no se encuentra el usuario que me mande el status
        if(!vendorFound)return res.status(400).json({message: "Usuario no encontrado"});

        //variable de coincidencia
        const isMatch = await bcrypt.compare(password, vendorFound.password)
         if(!isMatch)return res.status(400).json( {message: "Contraseña incorrecta"});

         const token = await createAccessToken({id:vendorFound._id}); 
          
         res.cookie("token", token); //estableces una cookie en la respuesta
         //envias respuesta
         res.json({
            id: vendorFound._id,
            username: vendorFound.username,
            email: vendorFound.email,
            createdAt: vendorFound.createdAt,
            updatedAt: vendorFound.updatedAt,
         });
        }catch(error){
        res.status(500).json({ message: error.message });
    }
};

export const logout = (req, res) =>{
    res.cookie("token", "",{
        expires: new Date(0),
    });
    return res.sendStatus(200)
};

export const profile = async (req,res) =>{
    const vendorFound = await Vendedor.findById(req.user.id);

    if(!vendorFound)return res.status(400).json({message: "Usuario no encontrado"});

    return res.json({
        id: vendorFound._id,
        username: vendorFound.username,
        email: vendorFound.email,
        createdAt: vendorFound.createdAt,
        updatedAt: vendorFound.updatedAt,
    })

    res.send("profile");
}
