import { Schema, model } from "mongoose";

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    desc: {
        type: String,
        required: [true, "Description is required"],
        max: 200,
    },
    img: {
        type: String,
        required: [true, "Image is required"],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
    }
}, { versionKey: false, timestamps: true });


const Ingredient = model("ingredient", ingredientSchema);

export default Ingredient;