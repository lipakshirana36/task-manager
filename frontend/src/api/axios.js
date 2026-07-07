import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://task-manager-5-7ce5.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("userInfo");
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
