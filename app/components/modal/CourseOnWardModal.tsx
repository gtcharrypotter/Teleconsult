import { View, Text, KeyboardAvoidingView, Modal, Platform, TouchableOpacity, Image, TextInput } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { BlurView } from 'expo-blur'
import { icons } from '@/constants/icons'
import ActionBtn from '../button/ActionBtn'
import { useForm } from 'react-hook-form'
import { Toast } from 'toastify-react-native'
import Axios from '@/Service/Axios'

const CourseOnWardModal = forwardRef((props, ref) => {
    const {appointment, patient, onSuccess} = props;
    const [visible, setVisible] = useState(false);
    const [showData, setShowData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [wardNotes, setWardNotes] = useState('');
    const {
          register,
          setValue,
          reset,
          handleSubmit,
          formState: { errors },
        } = useForm();
    useImperativeHandle(ref, () => ({
            show,
            hide,
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
            formData.append("appointment_id", appointment?.id);
            formData.append("course_on_the_ward", wardNotes);
            const response = await Axios.post(`/v1/hospital/course-ward-notes/${appointment?.id}`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            }
            );

            if (response?.data?.success) {
            Toast.success("Order created successfully.");
            onSuccess?.();
            setWardNotes('');
            hide();
            } else {
            Toast.error("Something went wrong. Please try again.");
            }
        }catch(error) {
            console.log('Submit error:', error);
            Toast.error("Failed to submit order. Please try again.");
        } finally {
            setLoading(false);
        }
    }
  return (
    <SafeAreaView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : 'height'}>
             <Modal visible={visible} transparent animationType="fade">
                <BlurView intensity={100} tint="dark" className="flex-1 justify-center items-center">
                    <View className="flex-1 justify-center items-center w-full p-4">
                         <View className="bg-white rounded-xl w-full max-h-full">
                            <View className="flex flex-col">
                                <View className="flex flex-row p-2 border-b">
                                  <Text className="text-3xl font-psemibold m-4 mr-auto">
                                    Order Medicine
                                  </Text>
                                  <TouchableOpacity
                                    onPress={hide}
                                    activeOpacity={0.7}
                                    className="flex-row items-center space-x-2 mb-4 ml-auto"
                                  >
                                    <Image source={icons.circle_x} tintColor="#CC0000" className="w-8 h-8" />
                                  </TouchableOpacity>
                                </View>
                                <View className='flex flex-col gap-2'>
                                    <View className='justify-center items-center'>
                                        <View className="flex-col gap-2 ">
                                        <Text className="text-lg font-pmedium">Course on the Ward</Text>
                                        <TextInput
                                            value={wardNotes}
                                            onChangeText={setWardNotes}
                                            placeholder="notes..."
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-xl"
                                        />
                                        </View>
                                    </View>
                                    
                                    <View className='justify-center items-center'>
                                    <ActionBtn 
                                    title='Submit'
                                    onPress={handleSubmit(submit)}
                                    className="bg-success rounded-2xl m-4"
                                    />
                                    </View>
                                </View>
                            </View>
                         </View>
                    </View>
                </BlurView>
             </Modal>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
})

export default CourseOnWardModal