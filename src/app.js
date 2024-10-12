//importar express
import express from "express"
//importar morgan
import morgan from "morgan"
//express de los cookies, sirve para leer cualquier cookie
import cookieParser from "cookie-parser";
//importar cors , paquetes para autorizar conexiones de diferentes proxies
import cors from "cors";
//importar auth.routes
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/authad.routes.js";
import vendorRoutes from "./routes/authvd.routes.js"
import itemRoutes from "./routes/items.routes.js";
import insumosRoutes from "./routes/insumos.routes.js" //insumos

const app = express()


app.use(cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
}));
//muestra mensaje por consola por cada peticion al backend
app.use(morgan("dev"));
//interpretar el request body con formato JSON

app.use(express.json());
app.use(cookieParser())

//aplicacion quiero que utilices authRoutes
app.use("/api",authRoutes);
app.use("/api",adminRoutes);
app.use("/api", vendorRoutes);
// tambien la ruta de los items
app.use("/api",itemRoutes);

//Ruta de los insumos
app.use("/api",insumosRoutes);

export default app;