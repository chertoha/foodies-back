import Ingredient from "../models/Ingredient.js"

const getIngredients = (search = {}) => {
    // console.log("search >>>", search)
    const { filter, fields, settings } = search;
    return Ingredient.find(filter, fields, settings)
};

const countIngredients = filter => Ingredient.countDocuments(filter)

export default {
    getIngredients,
    countIngredients,
}