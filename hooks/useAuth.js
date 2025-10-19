import Axios from '@/Service/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Toast } from 'toastify-react-native'



// Set Auth Token Automatically
Axios.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Custom Hook
export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
  const navigation = useNavigation();
  const [doctors, setDoctors] = useState([]);
  const { data: user, error, mutate } = useSWR(
    () => AsyncStorage.getItem("token").then(token => token ? "/v1/profile/patient-data" : null),
    async () => {
      const response = await Axios.get("/v1/profile/patient-data");
      return response.data?.data;
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    }
  );

  const {data: patientUser} = useSWR(
    () => AsyncStorage.getItem("token").then(token => token ? "/v1/profile/patient-data" : null),
    async () => {
      const response = await Axios.get("/v1/profile/patient-data");
      return response.data?.data;
    },
    {
      revalidateIfStale: false,
      revalidateOnFocus: true,
      shouldRetryOnError: false,
    }
  );

  // Login User
  const login = async ({ data, setErrors, setStatus }) => {
    try {
      const result = await Axios.post("/teleconsult", data);

      if (result.data[0]?.token) {

        const userType = result.data[0].type;
        
        await AsyncStorage.setItem("token", result.data[0].token);
        await AsyncStorage.setItem("user", JSON.stringify(result.data[0].user));
        await AsyncStorage.setItem("type", result.data[0].type);

        setStatus("success");
        await mutate();
        Toast.success('Login Success')
        // navigation.push("(tabs)");
        if (userType === "HIS-DOCTOR") {
          navigation.push("(doctor)");
        } else {
          navigation.push("(tabs)");
        }
      }
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(Object.values(error.response.data.errors).flat());
        Toast.error('Invalid Credentials!')
      } else {
        console.error(error);
      }
    }
  };

  // Logout User
  const logout = async () => {
    try {
      await AsyncStorage.clear();
      Toast.success("Logged out successfully");
      mutate(null);
      // Navigate to auth stack
      navigation.reset({
        index: 0,
        routes: [{ name: "(auth)" }],
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  const userType = () => String(user?.type || "").toLowerCase();
  const checkUserType = (type) =>
    userType() === "his-emergency" && String(type).toLowerCase() === "nurse"
      ? true
      : userType().includes(String(type).toLowerCase());
  const userSpecialty = () => {
    return String(user?.speciality?.name).toLowerCase();
  }
  const checkUserSpeciality = (type) => {
		return String(userType()).includes(String(type).toLowerCase());
	};

  return {
    user,
    patientUser,
    login,
    logout,
    mutate,
    userType,
    checkUserType,
    doctors,
    checkUserSpeciality,
  };
};
