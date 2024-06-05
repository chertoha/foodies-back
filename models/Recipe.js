import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateOptions } from "../models/hooks.js"

const recipeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  category: {
    type: String,
    required: [true, "Category is required"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  area: {
    type: String,
    required: [true, "Aria is required"],
  },
  instructions: {
    type: String,
    required: [true, "Instructions is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  thumb: {
    type: String,
    default: null,
  },
  time: {
    type: String,
    required: [true, "Time is required"],
  },
  ingredients: {
    type: Schema.Types.Array,
  },
}, { versionKey: false, timestamps: true });

recipeSchema.post("save", handleSaveError);

recipeSchema.pre("findOneAndUpdate", setUpdateOptions);


const Recipe = model("recipe", recipeSchema);

export default Recipe;
