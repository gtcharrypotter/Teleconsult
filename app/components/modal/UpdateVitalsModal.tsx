import { View, Text, SafeAreaView, KeyboardAvoidingView, Platform, Modal, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { BlurView } from 'expo-blur';
import ActionBtn from '../button/ActionBtn';
import { icons } from '@/constants/icons';
import Axios from '@/Service/Axios';
import { Toast } from 'toastify-react-native';
import { useForm } from 'react-hook-form';
import { calculateBMI, calculateBPMeasurement } from '@/app/lib/helpers';

const UpdateVitalsModal = forwardRef((props, ref) => {
    const {patient, appointment} = props;
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [systolic, setSystolic] = useState('');
    const [diastolic, setDiastolic] = useState('');
    const [pulse, setPulse] = useState('');
    const [respiratory, setRespiratory] = useState('');
    const [temperature, setTemperature] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [heart, setHeart] = useState('');
    const [regular, setRegular] = useState('');
    const [oxygen, setOxygen] = useState('');
    const [bpMeasure, setBpMeasure] = useState('');
    const [bmi, setBmi] = useState('');
    const {
      register,
      setValue,
      reset,
      watch,
      handleSubmit,
      formState: { errors },
    } = useForm();
    useImperativeHandle(ref, () => ({
        show,
        hide,
    }));
    useEffect(() => {
        const h = parseFloat(height);
        const w = parseFloat(weight);

        if (!isNaN(h) && !isNaN(w) && h > 0 && w > 0) {
            const result = calculateBMI(h, w);
            setBmi(`${result.bmi.toFixed(1)} (${result.status})`);
        } else {
            setBmi('');
        }
    }, [height, weight]);
    useEffect(() => {
        const systolics = parseFloat(systolic);
        const diastolics = parseFloat(diastolic);

        if (!isNaN(systolics) && !isNaN(diastolics) && systolics > 0 && diastolics > 0) {
            const result = calculateBPMeasurement(systolics, diastolics);
            setBpMeasure(`${result.result}`);
        } else {
            setBpMeasure('');
        }
    }, [systolic, diastolic]);


    const show = () => {
        setLoading(false);
        setVisible(true);
    };
    const hide = () => {
        setVisible(false);
    };
     const submit = async () => {
        setLoading(true);
        try {
            let formData = new FormData();
            formData.append("patient_id", patient?.id);
            formData.append("blood_systolic", systolic);
            formData.append("blood_diastolic", diastolic);
            formData.append("pulse", pulse);
            formData.append("respiratory", respiratory);
            formData.append("temperature", temperature);
            formData.append("bmi", bmi); 
            formData.append("height", height);
            formData.append("weight", weight);
            formData.append("heart_rate", heart);
            formData.append("regular_rhythm", regular);
            formData.append("oxygen_saturation", oxygen);
            if (appointment?.id) {
			formData.append("appointment_id", appointment?.id);
		    }
            const response = await Axios.post(`v1/patient-vitals/store`, formData, {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if (response?.data?.success) {
                  Toast.success("Order created successfully.");
                  setSystolic('');
                  setDiastolic('');
                  setPulse('');
                  setRespiratory('');
                  setTemperature('');
                  setHeight('');
                  setWeight('');
                  setHeart('');
                  setRegular('');
                  setOxygen('');
                } else {
                  Toast.error("Something went wrong. Please try again.");
                }
                hide();
        }catch (error) {
            console.log('Submit error:', error);
        }finally {
            setLoading(false);
        }
        
     }
    return (
        <SafeAreaView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : 'height'}>
                <Modal visible={visible} transparent animationType="fade">
                    <BlurView intensity={100} tint="dark" className="flex-1 justify-center items-center">
                        <View className="flex-1 justify-center items-center w-full p-4">

                            <View className="bg-white rounded-xl w-3/4 max-h-full">
                                <View className="flex flex-row p-2 border-b">
                                  <Text className="text-3xl font-psemibold m-4 mr-auto">
                                    Update Vital Signs
                                  </Text>
                                  <TouchableOpacity
                                    onPress={hide}
                                    activeOpacity={0.7}
                                    className="flex-row items-center space-x-2 mb-4 ml-auto"
                                  >
                                    <Image source={icons.circle_x} tintColor="#CC0000" className="w-8 h-8" />
                                  </TouchableOpacity>
                                </View>
                                <View className='flex-col justify-center items-center'>
                                    <View className="flex-row gap-8 p-4">
                                        <View className="">
                                            {[
                                                { label: 'Blood Pressure (SYSTOLIC)', placeholder: 'SYSTOLIC', value:systolic, onChangeText: setSystolic },
                                                { label: 'Height in cm', placeholder: 'Centimeter.', value:height, onChangeText: setHeight},
                                                { label: 'Pulse Rate', placeholder: 'Pulse Rate.', value:pulse, onChangeText: setPulse},
                                                { label: 'Respiratory Rate', placeholder: 'Respiratory Rate.', value:respiratory, onChangeText: setRespiratory},
                                                { label: 'Temperature', placeholder: '°C', value:temperature, onChangeText: setTemperature},
                                            ].map((input, index) => (
                                                <View key={index} className="mb-4">
                                                    <View className="flex-col gap-1 items-start justify-start">
                                                        <Text className="text-lg font-pmedium">{input.label}</Text>
                                                        <TextInput
                                                            placeholder={input.placeholder}
                                                            value={input.value}    
                                                            onChangeText={input.onChangeText}
                                                            className="w-40 h-14 border border-gray-300 rounded-lg text-[15px] font-pregular"
                                                        />
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                        <View className="">
                                            {[
                                                { label: 'Blood Pressure (DIASTOLIC)', placeholder: 'DIASTOLIC', value:diastolic, onChangeText: setDiastolic},
                                                { label: 'Weight in KG', placeholder: 'Kilograms.', value:weight, onChangeText: setWeight},
                                                { label: 'Heart Rate', placeholder: 'Heart Rate.', value:heart, onChangeText: setHeart},
                                                { label: 'Regular Rhythm', placeholder: 'Regular Rhythm.', value:regular, onChangeText: setRegular},
                                                { label: 'Oxygen saturation', placeholder: 'Oxegen Saturation.', value:oxygen, onChangeText: setOxygen},
                                            ].map((input, index) => (
                                                <View key={index} className="mb-4">
                                                    <View className="flex-col gap-1 items-start justify-start">
                                                        <Text className="text-lg font-pmedium">{input.label}</Text>
                                                        <TextInput
                                                            placeholder={input.placeholder}
                                                            value={input.value}    
                                                            onChangeText={input.onChangeText}
                                                            className="w-40 h-14 border border-gray-300 rounded-lg text-[15px] font-pregular"
                                                        />
                                                    </View>
                                                </View>
                                            ))}
                                        </View>
                                         <View className="">
                                            {[
                                                { label: 'BP Measurement', placeholder: '-', value: bpMeasure, onChangeText: setBpMeasure, editable: false },
                                                { label: 'BMI', placeholder: '-', value: bmi, onChangeText: setBmi, editable: false },
                                            ].map((input, index) => (
                                                <View key={index} className="mb-4">
                                                <View className="flex-col gap-1 items-start justify-start">
                                                    <Text className="text-lg font-pmedium">{input.label}</Text>
                                                    <TextInput
                                                    placeholder={input.placeholder}
                                                    value={input.value}
                                                    onChangeText={input.onChangeText}
                                                    editable={input.editable ?? true}
                                                    className="w-40 h-14 border border-gray-300 rounded-lg text-[15px] font-pregular bg-gray-100 text-gray-700"
                                                    />
                                                </View>
                                                </View>
                                            ))}
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
    );
});

export default UpdateVitalsModal;
