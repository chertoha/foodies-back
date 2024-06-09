import Joi from "joi";

export const createRecipeSchema = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    area: Joi.string().required(),
    instructions: Joi.string().min(200).max(1000).required(),
    description: Joi.string().min(50).max(200).required(),
    thumb: Joi.string(),
    time: Joi.string().min(1).max(3),
    ingredients: Joi.array().required()
});

export const updateStatusSchema = Joi.object({
    favorite: Joi.array()
})