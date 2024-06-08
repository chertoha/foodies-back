import Area from "../models/Area.js";

export const findAllAreas = () => Area.find();

export const getOneArea = filter => Area.findOne(filter);

