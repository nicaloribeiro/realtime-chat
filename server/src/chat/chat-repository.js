import Chat from "./chat-model.js";

const create = async (chat) => {
  const newChat = new Chat(chat);
  return await newChat.save();
};

const find = async (query) => {
  return await Chat.find(query);
};

const findOne = async (query) => {
  return await Chat.findOne(query);
};

const ChatRepository = { create, find, findOne };

export default ChatRepository;
