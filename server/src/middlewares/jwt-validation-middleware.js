import jwt from "jsonwebtoken";
import encrypt from "../config/encrypt.js";

export const verifyJwt = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ mensagem: "User token not found." });
  }

  try {
    const decoded = jwt.verify(token, encrypt.secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ mensagem: "Invalid token." });
  }
};
