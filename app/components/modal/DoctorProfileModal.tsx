import { View, Text, SafeAreaView, KeyboardAvoidingView, Modal, TouchableOpacity, Image, Platform } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { BlurView } from 'expo-blur';
import { icons } from '@/constants/icons';
import ActionBtn from '../button/ActionBtn';
import DoctorImages from '../doctor/doctor';

const DoctorProfileModal = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false);
    const [doctor, setDoctor] = useState(null);
    const [onConfirm, setOnConfirm] = useState(null);
  
    useImperativeHandle(ref, () => ({
      show: (selectedDoctor, onConfirmCallback) => {
        setDoctor(selectedDoctor);
        setOnConfirm(() => onConfirmCallback);
        setVisible(true);
      },
      hide: () => setVisible(false),
    }));
  
    const handleSelect = () => {
      if (onConfirm && doctor) {
        onConfirm(doctor); // pass back to form
      }
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
                    <Text className="text-3xl font-psemibold m-4 mr-auto">Doctor's Profile</Text>
                    <TouchableOpacity onPress={() => setVisible(false)} className="mb-4 ml-auto">
                      <Image source={icons.circle_x} tintColor="#CC0000" className="w-8 h-8" />
                    </TouchableOpacity>
                  </View>
                  <View className="justify-center items-center p-8">
                    {doctor && (
                      <View className="flex flex-col items-center gap-4">
                        <DoctorImages
                          type="user"
                          name={`${doctor.lastname}-${doctor.firstname}-${doctor.middle}`}
                          src={doctor.avatar || ""}
                          className="h-48 w-48 rounded-xl border"
                        />
                        <View className='items-center'>
                        <Text className="text-4xl font-pextrabold">{doctor.title} {doctor.firstname} {doctor.lastname}</Text>
                        <Text className="text-2xl font-pextrathin">PTR No.: {doctor.ptr_number}</Text>
                        <Text className="text-2xl font-pextrathin">Email: {doctor.email}</Text>
                        <Text className="text-2xl font-pextrathin">Address: {doctor.street}, {doctor.purok}, {doctor.barangay}, {doctor.municipality}, {doctor.province}, {doctor.region}</Text>
                        <Text className="text-2xl font-pextrathin">Accreditation No: {doctor.accreditation_number}</Text>
                        </View>
                        <ActionBtn
                          title='Confirm'
                          bgType="success"
                          onPress={handleSelect}
                          className="text-center font-bold"
                        />
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </BlurView>
          </Modal>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  });
  

export default DoctorProfileModal