import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'

const BackgroundLayout = ({children}) => {
  return (
    <View className="flex-1 justify-center items-center">
      <ImageBackground 
      source={images.bg}
      className='absolute w-3/4 h-1/2 opacity-5 '
      resizeMode='cover'
      />
      <View className='aboslute flex-1 justify-center items-center'>{children}</View>
    </View>
  )
}

export default BackgroundLayout
