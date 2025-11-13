import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Request failed";
    return Promise.reject(new Error(message));
  }
);

export const apiGet = (endpoint, params, config) =>
  apiClient.get(endpoint, {
    params,
    ...(config || {}),
  });

export const apiPost = (endpoint, payload, config) =>
  apiClient.post(endpoint, payload, config);

export const apiPut = (endpoint, payload, config) =>
  apiClient.put(endpoint, payload, config);

export const apiPatch = (endpoint, payload, config) =>
  apiClient.patch(endpoint, payload, config);

export const apiDelete = (endpoint, config) =>
  apiClient.delete(endpoint, config);

export default apiClient;
