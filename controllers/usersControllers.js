import controllerWrapper from "../decorators/controllerWrapper.js";
import usersServices from "../services/usersServices.js";
import recipesServices from "../services/recipesServices.js";
import HttpError from "../helpers/HttpError.js";

const getCurrentUser = async (req, res) => {
  const user = req.user;
  const userRecipes = await recipesServices.recipeList({ owner: user._id });
  const data = {
    _id: user._id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    recipesCount: userRecipes.length,
    favoritesCount: user.favorites.length,
    followersCount: user.followers.length,
    followingCount: user.following.length,
  };
  res.json(data);
};

const getUser = async (req, res) => {
  const { id: _id } = req.params;
  const user = await usersServices.findUser({ _id });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  const userRecipes = await recipesServices.recipeList({ owner: user._id });
  let data = {
    _id: user._id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    recipesCount: userRecipes.length,
    followersCount: user.followers.length,
  };

  if (String(req.user._id) === String(user._id)) {
    data = {
      ...data,
      favoritesCount: user.favorites.length,
      followingCount: user.following.length,
    };
  }

  res.json(data);
};

export default {
  getCurrentUser: controllerWrapper(getCurrentUser),
  getUser: controllerWrapper(getUser),
};
