"use client";
import axios from "axios";
import Cookies from "js-cookie";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKENDURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios interceptor to include Authorization token automatically
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Centralized error handling
const handleError = (error) => {
  if (error.response) {
    console.error("API Error:", error.response.data);
    // Handle specific errors, e.g., unauthorized
    if (error.response.status === 401) {
      // Handle token expiration, e.g., redirect to login
      Cookies.remove("authToken");
      window.location.href = "/login"; // Or handle this in a state management system
    }
  }
  throw error;
};

// GET request
export const getData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


// POST request with data
export const postData = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    console.log("response data : ", response.data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

