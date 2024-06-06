import Ingredient from "../models/Ingredient.js"


const getOneIngredient = (filter) => Ingredient.findOne(filter);

const getIngredients = (search = {}) => {
    const { filter = {}, fields = "", settings = {} } = search;
    return Ingredient.find(filter, fields, settings)
};

const countIngredients = filter => Ingredient.countDocuments(filter);

export default {
    getOneIngredient,
    getIngredients,
    countIngredients,
}