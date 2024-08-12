import mongoose from "mongoose";

const managSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
},{
    timestamps: true
})

export default mongoose.model("Supervisor", managSchema);