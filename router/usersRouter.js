import express from "express";
import usersControllers from "../controllers/usersControllers.js";
import authenticate from "../middleware/authenticate.js";
import isValidId from "../middleware/isValidId.js";

const usersRouter = express.Router();

usersRouter.use(authenticate);

usersRouter.get("/current", usersControllers.getCurrentUser);

usersRouter.get("/:id", isValidId, usersControllers.getUser);

export default usersRouter;
