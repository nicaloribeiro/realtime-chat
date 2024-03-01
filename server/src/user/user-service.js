import bcrypt from "bcrypt";
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

const UserService = { create };
export default UserService;
