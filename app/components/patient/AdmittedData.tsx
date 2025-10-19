import { View, Text, Modal,  } from 'react-native'
import React, { useState } from 'react'
import { doctorName, doctorSpecialty, formatDateMMDDYYYYHHIIA } from '@/app/lib/helpers'
import AppointmentStatus from './components/AppointmentStatus'
import InfoText from '../contents/InfoText'
import Collapse from '../contents/Collapse'
import PatientHistory from './PatientHistory'
import PatientVitals from '../vitals/PatientVitals'

const AdmittedData = ({appointment, patient}) => {
  return (
      <View className='flex flex-col gap-8'>
              <View className='flex flex-row border-b'>
                  <Text className='text-3xl font-psemibold mr-auto'>Appointment Data</Text>
              </View>
              <View className='flex flex-col gap-8  border-b'>
                <View className='flex flex-row gap-40'>
                    <View className='flex flex-col gap-8'>
                      <InfoText 
                        className=''
                        label="Consultation Type"
                        value={appointment?.post_notes}
                      />
                      <InfoText 
                        className=''
                        label="Chief complaint"
                        value={appointment?.pre_notes}
                      />
                    </View>
                    <View className='flex flex-col gap-8'>
                    <InfoText 
                    className=''
                    label="Doctor"
                    value={
                      <View className='flex flex-col'>
                        <Text className='text-2xl font-plight'>{doctorName(appointment?.referredToDoctor)}</Text>
                        <Text className='text-xl font-pextralight'>{doctorSpecialty(appointment?.referredToDoctor)}</Text>
                      </View>
                    }
                    />
                    <InfoText 
                      className=''
                      label="Date"
                      value={formatDateMMDDYYYYHHIIA(new Date (appointment?.created_at))}
                    />
                </View>
                </View>
              </View>
              <View className=''>
                    <PatientHistory 
                    appointment={appointment}
                    patient={patient}
                    />
              </View>
          </View>
            
  )
}

export default AdmittedData