import controllerWrapper from "../decorators/controllerWrapper.js"

import ingredientsServices from "../services/ingredientsServices.js";


const getIngredients = async (req, res) => {

    const { page = 1, limit = 1000, name } = req.query;
    const skip = (page - 1) * limit;

    const filter = { ...(name && { name }) };
    const fields = {};
    const settings = { skip, limit };

    const result = await ingredientsServices.getIngredients({ filter, fields, settings });
    const total = await ingredientsServices.countIngredients(result);

    res.json({
        total,
        result
    })
}


export default {
    getIngredients: controllerWrapper(getIngredients),
}