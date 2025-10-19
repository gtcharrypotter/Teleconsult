import { View, Text, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import PatientImage from './components/patient'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { calculatAge, formatDate, patientAddress } from '@/app/lib/helpers'

const PatientProfile = ({appointment, patient}) => {
  console.log("patient image", patient?.avatar)
  return (
            <View className='flex flex-col gap-2 justify-center items-center'>
              <View className='relative aspect-square'>
                <PatientImage 
                    type="patient"
                    name={`${appointment?.patient?.lastname}-${appointment?.patient?.firstname}-${appointment?.patient?.middle}`}
                    src={appointment?.patient_selfie || ""}
                    className="h-64 w-64 rounded-xl border"
                    key={`key-${appointment?.id}-${appointment?.patient_selfie}`}
                />
              </View>
                 <View className='text-center justify-center items-center'>
                   <Text className={`text-3xl font-pmedium uppercase ${patient?.gender?.toLowerCase() == "male"
                          ? "text-blue-500"
                          : "text-pink-500"
                      }`}>{patient?.lastname}, {patient?.firstname} {patient?.middle}</Text>
                    <Text className={`text-2xl mb-1 mt-1 font-bold flex items-center uppercase 
                      ${patient?.gender?.toLowerCase() == "male"
                          ? "text-blue-500"
                          : "text-pink-500"
                      }`}>{patient?.gender}</Text>
                      <Text className='text-xl text-black'>{calculatAge(patient?.birthday)} years old</Text>
                      <Text className='text-xl text-black'>{formatDate(patient?.birthday)}</Text>
                  <Text className='text-xl text-black'>{patientAddress(patient)}</Text>
                 </View>
            </View>

  )
}

export default PatientProfile