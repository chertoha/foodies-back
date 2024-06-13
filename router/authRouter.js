import express from "express";
import validateBody from "../helpers/validateBody.js";
import authControllers from "../controllers/authControllers.js";
import isBodyEmpty from "../middleware/isBodyEmpty.js";
import authenticate from "../middleware/authenticate.js";
import { createUserSchema, signinUserSchema } from "../schemas/usersSchemas.js";

const authRouter = express.Router();

/**
 * @openapi
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows a new user to register by providing their name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Jane Smith"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jane.smith@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Successfully registered new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Bearer token for the user
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60c72b2f9b1d4e3a2c123456"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "jane.smith@example.com"
 *                     name:
 *                       type: string
 *                       example: "Jane Smith"
 *                     avatar:
 *                       type: string
 *                       format: uri
 *                       example: "http://example.com/avatars/jane.jpg"
 *                     recipesCount:
 *                       type: integer
 *                       example: 5
 *                     favoritesCount:
 *                       type: integer
 *                       example: 10
 *                     followersCount:
 *                       type: integer
 *                       example: 7
 *                     followingCount:
 *                       type: integer
 *                       example: 8
 *                     favorites:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "60c54b2f9b1d4e3f2c123456"
 *                     following:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "60c54b2f9b1d4e3f2c123456"
 *       409:
 *         description: Conflict, user already registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email in use"
 *     tags:
 *       - Users
 */

authRouter.post(
  "/signup",
  isBodyEmpty,
  validateBody(createUserSchema),
  authControllers.registerUser
);

/**
 * @openapi
 * /users/signin:
 *   post:
 *     summary: Sign in a user
 *     description: This endpoint allows a user to sign in by providing their email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "jane.smith@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successfully signed in user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Bearer token for the user
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60c72b2f9b1d4e3a2c123456"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "jane.smith@example.com"
 *                     name:
 *                       type: string
 *                       example: "Jane Smith"
 *                     avatar:
 *                       type: string
 *                       format: uri
 *                       example: "http://example.com/avatars/jane.jpg"
 *                     recipesCount:
 *                       type: integer
 *                       example: 5
 *                     favoritesCount:
 *                       type: integer
 *                       example: 10
 *                     followersCount:
 *                       type: integer
 *                       example: 7
 *                     followingCount:
 *                       type: integer
 *                       example: 8
 *                     favorites:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "60c54b2f9b1d4e3f2c123456"
 *                     following:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: "60c54b2f9b1d4e3f2c123456"
 *       401:
 *         description: Unauthorized, email or password is incorrect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email or password is wrong"
 *     tags:
 *       - Users
 */

authRouter.post("/signin", isBodyEmpty, validateBody(signinUserSchema), authControllers.signinUser);

/**
 * @openapi
 * /users/logout:
 *   post:
 *     summary: Log out the currently signed-in user
 *     description: This endpoint logs out the currently signed-in user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Successfully logged out the user
 *       401:
 *         description: Unauthorized, user is not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Not authorized"
 *     tags:
 *       - Users
 */

authRouter.post("/logout", authenticate, authControllers.logoutUser);

export default authRouter;
