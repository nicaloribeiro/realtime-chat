import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SocialInitialState } from "./social-types";
import { UsersFound } from "../../../types/user-types";
import UserService from "../../../services/user-service";

const initialState: SocialInitialState = {
  usersFound: [],
  onlineFriends: [],
  friendList: [],
  loading: false,
  hasSearched: false,
};

export const searchUsers = createAsyncThunk(
  "social/find-users",
  async (searchTerm: string): Promise<UsersFound[]> => {
    const usersFound = await UserService.findUser(searchTerm);
    return usersFound;
  }
);

const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
        state.hasSearched = false;
      })
      .addCase(searchUsers.rejected, (state) => {
        state.loading = false;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        const users = action.payload;
        state.usersFound = users;
        state.loading = false;
        state.hasSearched = true;
      });
  },
});

export default socialSlice.reducer;
