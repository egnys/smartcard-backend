import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
    },
    translation: {
        type: String,
        required: true,
    },
    imageUrl: String,
    learningRate: {
        type: Number,
        default: 0,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {
    timeStamps: true,
})

export default mongoose.model("Card", CardSchema)