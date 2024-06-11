import express from "express";
import swaggerUi from "swagger-ui-express";
import authRouter from "./authRouter.js";
import usersRouter from "./usersRouter.js";
import areasRouter from "./areasRouter.js";
import categoriesRouter from "./categoriesRouter.js";
import ingredientsRouter from "./ingredientsRouter.js";
import recipesRouter from "./recipesRouter.js";
import testimonialsRouter from "./testimonialsRouter.js";
import controllerWrapper from "../decorators/controllerWrapper.js";

import swaggerSpec from "../helpers/swagger.js";
import cloudinary from "../helpers/cloudinary.js";
import handleMulterError from "../middleware/handleMulterError.js";
import upload from "../middleware/upload.js";
import { allowedImageExtensions } from "../utils/imageUploadConfig.js";

const router = express.Router();

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
router.use("/users", authRouter);
router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);
router.use("/areas", areasRouter);
router.use("/ingredients", ingredientsRouter);
router.use("/testimonials", testimonialsRouter);
router.use("/recipes", recipesRouter);

//delete before project release
//================================================================================================
// MULTER + CLOUDINARY
//================================================================================================
const configuredUpload = upload({ allowedExtensions: allowedImageExtensions }).single("image");

router.use(
  "/image-upload-test",
  [handleMulterError(configuredUpload)],
  controllerWrapper(async (req, res) => {
    const fileData = await cloudinary.uploader.upload(req.file.path, { folder: "foodies" });

    console.log(fileData);

    res.json(fileData);
  })
);
//================================================================================================
//================================================================================================

export default router;
