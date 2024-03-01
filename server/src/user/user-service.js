import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import encrypt from "../config/encrypt.js";
import UserRepository from "./user-respository.js";

export const create = async (user) => {
  const { email, name, password, username } = user;
  const hashedPassword = await bcrypt.hash(password, 12);
  const emailAlreadyExists = Boolean(await UserRepository.findOne({ email }));

  if (emailAlreadyExists) {
    throw new Error("Email already in use.");
  }

  return UserRepository.create({
    email,
    name,
    password: hashedPassword,
    username,
  });
};

export const login = async (credentials) => {
  const { email, password } = credentials;
  const user = await UserRepository.findOne({ email });

  if (!Boolean(user)) throw new Error("Invalid credentials.");

  if (!(await bcrypt.compare(password, user.password)))
    throw new Error("Invalid credentials.");

  const token = jwt.sign(
    { email: user.email, name: user.name },
    encrypt.secret,
    {
      expiresIn: 86400,
    }
  );

  return token;
};

const UserService = { create, login };
export default UserService;
