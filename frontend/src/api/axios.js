import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://task-manager-backend-rmnx.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("userInfo");

  if (stored) {
    const { token } = JSON.parse(stored);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default api;