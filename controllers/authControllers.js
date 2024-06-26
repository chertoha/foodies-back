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
  const newUser = await usersServices.addUser({ ...req.body, avatar });
  const { _id, email, name } = newUser;
  const token = createToken({ id: _id });
  await usersServices.updateUserById(_id, { token });

  res.status(201).json({
    token,
    user: {
      _id,
      email,
      name,
      avatar,
      recipesCount: newUser.recipes.length,
      favoritesCount: newUser.favorites.length,
      followersCount: newUser.followers.length,
      followingCount: newUser.following.length,
      favorites: newUser.favorites,
      following: newUser.following,
    },
  });
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
      _id: user._id,
      email,
      name: user.name,
      avatar: user.avatar,
      recipesCount: user.recipes.length,
      favoritesCount: user.favorites.length,
      followersCount: user.followers.length,
      followingCount: user.following.length,
      favorites: user.favorites,
      following: user.following,
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
