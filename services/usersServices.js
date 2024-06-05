import User from "../models/User.js";
import { encryptPassword } from "../helpers/encryption.js";

async function findUser(filter) {
  return User.findOne(filter);
}

async function addUser(body) {
  const hash = await encryptPassword(body.password);
  return User.create({ ...body, password: hash });
}

async function updateUserById(userId, data) {
  return User.findByIdAndUpdate(userId, data);
}

export default {
  findUser,
  addUser,
  updateUserById,
};
