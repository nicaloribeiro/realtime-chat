import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../modules/common/types/login-types";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1500,
});

api.interceptors.request.use(
  (config) => {
    const isAuthRoute =
      config.url?.endsWith("/login") || config.url?.endsWith("/register");

    if (!isAuthRoute) {
      const token = localStorage.getItem("access_token");

      if (token) {
        const decoded: DecodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        if (decoded.exp <= currentTime) {
          localStorage.removeItem("access_token");
          return Promise.reject(new Error("Expired token."));
        } else {
          config.headers = config.headers || {};
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
