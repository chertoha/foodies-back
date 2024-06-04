import express from "express";
import validateBody from "../helpers/validateBody.js";
import authControllers from "../controllers/authControllers.js";
import { createUserSchema, signinUserSchema } from "../schemas/usersSchemas.js";

const authRouter = express.Router();

authRouter.post("/signup", validateBody(createUserSchema), authControllers.registerUser);

authRouter.post("/signin", validateBody(signinUserSchema), authControllers.signinUser);

export default authRouter;
