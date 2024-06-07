import { Schema, model } from "mongoose";

const areaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Area = model("area", areaSchema);

export default Area;
