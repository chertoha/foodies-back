import express from "express";
import categoriesControllers from "../controllers/categoriesControllers.js";

const categoriesRouter = express.Router();

categoriesRouter.get("/", categoriesControllers.getCategories);

export default categoriesRouter;
