import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import Axios from '@/Service/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await Axios.get('/v1/teleconsult-control/patient-messages', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          const messageData = res.data.message.map((mess) => ({
            id: mess.id.toString(),
            status: mess.status,
            message: mess.message,
            date: mess.date_scheduled,
            time: mess.time_scheduled,
            roomId: mess.channel_name, // used for signaling
            patient: {
              firstname: mess.patientData?.firstname || '',
              lastname: mess.patientData?.lastname || '',
              middlename: mess.patientData?.middle || '',
            },
          }));
          setMessages(messageData);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleJoin = (roomId) => {
    router.push({
      pathname: '/components/teleconsult/MeetingRoom',
      params: { roomId },
    });
  };

  const renderItem = ({ item }) => (
    <View className="mb-2 p-3 border border-gray-200 rounded-lg bg-gray-50">
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-gray-900 font-bold text-lg">
            {item.patient.firstname} {item.patient.lastname}
          </Text>
          <Text className="text-gray-700">Scheduled: {item.date} at {item.time}</Text>
          <Text className="text-gray-700">Room: {item.roomId}</Text>
          <Text className="text-gray-700 mt-2">{item.message}</Text>
        </View>
        {item.status === 'start-consultation' && (
          <TouchableOpacity
            onPress={() => handleJoin(item.roomId)}
            className="bg-blue-600 px-4 py-2 rounded-xl"
          >
            <Text className="text-white font-semibold">Join Room</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-between p-4">
        <Text className="text-4xl font-pextrabold">Messages</Text>
      </View>
      <View className="p-4">
        {messages.length === 0 ? (
          <Text className="text-gray-500">No messages yet.</Text>
        ) : (
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Messages;
