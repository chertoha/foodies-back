import controllerWrapper from "../decorators/controllerWrapper.js";
import { countCategories, getAllCategories } from "../services/categoriesServices.js";

const getCategories = async (req, res) => {
  let { page = 1, limit = 12 } = req.query;
  page = Math.floor(Number(page));
  limit = Math.floor(Number(limit));
  if (isNaN(page) || isNaN(limit)) {
    throw HttpError(400, "Page and limit must be integers");
  }
  const skip = (page - 1) * limit;
  const settings = { skip, limit };
  const result = await getAllCategories({ settings });
  const total = await countCategories();
  res.json({ page, total, result });
};

export default {
  getCategories: controllerWrapper(getCategories),
};
