import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserInitialState } from "./user-types";
import { jwtDecode } from "jwt-decode";
import {
  LoginInput,
  RegisterInput,
  RegisterOutput,
} from "../../../types/login-types";
import UserService from "../../../services/user-service";
import { toast } from "react-toastify";
import { socket } from "../../../../../config/socket";

const initialState: UserInitialState = {
  user: {
    username: null,
    name: null,
    email: null,
    accessToken: null,
    socketId: null,
  },
  loading: false,
};

const getUserInfoFromJwt = (jwt: string): User => {
  const userData = jwtDecode<User>(jwt);
  const { username, name, email } = userData;
  if (!username || !name || !email) return initialState.user;
  return { username, name, email, accessToken: jwt };
};

export const getUserInLocalStorage = createAsyncThunk(
  "user/getLocalStorage",
  (): User => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      return initialState.user;
    }
    return getUserInfoFromJwt(token);
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (payload: LoginInput): Promise<User> => {
    const { email, password } = payload;
    const data = await UserService.login(email, password);
    const { authorization } = data;
    localStorage.setItem("access_token", authorization);
    const user = getUserInfoFromJwt(authorization);
    return user;
  }
);

export const logout = createAsyncThunk("user/logout", async () => {
  socket.disconnect();
  localStorage.removeItem("access_token");
});

export const register = createAsyncThunk(
  "user/register",
  async (payload: RegisterInput): Promise<RegisterOutput> => {
    return await UserService.register(payload);
  }
);

export const socketConnect = createAsyncThunk("user/socket-connect", () => {
  socket.connect();
});

export const socketDisconnect = createAsyncThunk(
  "user/socket-disconnect",
  () => {
    socket.disconnect();
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSocketId: (state, action) => {
      state.user.socketId = action.payload.socketId;
      socket.emit("user-online-data", {
        email: state.user.email,
        socketId: state.user.socketId,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInLocalStorage.fulfilled, (state, action) => {
        const user = action.payload;
        state.user = user;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, err) => {
        console.log(err);
        state.loading = false;
        toast.warning("User not found");
      })
      .addCase(login.fulfilled, (state, action) => {
        const user = action.payload;
        state.user = user;
        state.loading = false;
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        toast.success("Registration completed!");
      })
      .addCase(socketConnect.pending, (state) => {
        state.loading = true;
      })
      .addCase(socketConnect.rejected, (state) => {
        state.loading = false;
        toast.error("Error on chat connection. Try again later.");
      })
      .addCase(socketConnect.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(socketDisconnect.pending, (state) => {
        state.loading = true;
      })
      .addCase(socketDisconnect.rejected, (state) => {
        state.loading = false;
      })
      .addCase(socketDisconnect.fulfilled, (state) => {
        state.loading = false;
        state.user.socketId = null;
      });
  },
});

export default userSlice.reducer;
export const { setSocketId } = userSlice.actions;
