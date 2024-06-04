import express from "express";
import validateBody from "../helpers/validateBody.js";
import authControllers from "../controllers/authControllers.js";
import { createUserSchema } from "../schemas/usersSchemas.js";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(createUserSchema), authControllers.registerUser);

export default authRouter;
