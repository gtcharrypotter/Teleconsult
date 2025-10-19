import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'

const Axios = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BACKEND_URL,
  withCredentials: false,
});

console.log("Backend URL:", process.env.EXPO_PUBLIC_BACKEND_URL);

Axios.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.clear();
      console.log("Session expired, logging out...");
    }
    return Promise.reject(error);
  }
);

export default Axios
