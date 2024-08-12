import axios from "axios";

export const baseURL = "http://localhost:7070/api/v1";

export const imageURL =
  baseURL === "http://localhost:7070/api/v1" ? "http://localhost:7070" : "";
const baseUrlres = baseURL === "http://localhost:7070/api/v1" ? "http://localhost:7070/api/v1" : "/api/v1";
const axiosInstance = axios.create({
  baseURL: baseUrlres,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response &&
        error.response.status === 500 &&
        error.response.data.message === "jwt expired") ||
      error.response.status === 401
    ) {
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
