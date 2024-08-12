import jwt from "jsonwebtoken"
import {TOKEN_SECRET} from "../secret.js"

export const authRequired = (req, res, next) =>{
  const {token} = req.cookies;
  
  if(!token)return res.status(401).json({message: "NO hay token, sin acceso"});
  jwt.verify(token, TOKEN_SECRET, (err, user)=>{
    if(err) return res.status(403).json({message: "token invalido"});
    req.user = user;
    next();
  })

}