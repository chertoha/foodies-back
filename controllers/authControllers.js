import gravatar from "gravatar";

import controllerWrapper from "../decorators/controllerWrapper.js";
import usersServices from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";

const registerUser = async (req, res) => {
  const user = await usersServices.findUser({ email: req.body.email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const avatar = gravatar.url(req.body.email, { d: "identicon" });
  const result = await usersServices.addUser({ ...req.body, avatar });
  const { email, name } = result;

  res.status(201).json({ user: { email, name } });
};

export default {
  registerUser: controllerWrapper(registerUser),
};
