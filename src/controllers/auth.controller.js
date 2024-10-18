import Usuario from "../models/user.model.js"
import bcrypt from "bcryptjs"
import {createAccessToken} from "../libs/jwt.js"
import jwt from "jsonwebtoken"
import {TOKEN_SECRET} from "../secret.js"

export const register =  async (req, res) => {
    const {email,password,username, address, phone} = req.body;

    try{
const userFound = await Usuario.findOne({email})
if (userFound) return res.status(400).json(["El correo ya está en uso"])

        const passwordHash = await bcrypt.hash(password, 10)//guardar variable de encriptado de contraseña


        const newUser = new Usuario({
            username,
            email,
            password: passwordHash,
            address,
            phone,
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
            address: userSaved.address,
            phone: userSaved.phone,
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

         const token = await createAccessToken({id: userFound._id}); 
         
          
         res.cookie("token", token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            maxAge: 1000 *60 *60 //valido a una hora
         }); //estableces una cookie en la respuesta
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


export const verifyToken = async (req, res) =>{
   const {token} = req.cookies

   if(!token) return res.status(401).json({message: "No autorizado"});

   jwt.verify(token, TOKEN_SECRET,  async (err, user) => {
    if(err) return res.status(401).json({message: "No autorizado"});

    const userFound = await Usuario.findById(user.id)
    if(!userFound) return res.status(401).json({message: "No autorizado"});

    return res.json({
        id: userFound,
        username: userFound.username,
        email: userFound.email,
    })
   })

}