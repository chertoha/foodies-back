import express from "express";
import usersControllers from "../controllers/usersControllers.js";
import authenticate from "../middleware/authenticate.js";
import isValidId from "../middleware/isValidId.js";
import upload from "../middleware/upload.js";
import handleMulterError from "../middleware/handleMulterError.js";
import { allowedImageExtensions } from "../utils/imageUploadConfig.js";

const configuredUpload = upload({ allowedExtensions: allowedImageExtensions }).single("avatar");

const usersRouter = express.Router();

usersRouter.use(authenticate);

/**
 * @openapi
 * /users/current:
 *   get:
 *     summary: Retrieve the current authenticated user's information
 *     description: Fetches detailed information about the currently authenticated user.
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60a8f9c8c6e1c36a2b72c5e3"
 *                 email:
 *                   type: string
 *                   format: email
 *                   example: "jane.smith@example.com"
 *                 name:
 *                   type: string
 *                   example: "Jane Smith"
 *                 avatar:
 *                   type: string
 *                   format: uri
 *                   example: "http://example.com/avatars/jane.jpg"
 *                 recipesCount:
 *                   type: integer
 *                   description: The number of recipes created by the user
 *                   example: 5
 *                 favoritesCount:
 *                   type: integer
 *                   description: The number of favorite items saved by the user
 *                   example: 10
 *                 followersCount:
 *                   type: integer
 *                   description: The number of followers the user has
 *                   example: 15
 *                 followingCount:
 *                   type: integer
 *                   description: The number of users the current user is following
 *                   example: 20
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *     tags:
 *       - Users
 */

usersRouter.get("/current", usersControllers.getCurrentUser);

/**
 * @openapi
 * /users/following:
 *   get:
 *     summary: Retrieve the list of users the current authenticated user is following
 *     description: Fetches a list of users that the currently authenticated user is following, with optional pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 9
 *         description: The number of items per page for pagination.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of followed users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 total:
 *                   type: integer
 *                   example: 3
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Unique identifier for the user
 *                         example: "66674fc4f13c209a4bee86f5"
 *                       name:
 *                         type: string
 *                         example: "Victor"
 *                       email:
 *                         type: string
 *                         example: "victor@example.com"
 *                       avatar:
 *                         type: string
 *                         example: "//www.gravatar.com/avatar/6f37292db86d223bd865efca854fbd50?d=identicon"
 *                       recipes:
 *                         type: array
 *                         description: List of user's recipes
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: "6462a8f74c3d0ddd2889804b"
 *                             favorite:
 *                               type: integer
 *                               example: 3
 *                             title:
 *                               type: string
 *                               example: "Chinon Apple Tarts"
 *                             category:
 *                               type: string
 *                               example: "Dessert"
 *                             owner:
 *                               type: string
 *                               example: "66674fcef13c209a4bee86f8"
 *                             area:
 *                               type: string
 *                               example: "French"
 *                             instructions:
 *                               type: string
 *                               example: "To make the red wine jelly, put the red wine, jam sugar, star anise, clove, cinnamon stick, allspice, split vanilla pod and seeds in a medium saucepan..."
 *                             description:
 *                               type: string
 *                               example: "A delicious French pastry with caramelized apples and a flaky pastry crust."
 *                             thumb:
 *                               type: string
 *                               example: "https://ftp.goit.study/img/so-yummy/preview/Chinon%20Apple%20Tarts.jpg"
 *                             time:
 *                               type: string
 *                               example: "70"
 *                             ingredients:
 *                               type: array
 *                               description: List of ingredients
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: string
 *                                     example: "640c2dd963a319ea671e367e"
 *                                   measure:
 *                                     type: string
 *                                     example: "1 cup"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       400:
 *         $ref: '#/components/responses/PaginationError'
 *     tags:
 *       - Users
 */

usersRouter.get("/following", usersControllers.getFollowing);

/**
 * @openapi
 * /users/following/{id}:
 *   post:
 *     summary: Follow a user by ID
 *     description: Adds the user with the specified ID to the following list of the currently authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to follow
 *     responses:
 *       200:
 *         description: Successfully followed the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 followingCount:
 *                   type: integer
 *                   description: The new count of users being followed
 *                   example: 1
 *                 following:
 *                   type: array
 *                   description: List of user IDs that the current user is following
 *                   items:
 *                     type: string
 *                     example: "66674fc4f13c209a4bee86f5"
 *       404:
 *         $ref: '#/components/responses/UserNotFoundError'
 *       409:
 *         description: Conflict error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Already following"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *     tags:
 *       - Users
 */

usersRouter.post("/following/:id", isValidId, usersControllers.addFollowing);

/**
 * @openapi
 * /users/following/{id}:
 *   delete:
 *     summary: Unfollow a user by ID
 *     description: Removes the user with the specified ID from the following list of the currently authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to unfollow
 *     responses:
 *       200:
 *         description: Successfully unfollowed the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 followingCount:
 *                   type: integer
 *                   description: The new count of users being followed
 *                   example: 1
 *                 following:
 *                   type: array
 *                   description: List of user IDs that the current user is following
 *                   items:
 *                     type: string
 *                     description: User ID
 *                     example: "66674fc4f13c209a4bee86f5"
 *       404:
 *         $ref: '#/components/responses/UserNotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *     tags:
 *       - Users
 */

