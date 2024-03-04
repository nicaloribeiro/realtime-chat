import api from "../../../config/api";
import { LoginOutput } from "../types/login-types";

const login = async (email: string, password: string): Promise<LoginOutput> => {
  const { data } = await api.post<LoginOutput>("/api/account/login", {
    email,
    password,
  });
  return data;
};

const UserService = { login };
export default UserService;
