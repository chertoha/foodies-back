import Joi from "joi";
import { emailRegexp } from "../utils/validationPatterns.js";

export const createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});
