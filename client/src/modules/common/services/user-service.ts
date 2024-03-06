import api from "../../../config/api";
import {
  LoginOutput,
  RegisterInput,
  RegisterOutput,
} from "../types/login-types";

const login = async (email: string, password: string): Promise<LoginOutput> => {
  const { data } = await api.post<LoginOutput>("/api/account/login", {
    email,
    password,
  });
  return data;
};

const register = async (payload: RegisterInput): Promise<RegisterOutput> => {
  const { data } = await api.post<RegisterOutput>(
    "/api/account/register",
    payload
  );
  return data;
};

const UserService = { login, register };
export default UserService;
