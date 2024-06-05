import gravatar from "gravatar";

import controllerWrapper from "../decorators/controllerWrapper.js";
import usersServices from "../services/usersServices.js";
import HttpError from "../helpers/HttpError.js";
import { comparePasswords } from "../helpers/encryption.js";
import { createToken } from "../helpers/jwt.js";

const registerUser = async (req, res) => {
  const user = await usersServices.findUser({ email: req.body.email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const avatar = gravatar.url(req.body.email, { d: "identicon" });
  const result = await usersServices.addUser({ ...req.body, avatar });
  const { email, name } = result;

  res.status(201).json({ user: { email, name, avatar } });
};

const signinUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersServices.findUser({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const isCorrectPassword = await comparePasswords(password, user.password);
  if (!isCorrectPassword) {
    throw HttpError(401, "Email or password is wrong");
  }
  const token = createToken({ id: user._id });
  await usersServices.updateUserById(user._id, { token });
  res.json({
    token,
    user: {
      email,
      name: user.name,
      avatar: user.avatar,
    },
  });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await usersServices.updateUserById(_id, { token: null });
  res.status(204).send();
};

export default {
  registerUser: controllerWrapper(registerUser),
  signinUser: controllerWrapper(signinUser),
  logoutUser: controllerWrapper(logoutUser),
};
