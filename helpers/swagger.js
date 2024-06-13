import swaggerJSDoc from "swagger-jsdoc";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL || `http://localhost:${process.env.PORT || 8000}/api`;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Foodies REST API Docs",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your bearer token in the format **Bearer <token>**",
        },
      },
    },
    servers: [{ url: BACKEND_API_URL }],
    security: [{ bearerAuth: [] }],
  },
  apis: ["./router/*.js", "./helpers/swagger.js"],
};

const swaggerSpec = swaggerJSDoc(options);

/**
 * @openapi
 * components:
 *   responses:
 *     UnauthorizedError:
 *       description: Unauthorized, the user is not authenticated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Not authorized"
 *     PaginationError:
 *       description: Bad Request, page and limit must be valid integers
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Page and limit must be integers"
 *     UserNotFoundError:
 *       description: User not found
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "User not found"
 */

export default swaggerSpec;
