import controllerWrapper from "../decorators/controllerWrapper.js";
import usersServices from "../services/usersServices.js";
import recipesServices from "../services/recipesServices.js";
import HttpError from "../helpers/HttpError.js";
import constructUserArray from "../helpers/constructUserArray.js";
import cloudinary from "../helpers/cloudinary.js";
import fs from "fs/promises";
import Jimp from "jimp";

const getCurrentUser = async (req, res) => {
  const user = req.user;
  const userRecipes = await recipesServices.getRecipeList({ filter: { owner: user._id } });
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

  const userRecipes = await recipesServices.getRecipeList({ filter: { owner: user._id } });
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

const getFollowing = async (req, res) => {
  const user = req.user;

  let { page = 1, limit = 9 } = req.query;
  page = Math.floor(Number(page));
  limit = Math.floor(Number(limit));
  if (isNaN(page) || isNaN(limit)) {
    throw HttpError(400, "Page and limit must be integers");
  }
  const skip = (page - 1) * limit;
  const settings = { skip, limit };

  const result = await constructUserArray(user.following, settings);

  res.json({ page, limit, followingCount: user.following.length, following: result });
};

const addFollowing = async (req, res) => {
  const authorizedUser = req.user;
  const { id: _id } = req.params;
  const targetUser = await usersServices.findUser({ _id });
  if (!targetUser) {
    throw HttpError(404, "User not found");
  }

  if (authorizedUser.following.includes(targetUser._id)) {
    throw HttpError(409, "Already following");
  }

  const updatedUser = await usersServices.updateUserById(authorizedUser._id, {
    $push: { following: targetUser._id },
  });
  await usersServices.updateUserById(targetUser._id, {
    $push: { followers: authorizedUser._id },
  });

  res.json({ followingCount: updatedUser.following.length, following: updatedUser.following });
};

const removeFollowing = async (req, res) => {
  const authorizedUser = req.user;
  const { id: _id } = req.params;
  const targetUser = await usersServices.findUser({ _id });
  if (!targetUser) {
    throw HttpError(404, "User not found");
  }
  if (!authorizedUser.following.includes(targetUser._id)) {
    throw HttpError(404, "Not following selected user");
  }

  const updatedUser = await usersServices.updateUserById(authorizedUser._id, {
    $pull: { following: targetUser._id },
  });
  await usersServices.updateUserById(targetUser._id, {
    $pull: { followers: authorizedUser._id },
  });

  res.json({ followingCount: updatedUser.following.length, following: updatedUser.following });
};

const getFollowers = async (req, res) => {
  const { id: _id } = req.params;
  const user = await usersServices.findUser({ _id });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  let { page = 1, limit = 9 } = req.query;
  page = Math.floor(Number(page));
  limit = Math.floor(Number(limit));
  if (isNaN(page) || isNaN(limit)) {
    throw HttpError(400, "Page and limit must be integers");
  }
  const skip = (page - 1) * limit;
  const settings = { skip, limit };

  const result = await constructUserArray(user.followers, settings);

  res.json({ page, limit, followersCount: user.followers.length, followers: result });
};

const getUserRecipes = async (req, res) => {
  const { id: _id } = req.params;
  const user = await usersServices.findUser({ _id });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  let { page = 1, limit = 9 } = req.query;
  page = Math.floor(Number(page));
  limit = Math.floor(Number(limit));
  if (isNaN(page) || isNaN(limit)) {
    throw HttpError(400, "Page and limit must be integers");
  }
  const skip = (page - 1) * limit;
  const settings = { skip, limit };

  const userRecipes = await recipesServices.getRecipeList({
    filter: { owner: _id },
    fields: "-createdAt -updatedAt",
    settings,
  });

  res.json({ page, limit, recipesCount: userRecipes.length, ownRecipes: userRecipes });
};

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "No file attached");
  }

  const { _id } = req.user;

  const { path: filepath } = req.file;

  try {
    const image = await Jimp.read(filepath);
    image.resize(240, 240).write(filepath);
  } catch (error) {
    await fs.unlink(filepath);
    throw HttpError(400, `Could not read file. ${error.message}`);
  }

  const { secure_url } = await cloudinary.uploader.upload(filepath, { folder: "foodies" });

  await fs.unlink(filepath);

  const updatedUser = await usersServices.updateUserById(_id, { avatar: secure_url });

  res.json({ avatar: updatedUser.avatar });
};

export default {
  getCurrentUser: controllerWrapper(getCurrentUser),
  getUser: controllerWrapper(getUser),
  getFollowing: controllerWrapper(getFollowing),
  addFollowing: controllerWrapper(addFollowing),
  removeFollowing: controllerWrapper(removeFollowing),
  getFollowers: controllerWrapper(getFollowers),
  getUserRecipes: controllerWrapper(getUserRecipes),
  updateAvatar: controllerWrapper(updateAvatar),
};
