import UserRepository from "../user/user-respository.js";
import ChatRepository from "./chat-repository.js";

const create = async (usersEmail) => {
  const users = await UserRepository.find({ email: { $in: usersEmail } });
  
  if (!usersAreFriends(users)) {
    throw new Error("Users are not friends.");
  }

  const participants = users.map((user) => ({
    userId: user._id.toString(),
    email: user.email,
    name: user.name,
  }));

  return ChatRepository.create({ participants });
};

const findChatsByUser = async (userEmail) => {
  const user = await UserRepository.findOne({ email: userEmail });

  if (!Boolean(user)) {
    throw new Error("User not found.");
  }

  const userId = user._id.toString();
  const userChats = await ChatRepository.find({
    "participants.userId": userId,
  });

  return userChats;
};

const usersAreFriends = (users) => {
  return users.every((user) =>
    users.every(
      (friend) =>
        user._id === friend._id || user.friendList.includes(friend._id)
    )
  );
};

const ChatService = { create, findChatsByUser };
export default ChatService;
