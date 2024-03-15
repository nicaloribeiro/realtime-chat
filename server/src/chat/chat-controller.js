import ChatService from "./chat-service.js";
import ChatValidate from "./chat-validation.js";

const create = async (req, res) => {
  try {
    const { error, value } = ChatValidate.create.validate(req.body);

    if (error) {
      res.status(400).send({
        message: "Error on create chat.",
        error: `Validation error: ${error.details[0].message}`,
      });
    }
    const { participants } = value;
    const chat = await ChatService.create(participants);
    res.status(201).send({
      message: "Chat created!",
      data: { chat },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Error on create chat.",
    });
  }
};

const findChatsByUser = async (req, res) => {
  try {
    const { error, value } = ChatValidate.find.validate(req.body);

    if (error) {
      res.status(400).send({
        message: "Error on find user chats.",
        error: `Validation error: ${error.details[0].message}`,
      });
    }

    const { email } = value;
    const chats = await ChatService.findChatsByUser(email);
    res.status(201).send({
      message: "Chats found.",
      data: { chats },
    });
  } catch (error) {
    console.error(error);
    res.status(401).send({
      message: "Error on find user chats.",
    });
  }
};

const ChatController = {
  create,
  findChatsByUser,
};
export default ChatController;
