import jkw from "jsonwebtoken"
import {TOKEN_SECRET} from "../secret.js"

export function createAccessToken(payload){
  return new Promise((resolve, reject) =>{
    jkw.sign(
        payload,
        TOKEN_SECRET,
        {
    expiresIn: "1d", 
    },
    (err, token)=> {
    if(err)reject(err);//si hay error muestrame el error, si no muestrame el token
    resolve(token)
    });
  });
}