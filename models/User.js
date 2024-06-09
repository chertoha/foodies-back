import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateOptions } from "./hooks.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: String,
      required: true,
    },
    favorites: {
      type: [{ type: Schema.Types.ObjectId, ref: "recipe" }],
      default: [],
    },
    recipes: {
      type: [{ type: Schema.Types.ObjectId, ref: "recipe" }],
      default: [],
    },
    followers: {
      type: [{ type: Schema.Types.ObjectId, ref: "user" }],
      default: [],
    },
    following: {
      type: [{ type: Schema.Types.ObjectId, ref: "user" }],
      default: [],
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleSaveError);
userSchema.pre("findOneAndUpdate", setUpdateOptions);
userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
