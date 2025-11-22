import axios from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://65.0.92.40:8080/api",
  // baseURL: 'http://localhost:8080/api',
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization header to every request
api.interceptors.request.use((config) => {
  const token = JSON.parse(Cookies.get("auth-token") || null);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Catch expired token responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      Cookies.remove("auth-token");
      Cookies.remove("user");
      window.location.href = "/login"; // or show a login modal
    }
    return Promise.reject(error);
  }
);

export default api;
