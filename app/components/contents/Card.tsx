import { View, Text, Image } from 'react-native'
import React from 'react'

const Card = ({title, children, icon, color}) => {
  return (
    <View className=' rounded-xl flex flex-row items-center p-3 w-1/2 border-[2px] border-blue-300'>
      <View className='flex flex-col pb-3'>
        <Text className={`text-xl font-pbold text-gray-900 text-opacity-75 ${color}`}>{title}</Text>
        <View className='h-[8px] w-4/5 bg-blue-300 mb-[1px]'/>
         <View className='h-[2px] w-2/5 bg-red-300 mb-3'/>
         {children}
      </View>
      <View className='p-1 rounded-xl ml-auto'>
            <Image source={icon} className='size-24 object-contain'/>
      </View>
    </View>
  )
}

export default Card