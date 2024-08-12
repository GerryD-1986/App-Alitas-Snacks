import Supervisor from "../models/manager.model.js"
import bcrypt from "bcryptjs"
import { createAccessToken } from "../libs/jwt.js"

export const register =  async (req, res) => {
    const {email,password,username} = req.body;

    try{
        const passwordHash = await bcrypt.hash(password, 10)//guardar variable de encriptado de contraseña


        const newManager = new Supervisor({
            username,
            email,
            password: passwordHash,
        });
    
        //guardar usuario en mondodb
         const managerSaved = await newManager.save(); //guardas el usuario
         const token = await createAccessToken({id:managerSaved._id}); //creas el token
          
         res.cookie("token", token); //estableces una cookie en la respuesta
         //envias respuesta
         res.json({
            id: managerSaved._id,
            username: managerSaved.username,
            email: managerSaved.email,
            createdAt: managerSaved.createdAt,
            updatedAt: managerSaved.updatedAt,
         });
        }catch(error){
        res.status(500).json({ message: error.message });
    }
};


export const login =  async (req, res) => {
    const {email,password} = req.body;

    try{

        //buscar el usuario si existe
        const managerFound = await Supervisor.findOne({ email });

        //si no se encuentra el usuario que me mande el status
        if(!managerFound)return res.status(400).json({message: "Usuario no encontrado"});

        //variable de coincidencia
        const isMatch = await bcrypt.compare(password, managerFound.password)
         if(!isMatch)return res.status(400).json( {message: "Contraseña incorrecta"});

         const token = await createAccessToken({id:managerFound._id}); 
          
         res.cookie("token", token); //estableces una cookie en la respuesta
         //envias respuesta
         res.json({
            id: managerFound._id,
            username: managerFound.username,
            email: managerFound.email,
            createdAt: managerFound.createdAt,
            updatedAt: managerFound.updatedAt,
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
    const managerFound = await Supervisor.findById(req.user.id);

    if(!managerFound)return res.status(400).json({message: "Usuario no encontrado"});

    return res.json({
        id: managerFound._id,
        username: managerFound.username,
        email: managerFound.email,
        createdAt: managerFound.createdAt,
        updatedAt: managerFound.updatedAt,
    })

    res.send("profile");
}
