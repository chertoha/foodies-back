import express from "express";
import authRouter from "./authRouter.js";
import usersRouter from "./usersRouter.js";
import areasRouter from "./areasRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import ingredientsRouter from "./ingredientsRouter.js";
import recipesRouter from "./recipesRouter.js";
import testimonialsRouter from "./testimonialsRouter.js";

const router = express.Router();

router.use("/user", authRouter);
router.use("/user", usersRouter);
router.use("/categories", areasRouter);
router.use("/areas", categoriesRouter);
router.use("/ingridients", ingredientsRouter);
router.use("/testimonials", recipesRouter);
router.use("/recipes", testimonialsRouter);

export default router;
