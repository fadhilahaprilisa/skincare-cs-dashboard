// ============================================================
// API CLIENT — Axios instance dengan JWT interceptor
// ============================================================

import axios from "axios";
import { tokenStorage } from "./auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000, // 60 detik, untuk AI response yang lambat
});

// ============================================================
// REQUEST INTERCEPTOR — Auto-attach JWT ke setiap request
// ============================================================
api.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================================
// RESPONSE INTERCEPTOR — Auto-logout kalau token expired
// ============================================================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired atau invalid → clear & redirect
      tokenStorage.clear();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// ============================================================
// ERROR HELPER — Extract error message dari berbagai bentuk
// ============================================================
export const getErrorMessage = (error) => {
  if (error.response?.data?.detail) {
    const detail = error.response.data.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg;
  }
  if (error.message === "Network Error") {
    return "Tidak dapat terhubung ke server. Pastikan backend berjalan.";
  }
  if (error.code === "ECONNABORTED") {
    return "Request timeout. Silakan coba lagi.";
  }
  return error.message || "Terjadi kesalahan tidak terduga.";
};

// ============================================================
// API ENDPOINTS — Semua endpoint dalam 1 tempat
// ============================================================

export const authAPI = {
  login: async (email, password, role) => {
    const res = await api.post("/api/v1/auth/login", { email, password, role });
    return res.data;
  },
  me: async () => {
    const res = await api.get("/api/v1/auth/me");
    return res.data;
  },
  register: async (payload) => {
    const res = await api.post("/api/v1/auth/register", payload);
    return res.data;
  },
};

export const ticketsAPI = {
  getAll: async (params = {}) => {
    const query = new URLSearchParams();
    if (params.status) query.append("status", params.status);
    if (params.severity) query.append("severity", params.severity);
    if (params.assignedToMe) query.append("assigned_to_me", "true");
    const qs = query.toString();
    const res = await api.get(`/api/v1/tickets${qs ? `?${qs}` : ""}`);
    return res.data;
  },

  create: async (payload) => {
    const res = await api.post("/api/v1/tickets", payload);
    return res.data;
  },

  getById: async (id) => {
    const res = await api.get(`/api/v1/tickets/${id}`);
    return res.data;
  },

  updateStatus: async (id, status) => {
    const res = await api.patch(`/api/v1/tickets/${id}/status`, { status });
    return res.data;
  },
};

export default api;