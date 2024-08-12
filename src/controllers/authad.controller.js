import Administrador from "../models/admin.model.js"
import bcrypt from "bcryptjs"
import { createAccessToken } from "../libs/jwt.js";

export const register =  async (req, res) => {
    const {email,password,username} = req.body;

    try{
        const passwordHash = await bcrypt.hash(password, 10)//guardar variable de encriptado de contraseña


        const newAdmin = new Administrador({
            username,
            email,
            password: passwordHash,
        });
    
        //guardar usuario en mondodb
         const adminSaved = await newAdmin.save(); //guardas el usuario
         const token = await createAccessToken({id:adminSaved._id}); //creas el token
          
         res.cookie("token", token); //estableces una cookie en la respuesta
         //envias respuesta
         res.json({
            id: adminSaved._id,
            username: adminSaved.username,
            email: adminSaved.email,
            createdAt: adminSaved.createdAt,
            updatedAt: adminSaved.updatedAt,
         });
        }catch(error){
        res.status(500).json({ message: error.message });
    }
};


export const login =  async (req, res) => {
    const {email,password} = req.body;

    try{

        //buscar el usuario si existe
        const adminFound = await Administrador.findOne({ email });

        //si no se encuentra el usuario que me mande el status
        if(!adminFound)return res.status(400).json({message: "Usuario no encontrado"});

        //variable de coincidencia
        const isMatch = await bcrypt.compare(password, adminFound.password)
         if(!isMatch)return res.status(400).json( {message: "Contraseña incorrecta"});

         const token = await createAccessToken({id:adminFound._id}); 
          
         res.cookie("token", token); //estableces una cookie en la respuesta
         //envias respuesta
         res.json({
            id: adminFound._id,
            username: adminFound.username,
            email: adminFound.email,
            createdAt: adminFound.createdAt,
            updatedAt: adminFound.updatedAt,
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
    const adminFound = await Administrador.findById(req.user.id);

    if(!adminFound)return res.status(400).json({message: "Usuario no encontrado"});

    return res.json({
        id: adminFound._id,
        username: adminFound.username,
        email: adminFound.email,
        createdAt: adminFound.createdAt,
        updatedAt: adminFound.updatedAt,
    })

    res.send("profile");
}