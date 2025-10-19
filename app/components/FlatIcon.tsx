import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FlatIcon = ({ focused, icon, title, color ="", className=""}: any) => {
   if(focused) {
    return (
    <ImageBackground
    className='absolute flex w-full justify-center items-center'
    >
        <Image source={icon} tintColor={color} className={className}/>
        {/* <Text className='text-black text-base font-semibold ml-2'>{title}</Text> */}
    </ImageBackground>
  )
  }
  return (
    <View className='size-full justify-center items-center mt-4 rounded-full'>
      <Image source={icon} tintColor='#A8B5DB' className={className}/>
    </View>
  )
}

export default FlatIcon
