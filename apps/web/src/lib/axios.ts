import axios from "axios";
import { useAuthStore } from "../app/stores/authStore";

const apiBaseUrl =
  process.env.NODE_ENV === "development"
    ? "/api"
    : "https://kanon-academy-api-41f736fb7af3.herokuapp.com/api";

const axiosSecure = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

axiosSecure.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosSecure;
