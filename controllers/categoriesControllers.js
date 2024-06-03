import controllerWrapper from "../decorators/controllerWrapper.js";
import { getAllCategories } from "../services/categoriesServices.js";

const getCategories = async (req, res) => {
  const categories = await getAllCategories();
  res.json(categories);
};

export default {
  getCategories: controllerWrapper(getCategories),
};
