import { View, Text } from 'react-native'
import React from 'react'

const ContentTitle = ({title, children}) => {
  return (
    <View>
        <View className='flex items-center gap-4'>
            <Text className='text-4xl text-left font-pbold text-black'>{title}</Text>
            {children}
        </View>
        <View className="h-[1.5px] w-2/5 bg-indigo-300 mb-[0.5px]" />
		<View className="h-[1px] w-2/5 bg-red-300 mb-4" />
    </View>
    
  )
}

export default ContentTitle