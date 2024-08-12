import dotenv from "dotenv/config";
import app from "./app.js"

import {connectDB} from "./db.js"

const PORT = process.env.PORT || 5000;


//escuchar por puerto 5000 o puede ser cualquier puerto
connectDB()
.then(() =>{
    app.listen(PORT, () =>{

        console.log(`servidor corriendo por puerto: ${PORT}`)
    });
})
.catch((error) =>{
    console.error("error de conexión:" , error);
});