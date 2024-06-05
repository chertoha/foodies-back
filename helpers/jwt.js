import jwt from "jsonwebtoken";

export function createToken(payload) {
  const key = process.env.JWT_SECRET;
  return jwt.sign(payload, key, { expiresIn: "24h" });
}

export function verifyToken(token) {
  const key = process.env.JWT_SECRET;
  return jwt.verify(token, key);
}
