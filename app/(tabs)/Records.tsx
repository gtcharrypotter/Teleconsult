import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const Records = () => {
  return (
    <SafeAreaView className='flex-1 bg-white'>
        <View className="flex p-4">
            <Text className='text-4xl font-pextrabold'>Records</Text>
        </View>
    </SafeAreaView>
  )
}

export default Records