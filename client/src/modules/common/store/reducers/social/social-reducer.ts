import { createSlice } from "@reduxjs/toolkit";
import { SocialInitialState } from "./social-types";

const initialState: SocialInitialState = {
  usersFound: [],
  onlineFriends: [],
  friendList: [],
  loading: false,
};

const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {},
});

export default socialSlice.reducer;
