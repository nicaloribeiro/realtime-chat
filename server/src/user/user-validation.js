import Joi from "joi";

const createUser = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().min(3).max(30).required(),
});

const findUser = Joi.object({
  email: Joi.string().email(),
  name: Joi.string(),
  username: Joi.string(),
});

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const UserValidate = { createUser, findUser, login };
export default UserValidate;
