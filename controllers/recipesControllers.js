import HttpError from "../helpers/HttpError.js";

import controllerWrapper from "../decorators/controllerWrapper.js"

import recipesServices from "../services/recipesServices.js";
import ingredientsServices from "../services/ingredientsServices.js";


const getRecipes = async (req, res) => {
  const { page = 1, limit = 10, category = "", area = "", ingredient: ingredientName = "", } = req.query;

  const ingredient = await ingredientsServices.getOneIngredient({ name: ingredientName });

  const filter = {
    ...(category && { category }), ...(area && { area }), ...(ingredient && { ingredients: { $elemMatch: { id: ingredient.id } } })
  };

  const fields = "-createdAt -updatedAt";
  const skip = (page - 1) * limit;
  const settings = { skip, limit };

  const result = await recipesServices.getRecipeList({ filter, fields, settings });
  const totalRecipes = await recipesServices.countRecipes(filter);

  res.json({
    total: totalRecipes,
    page: Number(page),
    recepies: result,
  });
};


const getOneRecipe = async (req, res) => {
  const { id: _id } = req.params;

  const recipe = await recipesServices.getRecipe({ _id });

  if (!recipe) {
    throw HttpError(404, "Not Found");
  }
  res.json(recipe);
};

const createRecipe = async (req, res) => {
  console.log(req.body)

  const newRecipe = await recipesServices.addRecipe(req.body);
  res.status(201).json(newRecipe)
}

const deleteRecipe = async (req, res) => {
  const { id: _id } = req.params;

  const responce = await recipesServices.removeRecipe({ _id });
  if (!responce) {
    throw HttpError(404, "Not found")
  }

  res.status(201).json(responce)
}

const updateStatus = async (req, res) => {
  const { id: _id } = req.params;

  const responce = await recipesServices.updateRecipeStatus({ _id }, req.body)
  res.status(200).json(responce)
}

export default {
  getRecipes: controllerWrapper(getRecipes),
  getOneRecipe: controllerWrapper(getOneRecipe),
  createRecipe: controllerWrapper(createRecipe),
  deleteRecipe: controllerWrapper(deleteRecipe),
  updateStatus: controllerWrapper(updateStatus),
};