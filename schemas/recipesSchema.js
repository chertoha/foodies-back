import Joi from "joi";

const ingredient = Joi.object({
    name: Joi.string().required(),
    measure: Joi.string().required()
})

export const createRecipeSchema = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    area: Joi.string().required(),
    instructions: Joi.string().min(10).max(1000).required(),
    description: Joi.string().min(10).max(200).required(),
    thumb: Joi.string(),
    time: Joi.string().min(1).max(3),
    ingredients: Joi.array().required().items(ingredient)
});

export const updateStatusSchema = Joi.object({
    favorite: Joi.array()
})