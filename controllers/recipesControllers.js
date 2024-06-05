import HttpError from "../helpers/HttpError.js";

import controllerWrapper from "../decorators/controllerWrapper.js";

import recipesServices from "../services/recipesServices.js";
import ingredientsServices from "../services/ingredientsServices.js";

const getRecipes = async (req, res) => {
  // const { page = 1, limit = 10, category, area, ingredients: name } = req.query;
  const {
    page = 1,
    limit = 10,
    category = "",
    area = "",
    ingredient: ingredientName = "",
  } = req.query;

  // const filter = {
  //   ...(category ? { category } : {}),
  //   ...(area ? { area } : {}),
  //   ...(name ? { name } : {}),
  // };

  // const filter = { category, area };
  // console.log(filter);
  const fields = "-createdAt -updatedAt";
  const skip = (page - 1) * limit;
  const settings = { skip, limit };

  // const getIngredients = await ingredientsServices.getIngredients({ filter, fields, settings });

  const ingredient = await ingredientsServices.getIngredient({ name: ingredientName });

  // console.log(ingredient);
  // if (getIngredients.length === 0) {
  //   throw HttpError(404, `Sorry, we not find any recipe with ${name} ingredient`);
  // }

  // const { _id: owner } = getIngredients[0];
  // const updatedFilter = { owner, ...filter };

  // const list = await recipesServices.getRecipeList({ updatedFilter, fields, settings });
  // const totalRecipes = await recipesServices.countRecipes(list);

  const filter = {
    // ...(ingredient && { ingredients: { $elemMatch: { id: ingredient._id } } }),
    // ...(ingredient && { ingredients: { $elemMatch: { "ingredients.id": ingredient._id } } }),
    // ...(ingredient && { $match: { "ingredients.id": ingredient._id } }),
    ingredients: { $elemMatch: { id: "640c2dd963a319ea671e3765" } },
  };
  console.log(filter);
  const recipes = await recipesServices.getRecipeList({ filter, settings: { limit, skip } });
  const total = await recipesServices.countRecipes(filter);

  res.json({
    // total: totalRecipes,
    // recepies: list,
    recipes,
    total,
    page,
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

export default {
  getRecipes: controllerWrapper(getRecipes),
  getOneRecipe: controllerWrapper(getOneRecipe),
};
