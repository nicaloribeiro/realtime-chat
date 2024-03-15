import Joi from "joi";

const create = Joi.object({
  participants: Joi.array().items(Joi.string()).required(),
});

const find = Joi.object({
  email: Joi.string().trim().required(),
});

const ChatValidate = { create, find };
export default ChatValidate;
