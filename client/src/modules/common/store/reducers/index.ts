import { combineReducers } from "@reduxjs/toolkit";
import socialReducer from "./social/social-reducer";
import chatReducer from "./social/chat-reducer";
import userReducer from "./user/user-reducer";

const rootReducer = combineReducers({
  social: socialReducer,
  chat: chatReducer,
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
