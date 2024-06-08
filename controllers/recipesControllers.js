import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../decorators/controllerWrapper.js"

import recipesServices from "../services/recipesServices.js";
import ingredientsServices from "../services/ingredientsServices.js";
import usersServices from "../services/usersServices.js";
import { getOneArea } from "../services/areasServices.js";
import { getOneCategory } from "../services/categoriesServices.js"

import fs from "fs/promises"
import path from "path";

const avatarPath = path.resolve("public", "photos")


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

const getOwnRecipes = async (req, res) => {
  const { _id: owner } = req.user;

  const filter = { owner };
  const fields = "";

  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const settings = { skip, limit }

  const result = await recipesServices.getRecipeList({ filter, fields, settings, });
  const total = await recipesServices.countRecipes(filter);

  if (!result) {
    throw HttpError(404, "Not Found")
  }

  res.json({
    total,
    page: Number(page),
    result: result
  })
}


const getOneRecipe = async (req, res) => {
  const { id: _id } = req.params;

  const recipe = await recipesServices.getRecipe({ _id });

  if (!recipe) {
    throw HttpError(404, "Not Found");
  }
  res.json(recipe);
};


const createRecipe = async (req, res) => {
  const { _id: owner } = req.user;

  if (!req.file) {
    throw HttpError(400, "Photo is required for create a new recipe")
  }
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join("photos", filename);

  const { area, category, ingredients } = req.body;
  const arrayIngredientName = ingredients.map(item => item.name);

  const findArea = await getOneArea({ name: area })
  if (!findArea) {
    throw HttpError(400, `area ${area} not found`);
  }

  const findCategory = await getOneCategory({ name: category })
  if (!findCategory) {
    throw HttpError(400, `category ${category} not found`)
  }

  const findIngredients = await ingredientsServices.getIngredients({ filter: { name: { "$in": arrayIngredientName } } })
  if (arrayIngredientName.length !== findIngredients.length) {
    throw HttpError(400, `${arrayIngredientName} not found`)
  }

  console.log("measure >>>", ingredients)
  console.log("findIngredients >>>", findIngredients)


  const result = findIngredients.map((item) => {
    return { _id: item._id }
  })
  console.log("result >>>", result)

  const newRecipe = {
    ...req.body,
    area: findArea.name,
    category: findCategory.name,
    ingredients: {},
    owner,
    thumb: avatarURL
  }

  // const result = await recipesServices.addRecipe({ ...req.body, owner, thumb: avatarURL });
  // await usersServices.updateUserById(owner, { $push: { recipes: result._id } });

  res.status(201).json(newRecipe);
};





const deleteRecipe = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;

  const response = await recipesServices.removeRecipe({ _id, owner });
  if (!response) {
    throw HttpError(404, "Not found");
  }  // Можливо потрібно уточнювати текст помилки, видалити можна тількі свій рецепт?!


  await usersServices.updateUserById(owner, { $pull: { recipe: _id } });

  // додати видалення рецепту з favorites інших користувачив

  res.json(response);
};


const addToFavorites = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;

  const user = await usersServices.findUser({ _id: owner })

  if (user.favorites.includes(_id)) {
    throw HttpError(409, "Already in favorites")
  }

  await usersServices.updateUserById(owner, { $push: { favorites: _id } }) // додавати {recipe: id} замість id ???
  await recipesServices.updateRecipeFavorite({ _id }, { $inc: { favorite: +1 } })

  res.json({ message: "Added to favorites" });
};


const removeFromFavorites = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: owner } = req.user;

  const user = await usersServices.findUser({ _id: owner });

  if (!user.favorites.includes(_id)) {
    throw HttpError(404, "Not found");
  }

  await usersServices.updateUserById(owner, { $pull: { favorites: _id } });
  await recipesServices.updateRecipeFavorite({ _id }, { $inc: { favorite: -1 } })

  res.json({ message: "Remove from favorites" });
};


export default {
  getRecipes: controllerWrapper(getRecipes),
  getOwnRecipes: controllerWrapper(getOwnRecipes),
  getOneRecipe: controllerWrapper(getOneRecipe),
  createRecipe: controllerWrapper(createRecipe),
  deleteRecipe: controllerWrapper(deleteRecipe),
  addToFavorites: controllerWrapper(addToFavorites),
  removeFromFavorites: controllerWrapper(removeFromFavorites),
};