import mongoose from "../config/mongo.js";
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  friendList: { type: [String], default: [] },
  name: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  blockList: { type: [String], default: [] },
  friendRequest: { type: [String], default: [] },
});

UserSchema.index({ email: 1 });
UserSchema.index({ blockList: 1 });

const User = mongoose.model("User", UserSchema);

export default User;
