import { View, Text, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, Image, TextInput, SafeAreaView } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { BlurView } from 'expo-blur';
import { icons } from '@/constants/icons';
import ActionBtn from '../button/ActionBtn';
import { useForm } from 'react-hook-form';
import InputAreaField from '../inputs/InputAreaField';
import { Toast } from 'toastify-react-native';
import Axios from '@/Service/Axios';

const MedicineTakeModal = forwardRef((props, ref) => {
    const {appointment} = props;
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [medicineData, setMedicineData] = useState(null);
    const [quantity, setQuantity] = useState('1');
    const [nurseNotes, setNurseNotes] = useState('');
    
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
            setNurseNotes(data?.notes || '');
        };
        const hide = () => {
            setVisible(false);
            setMedicineData(null);
             setNurseNotes('');
             setQuantity('1');
        };
        const submit = async() => {
            setLoading(true);
            try {
                let formData = new FormData();
                formData.append("_method", "PATCH");
                formData.append("quantity", quantity);
                formData.append("notes", nurseNotes);
                const response = await Axios.post(`/v1/hospital/nurse-notes/${medicineData?.id}`, formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    },
                }
                );

                if (response?.data?.success) {
                Toast.success("Order created successfully.");
                setQuantity('');
                hide();
                } else {
                Toast.error("Something went wrong. Please try again.");
                }
            }catch (error) {
                Toast.error("Failed to submit order. Please try again.");
            }finally {
                setLoading(false);
            }
        }
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
                            Doctor's Medicine Order
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
                                 <Text className="text-2xl font-pmedium ml-8">{medicineData?.item?.name}</Text>
                            </View>
                            <View className='flex flex-col gap-2'>
                                <Text className="text-3xl font-psemibold">Detail:</Text>
                                <Text className="text-xl font-pregular ml-8">{medicineData?.details}</Text>
                            </View>
                            <View className='flex flex-col gap-2'>
                                <Text className="text-3xl font-psemibold">Medicine Left:</Text>
                                <Text className="text-xl font-pregular ml-8">{medicineData?.quantity}</Text>
                            </View>
                        </View>
                        <View className='flex-col'>
                            <View className="justify-center items-center">
                                <Text className="text-xl font-pmedium mb-2">Quantity</Text>
                                <View className="flex-row items-center justify-center space-x-4">
                                    <TouchableOpacity
                                    onPress={() => {
                                        setQuantity((prev) => {
                                        const newVal = Math.max(parseInt(prev || '1', 10) - 1, 0);
                                        return String(newVal);
                                        });
                                    }}
                                    className="w-10 h-10 items-center justify-center bg-gray-200 rounded-full"
                                    >
                                    <Text className="text-2xl font-bold">-</Text>
                                    </TouchableOpacity>
                                    <TextInput
                                    value={quantity}
                                    onChangeText={(text) => {
                                        const numericText = text.replace(/[^0-9]/g, '');
                                        setQuantity(numericText);
                                    }}
                                    keyboardType="numeric"
                                    inputMode="numeric"
                                    className="w-16 border border-gray-300 rounded-md px-3 py-2 text-center text-xl mx-2"
                                    />
                                    <TouchableOpacity
                                    onPress={() => {
                                        setQuantity((prev) => {
                                        const newVal = parseInt(prev || '0', 10) + 1;
                                        return String(newVal);
                                        });
                                    }}
                                    className="w-10 h-10 items-center justify-center bg-gray-200 rounded-full"
                                    >
                                    <Text className="text-2xl font-bold">+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View className='p-4'>
                                <InputAreaField
                                    label="Notes"
                                    labelStyle="text-2xl font-pbold"
                                    value={nurseNotes}
                                    onChangeText={setNurseNotes}
                                    placeholder="notes..."
                                    className="w-full border border-gray-300 rounded-md text-xl"
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
                </BlurView>
             </Modal>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
})

export default MedicineTakeModal