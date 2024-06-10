import Category from "../models/Category.js";

export const getAllCategories = (search = {}) => {
  const { filter, fields, settings } = search;
  return Category.find(filter, fields, settings);
};

export const getOneCategory = filter => Category.findOne(filter);

export const countCategories = () => Category.countDocuments();
