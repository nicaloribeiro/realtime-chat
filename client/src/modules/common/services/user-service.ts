import api from "../../../config/api";
import {
  LoginOutput,
  RegisterInput,
  RegisterOutput,
} from "../types/login-types";
import { UsersFound } from "../types/user-types";

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

const findUser = async (searchTerm: string): Promise<UsersFound[]> => {
  const { data } = await api.get<UsersFound[]>(`/api/user/find/${searchTerm}`);
  return data;
};

const UserService = { login, register, findUser };
export default UserService;
