import express from "express";
import authRouter from "./authRouter.js";
import usersRouter from "./usersRouter.js";
import areasRouter from "./areasRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import ingredientsRouter from "./ingredientsRouter.js";
import recipesRouter from "./recipesRouter.js";
import testimonialsRouter from "./testimonialsRouter.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);
router.use("/areas", areasRouter);
router.use("/ingridients", ingredientsRouter);
router.use("/testimonials", recipesRouter);
router.use("/recipes", testimonialsRouter);

export default router;
