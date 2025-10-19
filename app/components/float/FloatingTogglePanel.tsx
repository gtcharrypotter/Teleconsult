import React from 'react';
import { View, Dimensions, Text, ScrollView, SafeAreaView } from 'react-native';
import PatientProfile from '../patient/PatientProfile';
import PatientImage from '../patient/components/patient';
import { calculatAge, patientAddress } from '@/app/lib/helpers';
import TeleconsultTab from '../patient/components/TeleconsultTab';
import PatientVitals from '../vitals/PatientVitals';
import MedicinesOrder from '../pharmacy/MedicinesOrder';
import LaboratoryOrder from '../laboratory/LaboratoryOrder';
import ImagingOrder from '../imaging/ImagingOrder';
import AdmittedData from '../patient/AdmittedData';
import VitalCharts from '../vitals/VitalCharts';

const { width, height } = Dimensions.get('window');

const FloatingTogglePanel = ({ user }) => {
    console.log('Patient Data', user)
  return (
    <View
      className="bg-gray-100/95 rounded-tl-2xl rounded-bl-2xl items-center p-4"
      style={{
        width: width / 1,        // half screen width
        height: height / 1,      // half screen height
      }}
    >
    <ScrollView>
        <SafeAreaView className='flex-1'>
            <View className='flex flex-col gap-2 pt-8'>
                <View className='flex flex-col gap-2 justify-center items-center'>
                        <View className='relative aspect-square'>
                            <PatientImage
                                type="patient"
                                name={`${user?.patientData?.lastname}-${user?.patientData?.firstname}-${user?.patientData?.middle}`}
                                src={user?.patientData?.avatar || ""}
                                className="h-64 w-64 rounded-xl border"
                                key={`key-${user?.patientData?.id}-${user?.patientData?.avatar}`}
                            />
                        </View>
                        <View className='text-center justify-center items-center'>
                        <Text className={`text-3xl font-pmedium uppercase ${user?.patientData?.gender?.toLowerCase() == "male"
                                ? "text-blue-500"
                                : "text-pink-500"
                            }`}>{user?.patientData?.lastname}, {user?.patientData?.firstname} {user?.patientData?.middle}</Text>
                            <Text className={`text-xl mb-1 mt-1 font-bold flex items-center uppercase 
                            ${user?.patientData?.gender?.toLowerCase() == "male"
                                ? "text-blue-500"
                                : "text-pink-500"
                            }`}>{user?.patientData?.gender}</Text>
                            <Text className='text-xl text-black'>{calculatAge(user?.patientData?.birthday)} years old</Text>
                        <Text className='text-xl text-black'>{patientAddress(user?.patientData)}</Text>
                        </View>
                </View>
                <TeleconsultTab 
                    tabs={[
                        {key: 'history', label: 'Patient History'},
                        {key: 'vitals', label: 'Vitals'},
                        {key: 'medicine', label: 'Medicine'},
                        {key: 'laboratory', label: 'Laboratory'},
                        {key: 'imaging', label: 'Imaging'}
                    ]}
                    onTabChange={(key) => console.log('Selected tab:', key)}
                    children={{
                        history: (
                            <View className="p-4">
                            {/* <AdmissionOrder /> */}
                                <AdmittedData  patient={user?.patientData}/>
                            </View>
                        ),
                        vitals: (
                        <View className="p-4 flex flex-col gap-8">
                            <PatientVitals
                            showTitle={false}
                            patient={user?.patientData}
                            />
                        </View>
                        ),
                        medicine: (
                        <View className="p-4">
                            <MedicinesOrder 
                            patient={user?.patientData}
                            />
                        </View>
                        ),
                        laboratory: (
                        <View className="p-4">
                            <LaboratoryOrder 
                            laboratory_test_type={2}
                            patient={user?.patientData}
                            />
                        </View>
                        ),
                        imaging: (
                        <View className="p-4">
                            <ImagingOrder
                            laboratory_test_type={1}
                            patient={user?.patientData}
                            />
                        </View>
                        ),
                    }}
                />
            </View>
            
        </SafeAreaView>
    </ScrollView>
     
    </View>
  );
};

export default FloatingTogglePanel;
