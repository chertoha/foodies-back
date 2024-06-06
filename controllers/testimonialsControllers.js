import controllerWrapper from "../decorators/controllerWrapper.js"

import testimonialsServices from "../services/testimonialsServices.js"
import usersServices from "../services/usersServices.js";

const getTestimonials = async (req, res) => {
    const { page = 1, limit = 20 } = req.query;
    const filter = {};
    const fields = "";

    const skip = (page - 1) * limit;
    const settings = { skip, limit };

    const result = await testimonialsServices.getTestimonialsList({ filter, fields, settings });

    const arrayOfPromises = result.map(async ({ _id, owner, testimonial }) => {
        const { name } = await usersServices.findUser({ _id: owner });
        const updatedTestimonial = { _id, name, testimonial };
        return updatedTestimonial;
    });

    const responce = await Promise.all(arrayOfPromises);
    const total = await testimonialsServices.countTestimonials();

    res.json({
        total,
        page,
        result: responce,
    })
}


export default {
    getTestimonials: controllerWrapper(getTestimonials),
};
