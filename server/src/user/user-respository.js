import User from "./user-model.js";

const create = async (user) => {
  const newUser = new User(user);
  return await newUser.save();
};

const find = async (fields) => {
  return await User.find(fields);
};

const findOne = async (fields) => {
  return await User.findOne(fields);
};

const UserRepository = { create, find, findOne };

export default UserRepository;