usersRouter.delete("/following/:id", isValidId, usersControllers.removeFollowing);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Retrieve user details by ID
 *     description: Fetches details of the user with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "6462a6cd4c3d0ddd28897f92"
 *                 email:
 *                   type: string
 *                   example: "jane.smith@example.com"
 *                 name:
 *                   type: string
 *                   example: "Jane Smith"
 *                 avatar:
 *                   type: string
 *                   example: "https://example.com/avatar.jpg"
 *                 recipesCount:
 *                   type: integer
 *                   example: 5
 *                 followersCount:
 *                   type: integer
 *                   example: 7
 *       404:
 *         $ref: '#/components/responses/UserNotFoundError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *     tags:
 *       - Users
 */

usersRouter.get("/:id", isValidId, usersControllers.getUser);

/**
 * @openapi
 * /users/{id}/followers:
 *   get:
 *     summary: Retrieve followers of a user by ID
 *     description: Fetches a paginated list of followers for the user with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose followers are to be retrieved
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 9
 *         description: The number of items to retrieve per page
 *     responses:
 *       200:
 *         description: Successfully retrieved the followers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 total:
 *                   type: integer
 *                   example: 3
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "66674fc4f13c209a4bee86f5"
 *                       name:
 *                         type: string
 *                         example: "Jane Smith"
 *                       email:
 *                         type: string
 *                         example: "jane.smith@example.com"
 *                       avatar:
 *                         type: string
 *                         example: "//www.gravatar.com/avatar/6f37292db86d223bd865efca854fbd50?d=identicon"
 *                       recipes:
 *                         type: array
 *                         description: List of recipes created by the follower
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                               example: "6462a8f74c3d0ddd2889804b"
 *                             favorite:
 *                               type: integer
 *                               example: 2
 *                             title:
 *                               type: string
 *                               example: "Chinon Apple Tarts"
 *                             category:
 *                               type: string
 *                               example: "Dessert"
 *                             owner:
 *                               type: string
 *                               example: "66674fcef13c209a4bee86f8"
 *                             area:
 *                               type: string
 *                               example: "French"
 *                             instructions:
 *                               type: string
 *                               example: "To make the red wine jelly, put the red wine..."
 *                             description:
 *                               type: string
 *                               example: "A delicious French pastry with caramelized apples and a flaky pastry crust."
 *                             thumb:
 *                               type: string
 *                               example: "https://ftp.goit.study/img/so-yummy/preview/Chinon%20Apple%20Tarts.jpg"
 *                             time:
 *                               type: string
 *                               example: "70"
 *                             ingredients:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: string
 *                                     example: "640c2dd963a319ea671e367e"
 *                                   measure:
 *                                     type: string
 *                                     example: "1 cup"
 *       404:
 *         $ref: '#/components/responses/UserNotFoundError'
 *       400:
 *         $ref: '#/components/responses/PaginationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *     tags:
 *       - Users
 */

usersRouter.get("/:id/followers", isValidId, usersControllers.getFollowers);

/**
 * @openapi
 * /users/{id}/recipes:
 *   get:
 *     summary: Retrieve a user's recipes by user ID
 *     description: Fetches a paginated list of recipes for the user with the specified ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose recipes are to be retrieved
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 9
 *         description: The number of items to retrieve per page
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 total:
 *                   type: integer
 *                   example: 1
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "6462a8f74c3d0ddd2889806d"
 *                       favorite:
 *                         type: integer
 *                         example: 3
 *                       title:
 *                         type: string
 *                         example: "Rogaliki (Polish Croissant Cookies)"
 *                       category:
 *                         type: string
 *                         example: "Dessert"
 *                       owner:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "66674fc4f13c209a4bee86f5"
 *                           name:
 *                             type: string
 *                             example: "Jane Smith"
 *                           avatar:
 *                             type: string
 *                             example: "//www.gravatar.com/avatar/6f37292db86d223bd865efca854fbd50?d=identicon"
 *                       area:
 *                         type: string
 *                         example: "Polish"
 *                       instructions:
 *                         type: string
 *                         example: "In a medium bowl mix egg yolks, philly cheese and baking powder..."
 *                       description:
 *                         type: string
 *                         example: "A popular Polish pastry, Rogaliki are crescent-shaped cookies..."
 *                       thumb:
 *                         type: string
 *                         example: "https://ftp.goit.study/img/so-yummy/preview/Rogaliki%20_Polish%20Croissant%20Cookies_.jpg"
 *                       time:
 *                         type: string
 *                         example: "35"
 *                       ingredients:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "640c2dd963a319ea671e367e"
 *                             measure:
 *                               type: string
 *                               example: "1 cup"
 *       404:
 *         $ref: '#/components/responses/UserNotFoundError'
 *       400:
 *         $ref: '#/components/responses/PaginationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *     tags:
 *       - Users
 */

usersRouter.get("/:id/recipes", isValidId, usersControllers.getUserRecipes);

usersRouter.patch("/avatar", handleMulterError(configuredUpload), usersControllers.updateAvatar);

export default usersRouter;
