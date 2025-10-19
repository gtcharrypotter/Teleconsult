import { View, Text, Image, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import UserImage from './user';
import {formatDate} from '@/app/lib/helpers';
import Header from '../layout/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionBtn from '../button/ActionBtn';
const UserProfile = ({user, logout}) => {
    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    console.log('user avatar', user)
  return (
    <SafeAreaView className='flex-1 bg-white'>
        <View className='flex flex-col'>
            <View className='flex flex-col justify-center items-center gap-4'>
                <UserImage 
                    type="user"
                    name={`${user?.lastname}-${user?.firstname}-${user?.middle}`}
                    src={user?.avatar || ""}
                    className="h-48 w-48 rounded-xl border"
                    key={`key-${user?.id}-${user?.avatar}`}
                />
                <View className='flex flex-col justify-center items-center'>
                <Text className='text-4xl font-pextrabold'>{user?.title} {user?.firstname} {user?.lastname}</Text>
                <Text className='text-2xl font-pextrathin'>PTR No.: {user?.ptr_number}</Text>
                </View>
            </View>
            <View className='flex gap-4 p-12'>
                {/* <Text className='text-2xl font-pextrathin'>Age: {formatDate(user?.ptr_number)}</Text> */}
                {/* <Text className='text-2xl font-pextrathin'>Gender: {user?.ptr_number}</Text> */}
                <Text className='text-2xl font-pextrathin'>PTR No.: {user?.email}</Text>
                <Text className='text-2xl font-pextrathin'>Address: {user?.street}, {user?.purok}, {user?.barangay}, {user?.municipality}, {user?.province}, {user?.region}</Text>
                <Text className='text-2xl font-pextrathin'>Accreditation No: {user?.accreditation_number}</Text>
                
            </View>
            <ActionBtn 
                title='Logout'
                bgType="foreground"
                onPress={handleLogout}
                textStyles="primary"
                className="text-center font-bold"
            />
        </View>
        
    </SafeAreaView>
  )
}

export default UserProfile