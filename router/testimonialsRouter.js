import express from "express";

import testimonialsControllers from "../controllers/testimonialsControllers.js";


const testimonialsRouter = express.Router();

/**
 * @openapi
 * /testimonials:
 *   get:
 *     summary: public route to get testimonials list
 *     tags:
 *       - Testimonials
 *     operationId: getTestimonials
 *     responses:
 *       "200":
 *         description: Successful response with testimonials list
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Testimonials"
 *       "default":
 *         description: error response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Error"
 */

testimonialsRouter.get("/", testimonialsControllers.getTestimonials);

export default testimonialsRouter;
