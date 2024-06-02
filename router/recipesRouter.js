import express from "express";

import recipesControllers from "../controllers/recipesControllers.js";

const recipesRouter = express.Router();

recipesRouter.get("/", recipesControllers.getAllRecipe);

recipesRouter.get("/:id", recipesControllers.getOneRecipe);

export default recipesRouter;
