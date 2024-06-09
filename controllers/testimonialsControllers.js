import controllerWrapper from "../decorators/controllerWrapper.js"

import testimonialsServices from "../services/testimonialsServices.js"


const getTestimonials = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const filter = {};
    const fields = "";

    const skip = (page - 1) * limit;
    const settings = { skip, limit };

    const result = await testimonialsServices.getTestimonialsList({ filter, fields, settings });
    const total = await testimonialsServices.countTestimonials(result);

    res.json({
        total,
        page,
        result: result,
    })
}


export default {
    getTestimonials: controllerWrapper(getTestimonials),
};
