import express from "express";
import usersControllers from "../controllers/usersControllers.js";
import authenticate from "../middleware/authenticate.js";
import isValidId from "../middleware/isValidId.js";

const usersRouter = express.Router();

usersRouter.use(authenticate);

usersRouter.get("/current", usersControllers.getCurrentUser);

usersRouter.get("/following", usersControllers.getFollowing);

usersRouter.post("/following/:id", isValidId, usersControllers.addFollowing);

usersRouter.delete("/following/:id", isValidId, usersControllers.removeFollowing);

usersRouter.get("/:id", isValidId, usersControllers.getUser);

usersRouter.get("/:id/followers", isValidId, usersControllers.getFollowers);

usersRouter.get("/:id/recipes", isValidId, usersControllers.getUserRecipes);

export default usersRouter;
