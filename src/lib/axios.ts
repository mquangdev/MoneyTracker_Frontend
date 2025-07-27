import { KEY_STORAGE } from "@/contants/storage.constants";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor: tự động gắn token nếu có
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(KEY_STORAGE.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Interceptor: xử lý lỗi tập trung
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Có thể redirect đến login nếu bị hết hạn token
      console.warn("Unauthorized - Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default api;
