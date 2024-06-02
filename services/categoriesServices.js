import Category from "../models/Category.js";

export const getAllCategories = () => Category.find();
