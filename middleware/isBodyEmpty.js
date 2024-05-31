import HttpError from "../helpers/HttpError.js";

const isBodyEmpty = (req, _, next) => {
  const { length } = Object.keys(req.body);
  if (length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }
  next();
};

export default isBodyEmpty;
