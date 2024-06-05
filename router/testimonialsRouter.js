import express from "express";

import testimonialsControllers from "../controllers/testimonialsControllers.js";


const testimonialsRouter = express.Router();

testimonialsRouter.get("/", testimonialsControllers.getTestimonials);

export default testimonialsRouter;
