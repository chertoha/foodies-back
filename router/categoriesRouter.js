import express from "express";
import categoriesControllers from "../controllers/categoriesControllers.js";

const categoriesRouter = express.Router();

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Retrieve a list of categories with optional pagination
 *     description: Fetches categories with optional pagination using query parameters `page` and `limit`.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: The page number to retrieve (default is 1)
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         required: false
 *         description: The number of categories to return per page (default is 12)
 *         example: 12
 *     responses:
 *       200:
 *         description: Successfully retrieved the categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                   example: 1
 *                 total:
 *                   type: integer
 *                   description: Total number of categories
 *                   example: 15
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6462a6cd4c3d0ddd28897f92"
 *                       name:
 *                         type: string
 *                         example: "Vegetarian"
 *                       img:
 *                         type: string
 *                         format: uri
 *                         example: "https://res.cloudinary.com/dvnlykxgs/image/upload/v1717961676/foodies/zud4m7zdpxbobak37t1y.jpg"
 *       400:
 *         description: Bad Request, invalid query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Page and limit must be integers"
 *     tags:
 *       - Categories
 */

categoriesRouter.get("/", categoriesControllers.getCategories);

export default categoriesRouter;
