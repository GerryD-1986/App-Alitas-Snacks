import mongoose from "mongoose";

const{
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME
} = process.env;


const URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;


export const connectDB = async () => {
    try{
     await mongoose.connect(URI);
     console.log("base de datos conectada");
    }catch(error){
     console.log(error);
    }
};