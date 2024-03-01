import mongoose from "../config/database.js";
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  friendList: { type: [String], default: [] },
  isOnline: { type: Boolean, default: false },
  name: { type: String, required: true },
  password: { type: String, required: true },
  socketId: { type: String, default: "" },
  username: { type: String, required: true },
});

UserSchema.index({ email: 1 });

const User = mongoose.model("User", UserSchema);

export default User;
