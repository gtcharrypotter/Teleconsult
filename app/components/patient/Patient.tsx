import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import PatientProfile from './PatientProfile';
import AdmissionTabs from './components/AdmissionTabs';
import AdmittedData from './AdmittedData';
import PatientVitals from '../vitals/PatientVitals';
import LaboratoryOrder from '../laboratory/LaboratoryOrder';
import ImagingOrder from '../imaging/ImagingOrder';
import SuppliesOrder from '../pharmacy/SuppliesOrder';
import MedicinesOrder from '../pharmacy/MedicinesOrder';
import CourseOnWard from './components/CourseOnWard';
import VitalCharts from '../vitals/VitalCharts';
import { useAuth } from '@/hooks/useAuth';
import OperationSchedule from '../operation/OperationSchedule';
import AppointmentStatus from './components/AppointmentStatus';
import PatientOperation from '../operation/PatientOperation';

const Patient = ({appointment, patient}) => {
    const {user, checkUserType} = useAuth();
  return (
        <ScrollView>
          <SafeAreaView className='flex-1 bg-white'>
       <View className='flex flex-col gap-2 pt-8'>
          <PatientProfile 
          appointment={appointment}
          patient={patient}
          />
          <View className='justify-center items-center mt-4'>
             <Text className='text-3xl font-psemibold'><AppointmentStatus appointment={appointment}/></Text>
          </View>
          {appointment?.status === "pending-for-surgery" || appointment?.status === "pending-for-delivery" ? (
            <View className=''>
            <PatientOperation appointment={appointment} patient={patient}/>
          </View>
          ) : ("")}
          {user?.specialty?.name === "Anesthesiologist" || user?.specialty?.name === "Surgeon" || checkUserType("doctor") ? (
            <AdmissionTabs
            tabs={[
                  { key: 'appointment', label: 'Appointment' },
                  { key: 'vitals', label: 'Patient Vitals' },
                  // { key: 'operation', label: 'Operations' },
                  { key: 'chart', label: 'Vital Chart' },
                  { key: 'medicine', label: 'Medicines' },
                  { key: 'supplies', label: 'Supplies' },
                  { key: 'laboratory', label: 'Laboratory' },
                  { key: 'imaging', label: 'Imaging' },
                ]}
                onTabChange={(key) => console.log('Selected tab:', key)}
                children={{
                appointment: (
                      <View className="p-4">
                    {/* <AdmissionOrder /> */}
                        <AdmittedData appointment={appointment} patient={patient}/>
                      </View>
                ),
                vitals: (
                  <View className="p-4 flex flex-col gap-8">
                    <PatientVitals 
                    showTitle={false}
                    appointment={appointment}
                    patient={patient}
                    />
                    {/* <VitalCharts 
                    appointment={appointment}
                    patient={patient}
                    /> */}
                  </View>
                ),
                // operation: (
                //   <View className="p-4">
                //     <OperationSchedule 
                //     appointment={appointment}
                //     patient={patient}
                //     />
                //   </View>
                // ),
                chart: (
                   <View className="p-4">
                    <VitalCharts 
                    appointment={appointment}
                    patient={patient}
                    />
                   </View>
                ),
                medicine: (
                  <View className="p-4">
                    <MedicinesOrder 
                    appointment={appointment}
                    patient={patient}
                    />
                  </View>
                ),
                supplies: (
                  <View className="p-4">
                    <SuppliesOrder 
                    appointment={appointment}
                    patient={patient}
                    />
                  </View>
                ),
                laboratory: (
                  <View className="p-4">
                    <LaboratoryOrder 
                    laboratory_test_type={2}
                    appointment={appointment}
                    patient={patient}
                    />
                  </View>
                ),
                imaging: (
                  <View className="p-4">
                    <ImagingOrder 
                    laboratory_test_type={1}
                    appointment={appointment}
                    patient={patient}
                    />
                  </View>
                ),
              }}
          />
          ) : (
            <AdmissionTabs
            tabs={[
                  { key: 'appointment', label: 'Appointment' },
                  { key: 'vitals', label: 'Patient Vitals' },
                  { key: 'course', label: 'Course on Ward' },
                  { key: 'medicine', label: 'Medicines' },
                  { key: 'supplies', label: 'Supplies' },
                  { key: 'laboratory', label: 'Laboratory' },
                  { key: 'imaging', label: 'Imaging' },
                ]}
                onTabChange={(key) => console.log('Selected tab:', key)}
                children={{
                appointment: (
                      <View className="p-4">
                    {/* <AdmissionOrder /> */}
                        <AdmittedData appointment={appointment} patient={patient}/>
                      </View>
                ),
                vitals: (
                  <View className="p-4 flex flex-col gap-8">
                    <PatientVitals 
                    showTitle={false}
                    appointment={appointment}
                    patient={patient}
                    />
                    {/* <VitalCharts 
                    appointment={appointment}
                    patient={patient}
                    /> */}
                  </View>
                ),
                course: (
                  <View className="p-4">
                    <CourseOnWard 
                    appointment={appointment}
                    patient={patient}
                    />
                  </View>
                ),
                medicine: (
                  <View className="p-4">
                    <MedicinesOrder 
                    appointment={appointment}
                    patient={patient}
                    />
                  </View>
                ),
                supplies: (
                  <View className="p-4">
                    <SuppliesOrder 
                    appointment={appointment}
                    patient={patient}
                    />
                  </View>
                ),
                laboratory: (
                  <View className="p-4">
                    <LaboratoryOrder 
                    laboratory_test_type={2}
                    appointment={appointment}
                    patient={patient}
                    />
                  </View>
                ),
                imaging: (
                  <View className="p-4">
                    <ImagingOrder 
                    laboratory_test_type={1}
                    appointment={appointment}
                    patient={patient}
                    />
                  </View>
                ),
              }}
          />
          )}
       </View>
      </SafeAreaView>
        </ScrollView>
  )
}

export default Patient