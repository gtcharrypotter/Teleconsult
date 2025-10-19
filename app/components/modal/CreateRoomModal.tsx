import { View, Text, ScrollView, SafeAreaView, Modal, TouchableOpacity, Image, Alert } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { BlurView } from 'expo-blur';
import { icons } from '@/constants/icons';
import PatientImage from '../patient/components/patient';
import Axios from '@/Service/Axios';
import { useRouter } from 'expo-router';

const CreateRoomModal = forwardRef((props, ref) => {
    const [showData, setShowData] = useState(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    useImperativeHandle(ref, () => ({
            show: show,
            hide: hide,
        }));
    const show = (data) => {
        setLoading(false);
        setShowData(data);
        setVisible(true);
    };
    const hide = () => {
        setVisible(false);
    };
    const submit = async () => {
        setLoading(true);
        try {
          const formData = new FormData();
          formData.append("_method", "PATCH");
          const channelName = `${showData?.patient?.firstname?.toLowerCase()}`;
          formData.append("channel_name", channelName);
      
          const response = await Axios.post(
            `/v1/teleconsult-control/create-room/${showData?.id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          console.log('Create Room Response:', response.data);
          if (response?.data?.success || response.status === 200) {
            Alert.alert("Success", "Consultation Room created successfully.");
            hide();
            router.push({
              pathname: '/components/teleconsult/MeetingRoom',
              params: { roomId: channelName },
            });
          } else {
            Alert.alert("Something went wrong. Please try again.");
          }
        } catch (error) {
          console.log('Submit error:', error);
          Alert.alert("Failed to submit order. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      
  return (
     <ScrollView className='flex-1 bg-white'>
                <SafeAreaView>
                    <Modal visible={visible} transparent animationType='fade' >
                        <BlurView intensity={100} tint="dark" className="flex-1 justify-center items-center">
                            <View className='flex-1 justify-center items-center w-full'>
                            <View className='bg-white p-5 rounded-xl w-3/4'>
                             <View className='flex flex-col gap-8'>
                                <View className='flex flex-row p-2 border-b'>
                                <Text className='text-3xl font-psemibold mb-4 mr-auto'>Create Consultation Room</Text>
                                <TouchableOpacity
                                onPress={() => setVisible(false)}
                                activeOpacity={0.7}
                                className='flex-row items-center space-x-2 mb-4 ml-auto'
                                >
                                <Image source={icons.circle_x} tintColor="#CC0000" className='w-8 h-8'/>
                                </TouchableOpacity>
                                </View>
                                <View className='flex flex-col gap-4'>
                                <PatientImage
                                    type="patient"
                                    name={`${showData?.patient?.lastname}-${showData?.patient?.firstname}-${showData?.patient?.middle}`}
                                    src={showData?.patient?.avatar || ""}
                                    className="h-28 w-28 rounded-xl border justify-center items-center"
                                    key={`key-${showData?.patient?.id}-${showData?.patient?.avatar}`}
                                />
                                <View className='flex flex-col'>
                                <Text className="text-3xl font-semibold mb-2">
                                    Patient: {showData?.patient?.firstname} {showData?.patient?.lastname}
                                </Text>
                                <Text className="text-xl text-gray-600">
                                    Date: {showData?.date}
                                </Text>
                                <Text className="text-xl text-gray-600">
                                    Time: {showData?.time}
                                </Text>
                                </View>
                                </View>
                                <View className=''>
                                <TouchableOpacity 
                                className='w-1/4 bg-success p-4 rounded-xl ml-auto'
                                onPress={submit}
                                >
                                    <Text className="text-white text-2xl font-psemibold text-center">
                                      Confirm
                                    </Text>
                                </TouchableOpacity>
                                </View>
                             </View>
                                
                                
                            </View>
                            </View>
                        </BlurView>
                    </Modal>
                </SafeAreaView>
            </ScrollView>
  )
});

export default CreateRoomModal;