import User from "../models/User.js";
import { encryptPassword } from "../helpers/encryption.js";

export async function findUser(filter) {
  return User.findOne(filter);
}

export async function addUser(body) {
  const hash = await encryptPassword(body.password);
  return User.create({ ...body, password: hash });
}
