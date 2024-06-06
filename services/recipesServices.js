import Recipe from "../models/Recipe.js";

const getRecipeList = (search = {}) => {
  const { filter, fields, settings } = search;
  return Recipe.find(filter, fields, settings);
};

const countRecipes = filter => Recipe.countDocuments(filter);

const getRecipe = filter => Recipe.findOne(filter);

export default {
  getRecipeList,
  countRecipes,
  getRecipe,
};
