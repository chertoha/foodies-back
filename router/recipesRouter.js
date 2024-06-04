import express from "express";

import isValidId from "../middleware/isValidId.js"

import recipesControllers from "../controllers/recipesControllers.js";

const recipesRouter = express.Router();

recipesRouter.get("/", recipesControllers.getRecipes);

recipesRouter.get("/:id", isValidId, recipesControllers.getOneRecipe);

export default recipesRouter;
