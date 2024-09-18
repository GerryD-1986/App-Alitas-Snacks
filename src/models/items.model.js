import { MongoOIDCError } from "mongodb";
import mongoose from "mongoose"


const itemSchema = new mongoose.Schema({
    product: {
        type: String,
        required: true,
    },
    description:{
         type: String,
         required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    image:{
      data: Buffer,
    },
    category:{
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now,
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supervisor",
        required: true,
    }
},{
    timestamps: true
});

export default mongoose.model("Productos", itemSchema);