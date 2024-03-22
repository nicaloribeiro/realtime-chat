import Message from "./message-model.js";

const create = async (message) => {
  const newMessage = new Message(message);
  return await newMessage.save();
};

const find = async (query) => {
  return await Message.find(query);
};

const MessageRepository = { create, find };

export default MessageRepository;
