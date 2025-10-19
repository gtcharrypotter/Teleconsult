import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, Image } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { BlurView } from 'expo-blur'
import { icons } from '@/constants/icons'

const OperationScheduleModal = forwardRef((props, ref) => {
    const {patient, appointment} = props;
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    useImperativeHandle(ref, () => ({
            show,
            hide,
        }));
    
        const show = () => {
            setLoading(false);
            setVisible(true);
        };
        const hide = () => {
            setVisible(false);
        };
  return (
    <SafeAreaView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : 'height'}>
             <Modal visible={visible} transparent animationType="fade">
                <BlurView intensity={100} tint="dark" className="flex-1 justify-center items-center">
                    <View className="flex-1 justify-center items-center w-full p-4">

                        <View className="bg-white rounded-xl w-3/4 max-h-full">
                        <View className="flex flex-row p-2 border-b">
                          <Text className="text-3xl font-psemibold m-4 mr-auto">
                            Schedule a Operation
                          </Text>
                          <TouchableOpacity
                            onPress={hide}
                            activeOpacity={0.7}
                            className="flex-row items-center space-x-2 mb-4 ml-auto"
                          >
                            <Image source={icons.circle_x} tintColor="#CC0000" className="w-8 h-8" />
                          </TouchableOpacity>
                        </View>
                        </View>

                    </View>
                </BlurView>
             </Modal>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
})

export default OperationScheduleModal