import Testimonial from "../models/Testimonial.js"

const getTestimonialsList = ({ filter, fields, settings } = {}) => Testimonial.find(filter, fields, settings);

const countTestimonials = () => Testimonial.countDocuments();

export default {
    getTestimonialsList,
    countTestimonials
}