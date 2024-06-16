import express from "express";

import ingredientsControllers from "../controllers/ingredientsControllers.js"

const ingredientsRouter = express.Router();

/**
 * @openapi
 * /ingredients:
 *   get:
 *     summary: public route to get ingredients list
 *     tags:
 *       - Ingredients
 *     operationId: getIngredients
 *     responses:
 *       "200":
 *         description: Successful response with ingredients list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Ingredients"
 *       "default":
 *         description: error response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */


ingredientsRouter.get("/", ingredientsControllers.getIngredients);

export default ingredientsRouter;
