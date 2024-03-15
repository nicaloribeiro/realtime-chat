import mongoose from "../config/mongo";
const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    chatId: { type: String, required: true },
    sentBy: { type: String, required: true },
    content: { type: String, required: true },
    readed: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

MessageSchema.index({ chatId: 1 });

const Message = mongoose.model("Message", MessageSchema);

export default Message;
