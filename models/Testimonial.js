import { Schema, model } from "mongoose";


const testimonialSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },
    testimonial: {
        type: String,
    }
});


const Testimonial = model("testimonial", testimonialSchema);

export default Testimonial;