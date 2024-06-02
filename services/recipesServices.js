import Recipe from "../models/Recipes.js"

const recipeList = () => Recipe.find()

const countRecipes = filter => Recipe.countDocuments(filter)

const getRecipe = filter => Recipe.findOne(filter)

export default {
    recipeList,
    countRecipes,
    getRecipe,
}