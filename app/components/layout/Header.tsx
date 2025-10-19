import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import useNetworkStatus from '@/hooks/useNetworkStatus';
import { images } from '@/constants/images';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Header = (props) => {
  const {user, logout} = props;
    const { isOnline } = useNetworkStatus();
    const navigation = useNavigation();
    
    const handleLogout = async () => {
    try {
        await AsyncStorage.clear(); 
        await logout();
    } catch (error) {
        console.error("Logout failed:", error);
    }
};
console.log("User", user)
  return (
    <View className="bg-blueDark">
        <View className='flex flex-row'>
            {/* <Image source={images.bg} className='w-12 h-12 '/> */}
            <View className="flex flex-col px-4">
                <Text className=" text-white text-lg font-bold">
                {/* {user?.title} {user?.firstname} {user?.lastname} */}
                {user?.name}
                </Text>
                <Text className=" text-white text-lg font-bold">
                {user?.healthUnit?.accreditation_number}
                </Text>
                <Text className={`text-sm font-semibold ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
                {isOnline ? 'Online' : 'Offline'}
                </Text>
            </View>
            <TouchableOpacity
                  onPress={handleLogout}
                  activeOpacity={0.7}
                  className="p-4 ml-auto"
                >
                  <Text className="text-white text-center font-bold">Logout</Text>
            </TouchableOpacity>
        </View>
     
    </View>
  )
}

export default Header