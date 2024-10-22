import app from "./app.js"

import {connectDB} from "./db.js"

const IP = process.env.IP || '127.0.0.1';
const PORT = process.env.PORT || 5000;


//escuchar por puerto 5000 o puede ser cualquier puerto
connectDB()
.then(() =>{
    app.listen(PORT, IP, () =>{

        console.log(`servidor corriendo por direccion y puerto: ${IP}:${PORT}`)
    });
})
.catch((error) =>{
    console.error("error de conexión:" , error);
});