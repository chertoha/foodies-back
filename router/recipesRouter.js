import express from "express";
import recipesControllers from "../controllers/recipesControllers.js";

import isValidId from "../middleware/isValidId.js";

import isBodyEmpty from "../middleware/isBodyEmpty.js";

import validateBody from "../helpers/validateBody.js";

import { createRecipeSchema } from "../schemas/recipesSchema.js"

import authenticate from "../middleware/authenticate.js"


const recipesRouter = express.Router();

recipesRouter.get("/", recipesControllers.getRecipes);

recipesRouter.get("/:id", isValidId, recipesControllers.getOneRecipe);

recipesRouter.post("/", authenticate, isBodyEmpty, validateBody(createRecipeSchema), recipesControllers.createRecipe);

recipesRouter.delete("/:id", authenticate, isValidId, recipesControllers.deleteRecipe);

recipesRouter.patch("/:id/favorite", authenticate, isValidId, recipesControllers.addToFavorites);

recipesRouter.delete("/:id/favorite", authenticate, isValidId, recipesControllers.removeFromFavorites);

export default recipesRouter;
