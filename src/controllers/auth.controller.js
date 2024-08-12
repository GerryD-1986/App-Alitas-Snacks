import Usuario from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {createAccessToken} from "../libs/jwt.js"

export const register =  async (req, res) => {
    const {email,password,username} = req.body;

    try{
        const passwordHash = await bcrypt.hash(password, 10)//guardar variable de encriptado de contraseña


        const newUser = new Usuario({
            username,
            email,
            password: passwordHash,
        });
    
        //guardar usuario en mondodb
         const userSaved = await newUser.save(); //guardas el usuario
         const token = await createAccessToken({id:userSaved._id}); //creas el token
          
         res.cookie("token", token); //estableces una cookie en la respuesta
         //envias respuesta
         res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
         });
        }catch(error){
        res.status(500).json({ message: error.message });
    }
};


export const login =  async (req, res) => {
    const {email,password} = req.body;

    try{

        //buscar el usuario si existe
        const userFound = await Usuario.findOne({ email });

        //si no se encuentra el usuario que me mande el status
        if(!userFound)return res.status(400).json({message: "Usuario no encontrado"});

        //variable de coincidencia
        const isMatch = await bcrypt.compare(password, userFound.password)
         if(!isMatch)return res.status(400).json( {message: "Contraseña incorrecta"});

         const token = await createAccessToken({id:userFound._id}); 
          
         res.cookie("token", token); //estableces una cookie en la respuesta
         //envias respuesta
         res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
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
    const userFound = await Usuario.findById(req.user.id);

    if(!userFound)return res.status(400).json({message: "Usuario no encontrado"});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
    })

    res.send("profile");
}
