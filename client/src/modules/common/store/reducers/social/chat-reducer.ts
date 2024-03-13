import { createSlice } from "@reduxjs/toolkit";
import { ChatInitialState } from "./chat-types";

const initialState: ChatInitialState = {
  chats: [],
  loading: false,
};

const userSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
});

export default userSlice.reducer;
