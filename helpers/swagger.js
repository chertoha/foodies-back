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
 *   schemas:
 *     Ingredient:
 *       type: object
 *       required:
 *         - name
 *         - measure
 *       properties:
 *         name:
 *           type: string
 *           example: Salted Butter
 *         measure:
 *           type: string
 *           example: 2
 *     Ingredients:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/Ingredient"
 *     Testimonial:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 640c2dd963a319ea671e37aa
 *         name:
 *           type: string
 *           example: Squid
 *         desc:
 *           type: string
 *           example: A type of cephalopod with a soft, cylindrical body and long tentacles, often used in seafood dishes such as calamari or grilled squid
 *         img:
 *           type: string
 *           example: https://ftp.goit.study/img/so-yummy/ingredients/640c2dd963a319ea671e37aa.png
 *     Testimonials:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/Testimonial"
 *     Recipe:
 *       type: object
 *       required:
 *         - title
 *         - category
 *         - owner
 *         - area
 *         - instructions
 *         - description
 *         - time
 *         - ingredients
 *       properties:
 *         _id:
 *           type: string
 *           example: 6462a8f74c3d0ddd2889802b
 *         title:
 *           type: string
 *           example: English Breakfast
 *         category:
 *           type: string
 *           example: Breakfast
 *         area:
 *           type: string
 *           example: British
 *         instructions:
 *           type: string
 *           example: Heat the flat grill plate over a low heat...
 *           description: It is a popular breakfast in the United Kingdom
 *         thumb:
 *           type: string
 *           example: https://ftp.goit.study/img/so-yummy/preview/English%20Breakfast.jpg
 *         time:
 *           type: string
 *           example: 51
 *         ingredients:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Ingredients"
 *     Recipes:
 *       type: array
 *       items:
 *         $ref: "#/components/schemas/Recipe"
 *     Error:
 *       type: object
 *       required:
 *         - code
 *         - message
 *       properties:
 *         code:
 *           type: integer
 *         message:
 *           type: string
 *     RemoveRecipeResponse:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
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
