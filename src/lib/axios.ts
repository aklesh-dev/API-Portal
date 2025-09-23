import { queryClient } from "@/main";
import axios from "axios";

const axiosInstance = axios.create({
  //// baseURL: "/api",
  baseURL: import.meta.env.VITE_API_URL || "http://124.41.227.48:8099",
});

// Request Interceptor to attach the token
axiosInstance.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  const tokenType = sessionStorage.getItem("token_type") || "Bearer";
  if (token) {
    //// console.info("Attaching token to request headers:");
    config.headers.Authorization = `${tokenType} ${token}`;
  } else {
    console.error("No token found! ");
  }

  return config;
});


//  Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Something went wrong!";

    if (error?.response) {
      const status = error.response.status;

      switch (status) {
        case 400:
          message = "Bad request. Please check your input.";
          break;
        case 401:
          message = "Session expired! Please log in again.";
          sessionStorage.clear();
          queryClient.setQueryData(["user"], null);
          // //window.location.href = '/auth'
          break;
        case 403:
          message = "You are not authorized to perform this action.";
          break;
        case 404:
          message = "Data not found.";
          break;
        case 500:
          message = "Server error. Please try again later.";
          break;
        default:
          message =
            error.response.data?.message || `Unexpected error (${status}).`;
      }
    } else if (error?.request) {
      message = "No response from server. Please check your network.";
    } else {
      message = error.message || "Unknown error occurred.";
    }
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
