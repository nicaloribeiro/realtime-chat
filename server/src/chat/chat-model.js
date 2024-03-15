import mongoose from "../config/mongo.js";
const { Schema } = mongoose;

const ParticipantsSchema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    _id: false,
  }
);

const ChatSchema = new Schema(
  {
    participants: { type: [ParticipantsSchema], required: true },
  },
  {
    timestamps: true,
  }
);

ChatSchema.index({ "participants.userId": 1 });

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
