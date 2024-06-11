import express from "express";
import areasControllers from "../controllers/areasControllers.js";

const areasRouter = express.Router();

/**
 * @openapi
 * /areas:
 *   get:
 *     summary: Retrieve a list of areas
 *     description: Fetches a list of areas available in the database.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of areas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "6462a6f04c3d0ddd28897f9d"
 *                   name:
 *                     type: string
 *                     example: "Moroccan"
 *     tags:
 *       - Areas
 */

areasRouter.get("/", areasControllers.getAreas);

export default areasRouter;
