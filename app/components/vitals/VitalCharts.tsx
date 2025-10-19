import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import VitalsTabs from '../patient/components/VitalsTabs'
import BloodPressureChart from './components/BloodPressureChart'
import PulseChart from './components/PulseChart'
import GlucoseChart from './components/GlucoseChart'
import TemperatureChart from './components/TemperatureChart'
import RespirationChart from './components/RespiratoryChart'

const VitalCharts = ({patient, appointment}) => {
  return (
    <View className='mb-4'>
      <Text className='text-3xl font-pbold'>VitalCharts</Text>
      <VitalsTabs 
        tabs={[
          {key: 'blood_pressure', label: 'Blood Pressure'},
          {key: 'heart_rate', label: 'Heart Rate'},
          {key: 'respiratory', label: 'Respiratory Rate'},
          {key: 'temperature', label: 'Temperature'},
          {key: 'glucose', label: 'Glucose'},
        ]}
        onTabChange={(key) => console.log('Select Vitals', key)}
        children={{ 
          blood_pressure: (
            <View className='flex flex-col gap-2'>
              <Text className='text-xl font-pbold'>Blood Pressure</Text>
              <BloodPressureChart 
              patient={patient}
              appointment={appointment}

              />
            </View>
          ),
          heart_rate: (
            <View className='flex flex-col gap-2'>
              <Text className='text-xl font-pbold'>Heart Rate</Text>
              <PulseChart 
              patient={patient}

              />
            </View>
          ),
          respiratory: (
            <View className='flex flex-col gap-2'>
              <Text className='text-xl font-pbold'>Respiratory Rate</Text>
              <RespirationChart 
              patient={patient}
 
              />
            </View>
          ),
          temperature: (
            <View className='flex flex-col gap-2'>
              <Text className='text-xl font-pbold'>Temperature</Text>
              <TemperatureChart 
              patient={patient}

              />
            </View>
          ),
          glucose: (
            <View className='flex flex-col gap-2'>
              <Text className='text-xl font-pbold'>Glucose</Text>
              <GlucoseChart 
              patient={patient}
     
              />
            </View>
          ),
         }}
      />
    </View>
  )
}

export default VitalCharts