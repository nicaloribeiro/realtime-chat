import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import encrypt from "../config/encrypt.js";
import UserRepository from "./user-respository.js";

const create = async (user) => {
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

const login = async (credentials) => {
  const { email, password } = credentials;
  const user = await UserRepository.findOne({ email });

  if (!Boolean(user)) throw new Error("Invalid credentials.");

  if (!(await bcrypt.compare(password, user.password)))
    throw new Error("Invalid credentials.");

  const token = jwt.sign(
    { email: user.email, name: user.name, username: user.username },
    encrypt.secret,
    {
      expiresIn: 86400,
    }
  );

  return token;
};

const findUserByTerm = async (searchTerm, user) => {
  const { email } = user;
  const userFound = await UserRepository.findOne({ email });
  if (!Boolean(userFound)) {
    throw new Error("Requiring user not found.");
  }
  const { _id: userFoundId } = userFound;
  const query = {
    _id: { $ne: userFoundId },
    blockList: { $nin: [userFoundId.toString()] },
    $or: [
      { name: { $regex: searchTerm, $options: "i" } },
      { username: { $regex: searchTerm, $options: "i" } },
      { email: { $regex: searchTerm, $options: "i" } },
    ],
  };
  const users = await UserRepository.find(query);

  const formattedUsers = users.map((user) => {
    const data = {
      email: user.email,
      name: user.name,
      username: user.username,
      friendRequestSent: false,
      isFriend: false,
    };
    if (user.friendRequest.includes(userFoundId)) {
      data.friendRequestSent = true;
    }
    if (user.friendList.includes(userFoundId)) {
      data.isFriend = true;
    }
    return data;
  });

  return formattedUsers;
};

const UserService = { create, login, findUserByTerm };
export default UserService;
