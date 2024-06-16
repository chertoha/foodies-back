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

/**
 * @openapi
 * /recipes:
 *   get:
 *     summary: public endpoint to get recipes list
 *     tags:
 *       - Recipes
 *     operationId: getAllRecipes
 *     responses:
 *       "200":
 *         description: Successful response with recipes list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Recipes"
 *       "default":
 *         description: error response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

recipesRouter.get("/", recipesControllers.getRecipes);

/**
 * @openapi
 * /recipes/popular:
 *   get:
 *     summary: public endpoint to get the most popular recipes
 *     tags:
 *       - Recipes
 *     operationId: getPopularRecipes
 *     responses:
 *       "200":
 *         description: Successful response with the most popular recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Recipe"
 *       "default":
 *         description: error response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

recipesRouter.get("/popular", recipesControllers.getPopular);

/**
 * @openapi
 * /recipes/own:
 *   get:
 *     summary: private endpoint to get own recipes
 *     tags:
 *       - Recipes
 *     operationId: getOwnRecipes
 *     responses:
 *       "200":
 *         description: Successful response with own recipes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Recipe"
 *       "default":
 *         description: error response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

recipesRouter.get("/own", authenticate, recipesControllers.getOwnRecipes);

/**
 * @openapi
 * /recipes/favorites:
 *   get:
 *     summary: public endpoint to get the most popular recipes
 *     tags:
 *       - Recipes
 *     operationId: getFavoritesRecipes
 *     responses:
 *       "200":
 *         description: Successful response with the favorites recipes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Recipe"
 *       "default":
 *         description: error response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

recipesRouter.get("/favorites", authenticate, recipesControllers.getFavorites);

/**
 * @openapi
 * /recipes/{recipe_id}:
 *   get:
 *     summary: public endpoint to get one recipe by id
 *     tags:
 *       - Recipes
 *     operationId: getOneRecipeById
 *     parameters:
 *       - name: recipe_id
 *         in: path
 *         required: true
 *         description: Recipe Id
 *         schema:
 *           type: string
 *         example: 6462a8f74c3d0ddd2889802b
 *     responses:
 *       "200":
 *         description: Successful response with one recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Recipe"
 *       "default":
 *         description: error response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

recipesRouter.get("/:id", isValidId, recipesControllers.getOneRecipe);

/**
 * @openapi
 * /recipes:
 *   post:
 *     summary: create a new recipe
 *     tags:
 *       - Recipes
 *     operationId: createNewRecipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Recipe"
 *     responses:
 *       "200":
 *         description: Successful create a new recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Recipe"
 *       "default":
 *         description: error response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

recipesRouter.post("/", authenticate, handleMulterError(configuredUpload), validateBody(createRecipeSchema), recipesControllers.createRecipe);

/**
 * @openapi
 * /recipes/{recipe_id}:
 *   delete:
 *     summary: private route to remove recipe by id
 *     tags:
 *       - Recipes
 *     operationId: deleteRecipeById
 *     parameters:
 *       - name: recipe_id
 *         in: path
 *         required: true
 *         description: Recipe Id
 *         schema:
 *           type: string
 *         example: 6462a8f74c3d0ddd2889802b
 *     responses:
 *       "200":
 *         description: Deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/RemoveRecipeResponse"
 *       "default":
 *         description: error response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

recipesRouter.delete("/:id", authenticate, isValidId, recipesControllers.deleteRecipe);

/**
 * @openapi
 * /{recipe_id}/favorite:
 *   post:
 *     summary: private endpoint to add recipe to favorite recipes
 *     tags:
 *       - Recipes
 *     operationId: addToFavorites
 *     parameters:
 *       - name: recipe_id
 *         in: path
 *         required: true
 *         description: Enter recipe Id to add to favorites
 *         schema:
 *           $ref: "#/components/schemas/Recipe"
 *     responses:
 *       "200":
 *         description: Added to favorites
 *         content:
 *           application/json:
 *             schema: {}
 *       "default":
 *         description: error response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

recipesRouter.post("/:id/favorite", authenticate, isValidId, recipesControllers.addToFavorites);

/**
 * @openapi
 * /{recipe_id}/favorite:
 *   delete:
 *     summary: private route to remove recipe from favorites
 *     tags:
 *       - Recipes
 *     operationId: deleteFromFavorites
 *     parameters:
 *       - name: recipe_id
 *         in: path
 *         required: true
 *         description: Enter recipe Id to remove from favorites
 *         schema:
 *           $ref: "#/components/schemas/Recipe"
 *         example: 6462a8f74c3d0ddd2889802b
 *     responses:
 *       "200":
 *         description: Removed from favorites
 *         content:
 *           application/json: {}
 *       "default":
 *         description: error response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

recipesRouter.delete("/:id/favorite", authenticate, isValidId, recipesControllers.removeFromFavorites);


export default recipesRouter;
