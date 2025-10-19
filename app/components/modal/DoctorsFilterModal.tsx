import { View, Text, KeyboardAvoidingView, Platform, Modal, TouchableOpacity, Image, ActivityIndicator, FlatList } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BlurView } from 'expo-blur';
import { icons } from '@/constants/icons';
import Axios from '@/Service/Axios';

const DoctorsFilterModal = forwardRef((props, ref) => {
    const { appointment, patient, user, onSelectDoctor } = props;
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
     const [selectedDoctors, setSelectedDoctors] = useState([]);
    const [filterDoctors, setFilterDoctor] = useState([]);

    useImperativeHandle(ref, () => ({
        show,
        hide,
    }));
        
    const show = (data) => {
        setLoading(false);
        setVisible(true);
        getDoctors(data);
    };
    const hide = () => {
        setVisible(false);
    };
    const getDoctors = () => {
        const rhuId = 1; // default or fallback
        Axios.get(`v1/clinic/doctors-by-location?health_unit_id=${rhuId}`)
          .then((res) => {
            setFilterDoctor(res.data.data);
          });
      };
      console.log('doctors title', filterDoctors)
  return (
     <SafeAreaView>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : 'height'}>
            <Modal visible={visible} transparent animationType="fade">
                <BlurView intensity={100} tint="dark" className="flex-1 justify-center items-center">
                    <View className="flex-1 justify-center items-center w-full p-4">

                        <View className="bg-white rounded-xl w-3/4 max-h-full">
                            <View className="flex flex-row p-2 border-b">
                            <Text className="text-3xl font-psemibold m-4 mr-auto">
                                Doctors
                            </Text>
                            <TouchableOpacity
                                onPress={hide}
                                activeOpacity={0.7}
                                className="flex-row items-center space-x-2 mb-4 ml-auto"
                            >
                                <Image source={icons.circle_x} tintColor="#CC0000" className="w-8 h-8" />
                            </TouchableOpacity>
                            </View>
                            <View className="justify-center items-center">
                                {loading ? (
                                <ActivityIndicator size="large" color="#000" />
                                ) : (
                                <FlatList
                                    data={filterDoctors || []}
                                    numColumns={2}
                                    renderItem={({ item }) => (
                                    <TouchableOpacity
                                    onPress={() => {
                                        hide();
                                        onSelectDoctor?.(item); // show full profile
                                      }}
                                        className={`w-72 m-2 border rounded-xl p-4 ${
                                        selectedDoctors?.id === item.id
                                            ? 'border-blue-600 bg-blue-100'
                                            : 'border-gray-300 bg-white'
                                        }`}
                                    >
                                        <View className='flex flex-row'>
                                            <View>
                                                <Text className="text-lg font-semibold text-start">{item.title} {item.firstname} {item.lastname}</Text>
                                                <Text className="text-sm text-gray-600 text-start">{item.specialty?.name ?? 'General Practitioner'}</Text>
                                                <Text className="text-xs text-gray-500 text-start">{item.contact_number ?? 'No Contact Info'}</Text>
                                            </View>
                                            <Image source={icons.house_doctor} className="w-12 h-12 ml-auto" />
                                        </View>
                                    </TouchableOpacity>
                                    )}
                                    keyExtractor={(item) => item.id.toString()}
                                    ListEmptyComponent={
                                    <Text className="text-center text-gray-500">No Doctors Available.</Text>
                                    }
                                />
                                
                                )}
                            </View>
                            
                        </View>

                    </View>
                </BlurView>
            </Modal>
        </KeyboardAvoidingView>
     </SafeAreaView>
  )
}) 

export default DoctorsFilterModal