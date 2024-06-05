import Recipe from "../models/Recipe.js";

const recipeList = (filter = {}) => Recipe.find(filter);

const countRecipes = filter => Recipe.countDocuments(filter);

const getRecipe = filter => Recipe.findOne(filter);

export default {
  recipeList,
  countRecipes,
  getRecipe,
};
