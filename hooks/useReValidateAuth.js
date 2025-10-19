
import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from 'expo-router'
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useReValidateAuth = () => {
    const navigate = useNavigation();
    
    useEffect(() => {
        const user = await AsyncStorage.getItem("user");
        const parsedUser = user ? JSON.parse(user) : null;
         
        if (!parsedUser) {
            navigation.replace("Login");

        } else if (parsedUser?.type) {
            const userTypeRoute = parsedUser.type.toLowerCase();
            navigation.replace(userTypeRoute);
        }
    useReValidateAuth();
    }, [])
  return null;
}

export default useReValidateAuth