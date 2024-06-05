import Testimonial from "../models/Testimonial.js"

const getTestimonialsList = () => Testimonial.find();

const countTestimonials = () => Testimonial.countDocuments();

export default {
    getTestimonialsList,
    countTestimonials
}