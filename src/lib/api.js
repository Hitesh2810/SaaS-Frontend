"use client";

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const tokenStore = {
  getAccess() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("accessToken");
  },
  getRefresh() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refreshToken");
  },
  set(access, refresh) {
    if (typeof window === "undefined") return;
    if (access) localStorage.setItem("accessToken", access);
    if (refresh) localStorage.setItem("refreshToken", refresh);
  },
  clear() {
    if (typeof window === "undefined") return;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("currentUser");
  }
};

const api = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json"
  }
});

let refreshPromise = null;

api.interceptors.request.use((config) => {
  const token = tokenStore.getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const status = error.response?.status;
    const refreshToken = tokenStore.getRefresh();

    if (status === 401 && refreshToken && !original?._retry) {
      original._retry = true;
      try {
        refreshPromise = refreshPromise || axios.post(`${API_URL}/auth/token/refresh/`, { refresh: refreshToken });
        const response = await refreshPromise;
        refreshPromise = null;
        tokenStore.set(response.data.access, response.data.refresh || refreshToken);
        original.headers.Authorization = `Bearer ${response.data.access}`;
        return api(original);
      } catch (refreshError) {
        refreshPromise = null;
        tokenStore.clear();
        if (typeof window !== "undefined") {
          window.location.href = window.location.pathname.startsWith("/user") ? "/user/login" : "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export function apiErrorMessage(error) {
  const data = error?.response?.data;
  if (!data) return error?.message || "Something went wrong.";
  if (typeof data === "string") return data;
  if (data.detail) return data.detail;
  const firstKey = Object.keys(data)[0];
  const firstValue = data[firstKey];
  if (Array.isArray(firstValue)) return `${firstKey}: ${firstValue[0]}`;
  return "Request failed. Please try again.";
}

export default api;
