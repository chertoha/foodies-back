import express from "express";

import recipesControllers from "../controllers/recipesControllers.js";

const recipesRouter = express.Router();

recipesRouter.get("/", recipesControllers.getAllRecipes);

recipesRouter.get("/:id", recipesControllers.getOneRecipe);

export default recipesRouter;
