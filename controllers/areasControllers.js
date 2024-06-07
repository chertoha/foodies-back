import controllerWrapper from "../decorators/controllerWrapper.js";
import { findAllAreas } from "../services/areasServices.js";

const getAreas = async (req, res) => {
  const areas = await findAllAreas();
  res.json(areas);
};

export default {
  getAreas: controllerWrapper(getAreas),
};
