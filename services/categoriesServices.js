import Category from "../models/Category.js";

export const getAllCategories = () => Category.find();


export const getOneCategory = filter => Category.findOne(filter);