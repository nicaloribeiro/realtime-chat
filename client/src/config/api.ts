import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;
const USER_TOKEN = localStorage.getItem("access_token") || "";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${USER_TOKEN}`,
    "Content-Type": "application/json",
  },
  timeout: 1500,
});

export default api;
