import { View, Text, TouchableOpacity, Platform, ActivityIndicator, FlatList, Image, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import PatientProfile from '../patient/PatientProfile';
import { ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import InputField from '../inputs/InputField';
import InputAreaField from '../inputs/InputAreaField';
import ActionBtn from '../button/ActionBtn';
import Axios from '@/Service/Axios';
import DoctorsFilterModal from '../modal/DoctorsFilterModal';
import { icons } from '@/constants/icons';
import DoctorProfileModal from '../modal/DoctorProfileModal';
import { useAuth } from '@/hooks/useAuth';
import { Toast } from 'toastify-react-native';
import { router, useNavigation } from 'expo-router';

const VideoConsultationForm = () => {
  const {user} = useAuth({
        middleware: "auth",
        // redirectIfAuthenticated: "/",
      });
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<'date' | 'time'>('date');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const doctorFilterRef = useRef();
  const doctorProfileRef = useRef();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [notes, setNotes] = useState('');
  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const showMode = (currentMode) => {
    setMode(currentMode);
    setShow(true);
  };

  const formatDate = (dateObj: Date) => {
    return dateObj.toISOString().split('T')[0]; // "YYYY-MM-DD"
  };
  
  const formatTime = (dateObj: Date) => {
    return dateObj.toTimeString().split(' ')[0]; // "HH:MM:SS"
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };
  const showDoctorProfile = (doctor) => {
    doctorProfileRef.current?.show(doctor, handleDoctorSelect);
  };
  
  const handleSubmit = async () => {
    setLoading(true);
    if (!selectedDoctor) {
      Alert.alert("Please select a doctor.");
      return;
    }
    try {
        let formData = new FormData();
        // formData.append('_method', 'PATCH');
        formData.append('patient_id', user?.patientData?.id); // Assuming logged-in user is the patient
        formData.append('doctor_id', selectedDoctor.id);
        formData.append('date_scheduled', formatDate(date));
        formData.append('time_scheduled', formatTime(date));
        formData.append('reason_for_consultation', notes);
        const response = await Axios.post(`/v1/teleconsult-control/slot-reserved`, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        }
        );

        if (response?.data?.success) {
          Alert.alert(
              "Success",
              "Consultation Slot created successfully.",
              [
                {
                  text: "OK",
                  onPress: () => navigation.push("(tabs)"),
                },
              ]
            );
        } else {
          Alert.alert("Something went wrong. Please try again.");
        }
    }catch (error) {
      Alert.alert("Failed to submit order. Please try again.");
    }finally {
        setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-4">
      <View className="flex flex-col items-center w-full max-w-screen-md mx-auto py-6 space-y-6 gap-4">
        <PatientProfile patient={user?.patientData} />

        <View className="flex flex-row w-full gap-4">
          <TouchableOpacity
            onPress={() => showMode('date')}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 bg-gray-100"
          >
            <Text className="text-lg text-gray-800">{formatDate(date)}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => showMode('time')}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 bg-gray-100"
          >
            <Text className="text-lg text-gray-800">{formatTime(date)}</Text>
          </TouchableOpacity>
        </View>


        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onChange}
          />
        )}
        
        
        <InputAreaField
          placeholder="Reason for Consultation"
          className="w-full border border-gray-300 rounded-lg text-base p-3"
          value={notes}
          onChangeText={setNotes}
        />

            <View className="flex flex-row justify-center items-center w-full">
              <TouchableOpacity
                onPress={() => doctorFilterRef.current?.show()}
                activeOpacity={0.7}
                disabled={loading}
                className="w-full border border-gray-400 p-4 rounded-xl justify-center items-center bg-white"
              >
                {selectedDoctor ? (
                  <View className="flex flex-col items-center">
                    <Text className="text-xl font-psemibold text-center">
                      {selectedDoctor.title} {selectedDoctor.firstname} {selectedDoctor.lastname}
                    </Text>
                    <Text className="text-lg text-gray-600 text-center">
                      {selectedDoctor.specialty?.name ?? 'General Practitioner'}
                    </Text>
                  </View>
                ) : (
                  <Text className="text-xl font-psemibold text-center text-gray-700">
                    Select Doctor
                  </Text>
                )}
              </TouchableOpacity>
            </View>
        <ActionBtn
          title="Submit"
          onPress={handleSubmit}
          className="w-1/4 bg-primary py-4 rounded-2xl"
        />
      </View>
      <DoctorsFilterModal 
      ref={doctorFilterRef}
      onSelectDoctor={showDoctorProfile}
      />
      <DoctorProfileModal ref={doctorProfileRef} />
    </ScrollView>
  );
};

export default VideoConsultationForm;
