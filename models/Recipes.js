import { Schema, model } from "mongoose";

const recipesSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    category: {
        type: String,
        required: [true, "Title is required"],
    },
    owner: {
        type: Schema.Types.ObjectId,
        default: null,
    },
    area: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: null,
    },
    thumb: {
        type: String,
        default: null,
    },
    time: {
        type: String,
        required: true,
    },
    ingredients: {
        type: Schema.Types.Array,
    }
})

const Recipe = model("recipe", recipesSchema)

export default Recipe;
