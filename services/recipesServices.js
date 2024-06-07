import Recipe from "../models/Recipe.js";

const getRecipeList = (search = {}) => {
    const { filter, fields, settings } = search;
    console.log("getRecipeList search >>>", search)
    return Recipe.find(filter, fields, settings)
};

const countRecipes = filter => Recipe.countDocuments(filter);

const getRecipe = filter => Recipe.findOne(filter);

const addRecipe = data => Recipe.create(data);

const removeRecipe = data => Recipe.findOneAndDelete(data);

const updateRecipeStatus = (filter, body) => Recipe.findOneAndUpdate(filter, body);


export default {
    getRecipeList,
    countRecipes,
    getRecipe,
    addRecipe,
    removeRecipe,
    updateRecipeStatus,
};