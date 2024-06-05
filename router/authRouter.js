import express from "express";
import validateBody from "../helpers/validateBody.js";
import authControllers from "../controllers/authControllers.js";
import isBodyEmpty from "../middleware/isBodyEmpty.js";
import authenticate from "../middleware/authenticate.js";
import { createUserSchema, signinUserSchema } from "../schemas/usersSchemas.js";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  isBodyEmpty,
  validateBody(createUserSchema),
  authControllers.registerUser
);

authRouter.post("/signin", isBodyEmpty, validateBody(signinUserSchema), authControllers.signinUser);

authRouter.post("/logout", authenticate, authControllers.logoutUser);

export default authRouter;
