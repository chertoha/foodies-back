import Ingredient from "../models/Ingredient.js";

const getIngredients = (search = {}) => {
  // console.log("search >>>", search)
  const { filter, fields, settings } = search;
  return Ingredient.find(filter, fields, settings);
};

const getIngredient = filter => Ingredient.findOne(filter);

const countIngredients = filter => Ingredient.countDocuments(filter);

export default {
  getIngredients,
  getIngredient,
  countIngredients,
};
