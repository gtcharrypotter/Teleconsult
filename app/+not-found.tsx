import { View, Text } from 'react-native'
import React from 'react'
import { Link, Stack } from 'expo-router'

const NotFoundScreen = () => {
  return (
    <>
    <Stack.Screen options={{ title: "Error 404!" }} />
    <View>
        
        <Link href="/(auth)/welcome" className='text-sm'>
            Back
        </Link>
    </View>
    </>
  )
}

export default NotFoundScreen