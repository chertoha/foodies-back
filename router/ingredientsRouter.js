import express from "express";

import ingredientsControllers from "../controllers/ingredientsControllers.js"

const ingredientsRouter = express.Router();

ingredientsRouter.get("/", ingredientsControllers.getIngredients);

export default ingredientsRouter;
