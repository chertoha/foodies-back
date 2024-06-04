import HttpError from "../helpers/HttpError.js";
import { verifyToken } from "../helpers/jwt.js";
import usersServices from "../services/usersServices.js";

async function authenticate(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) {
    next(HttpError(401, "Not authorized"));
    return;
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
    return;
  }
  try {
    const { id } = verifyToken(token);
    const user = await usersServices.findUser({ _id: id });
    if (!user) {
      next(HttpError(401, "User not found"));
      return;
    }
    if (!user.token) {
      next(HttpError(401, "User is signed out"));
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, `Not authorized. ${error.message}`));
  }
}

export default authenticate;
