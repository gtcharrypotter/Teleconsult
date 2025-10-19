import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'

const Messages = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hello, how are you?' },
        { id: 2, text: 'Don’t forget our meeting at 3 PM.' },
      ])
      const router = useRouter()
      const handleJoin = () => {
        router.push('/components/teleconsult/MeetingRoom')
      }
    
  return (
     <SafeAreaView className="flex-1 bg-white">
          <View className="flex-row items-center justify-between p-4">
            <Text className="text-4xl font-pextrabold">Messages</Text>
          </View>
          <View className="p-4">
            {Messages.length === 0 ? (
              <Text className="text-gray-500">No messages yet.</Text>
            ) : (
              <FlatList
                data={messages}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View className="mb-2 p-3 border border-gray-200 rounded-lg bg-gray-50">
                    <Text className="text-gray-800">{item.text}</Text>
                    <TouchableOpacity
                      onPress={handleJoin}
                      className="ml-auto bg-blue-600 px-4 py-2 rounded-xl mt-2"
                      activeOpacity={0.8}
                    >
                      <Text className="text-white text-base font-bold">Join Room</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
            )}
          </View>
        </SafeAreaView>
  )
}

export default Messages