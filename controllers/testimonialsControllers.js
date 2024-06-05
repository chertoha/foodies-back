import controllerWrapper from "../decorators/controllerWrapper.js"

import testimonialsServices from "../services/testimonialsServices.js"

const getTestimonials = async (req, res) => {

    const result = await testimonialsServices.getTestimonialsList();
    const total = await testimonialsServices.countTestimonials();

    res.json({
        total,
        result
    })
}


export default {
    getTestimonials: controllerWrapper(getTestimonials),
};
