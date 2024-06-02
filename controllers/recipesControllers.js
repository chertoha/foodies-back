
import HttpError from "../helpers/HttpError.js"

import recipesServices from "../services/recipesServices.js"

const getAllRecipe = async (req, res) => {
    const list = await recipesServices.recipeList()
    const totalRecipes = await recipesServices.countRecipes(list)

    res.json({
        total: totalRecipes,
        recepies: list
    })
}

const getOneRecipe = async (req, res) => {
    const { id: _id } = req.params;

    const responce = await recipesServices.getRecipe({ _id })

    if (!responce) {
        throw HttpError(404, "Not Found")
    }
    res.json(responce)
}


export default {
    getAllRecipe,
    getOneRecipe,
}