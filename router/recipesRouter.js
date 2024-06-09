import express from "express";
import recipesControllers from "../controllers/recipesControllers.js";

import isValidId from "../middleware/isValidId.js";

import validateBody from "../helpers/validateBody.js";

import { createRecipeSchema } from "../schemas/recipesSchema.js";

import authenticate from "../middleware/authenticate.js";

import handleMulterError from "../middleware/handleMulterError.js";

import { allowedImageExtensions } from "../utils/imageUploadConfig.js";

import upload from "../middleware/upload.js";

const configuredUpload = upload({ allowedExtensions: allowedImageExtensions }).single("thumb");

const recipesRouter = express.Router();

recipesRouter.get("/", recipesControllers.getRecipes);

recipesRouter.get("/own", authenticate, recipesControllers.getOwnRecipes);

recipesRouter.get("/:id", isValidId, recipesControllers.getOneRecipe);

recipesRouter.post("/", authenticate, handleMulterError(configuredUpload), validateBody(createRecipeSchema), recipesControllers.createRecipe);

recipesRouter.delete("/:id", authenticate, isValidId, recipesControllers.deleteRecipe);

recipesRouter.post("/:id/favorite", authenticate, isValidId, recipesControllers.addToFavorites);

recipesRouter.delete("/:id/favorite", authenticate, isValidId, recipesControllers.removeFromFavorites);

export default recipesRouter;
