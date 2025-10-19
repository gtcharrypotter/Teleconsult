import { View, Text, Platform, KeyboardAvoidingView, Modal, TouchableOpacity, Image } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native';
import { BlurView } from 'expo-blur';
import { icons } from '@/constants/icons';
import ActionBtn from '../button/ActionBtn';

const MedicineNurseNotesModal = forwardRef((props, ref) => {
    const {appointment} = props;
        const [visible, setVisible] = useState(false);
        const [loading, setLoading] = useState(false);
        const [medicineData, setMedicineData] = useState(null);
        const [quantity, setQuantity] = useState('');
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
                setVisible(true);
                setMedicineData(data);
            };
            const hide = () => {
                setVisible(false);
                setMedicineData(null);
            };
            console.log('Admission Medicines', medicineData)
  return (
    <SafeAreaView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : 'height'}>
             <Modal visible={visible} transparent animationType="fade">
                <BlurView intensity={100} tint="dark" className="flex-1 justify-center items-center">
                    <View className="flex-1 justify-center items-center w-full p-4">

                        <View className="bg-white rounded-xl w-3/4 max-h-full">
                        <View className="flex flex-row p-2 border-b">
                          <Text className="text-3xl font-psemibold m-4 mr-auto">
                            Medicine Nurse Notes
                          </Text>
                          <TouchableOpacity
                            onPress={hide}
                            activeOpacity={0.7}
                            className="flex-row items-center space-x-2 mb-4 ml-auto"
                          >
                            <Image source={icons.circle_x} tintColor="#CC0000" className="w-8 h-8" />
                          </TouchableOpacity>
                        </View>
                        <View className='flex flex-col gap-4'>
                            <View className='flex flex-col gap-4 p-4'>
                            <View className='flex flex-col gap-2'>
                                <Text className="text-3xl font-psemibold">Medicine:</Text>
                                 <Text className="text-2xl font-pregular ml-8">{medicineData?.item?.name}</Text>
                            </View>
                            <View className='flex flex-col gap-2'>
                                <Text className="text-3xl font-psemibold">Notes:</Text>
                                <Text className="text-2xl font-pregular ml-8">{medicineData?.notes}</Text>
                            </View>
                            <View className='flex flex-col gap-2'>
                                <Text className="text-3xl font-psemibold">Status:</Text>
                                {medicineData?.status === 'finished' ? (
                                    <Text className="text-2xl font-pregular ml-8 text-orange-500">Finish</Text>
                                ) : (
                                    <Text className="text-2xl font-pregular ml-8">{medicineData?.status ?? 'Pending'}</Text>
                                )}
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

export default MedicineNurseNotesModal