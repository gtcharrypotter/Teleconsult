import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Axios from '@/Service/Axios';
import ContentTitle from '../contents/ContentTitle';
import { formatDate, formatDateMMDDYYYYHHIIA } from '@/app/lib/helpers';
import Card from '../contents/Card';
import { icon_vitals } from '@/constants/vitals';
import { icons } from '@/constants/icons';
import UpdateVitalsModal from '../modal/UpdateVitalsModal';

const PatientVitals = ({patient, appointment, showTitle = true,}) => {
    const [loading, setLoading] = useState(true);
    const [vitals, setVitals] = useState(false);
    const updateVitalsRef = useRef();

    useEffect(() => {
        if (patient?.id) {
            getPatientVitals(patient);

        }
    }, [patient?.id])
    const getPatientVitals = (patientData) => {
        setLoading(true);
        Axios.get(`v1/patient-vitals/vital-signs/${patientData?.id}`)
        .then((res) => {
            setVitals(res.data.data || []);
        })
        .finally(() => {
            setTimeout(() => {
                setLoading(false);
            }, 1000)
        })
    }
  return (
    <ScrollView>
        <View className='flex flex-col items-start'>
      {showTitle ? (
        <ContentTitle title="Patient Vitals"/>
      ) : (
        <View className='flex-row items-center gap-4 pb-2'>
            {vitals?.updated_at ? (
                <View className='flex-row gap-4'>
                    <Text className='text-3xl'>
                    Last updated {" "}
                    {appointment?.vitals?.updated_at ? formatDateMMDDYYYYHHIIA(new Date(appointment?.vitals?.updated_at)) : ""}
                    </Text>
                    <View className='ml-auto'>
                        <TouchableOpacity
                        onPress={() => updateVitalsRef.current?.show(
                        patient,
                        appointment,
                        )}
                        activeOpacity={0.7}
                        disabled={loading}
                        >
                            <Image source={icons.update} className='size-10 ml-auto' tintColor='#15b0f9'/>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                ""
            )}
        </View>
      )}
      {loading ? (
        <View className="w-full flex flex-col justify-center items-center py-5">
            <Text className="text-base text-black mt-2">Loading...</Text>
            <ActivityIndicator size="large" color="#000" />
        </View>
        ) : appointment?.vital_id ? (
            <View className='flex flex-row flex-wrap items-start justify-start gap-2 w-full px-4'>
                <View className='flex flex-row gap-2'>
                    <Card
                    color='black'
                    title="Blood Pressure"
                    icon={icon_vitals.blood_pressure}
                    >
                    <View className='flex flex-row items-center justify-center gap-2 ml-2'>
                        <Text className='text-2xl text-darker'>
                            {appointment?.vitals?.blood_systolic}
                        </Text>
                        <Text className='text-2xl text-darker'>
                            /
                        </Text>
                        <Text className='text-2xl text-darker'>
                            {appointment?.vitals?.blood_diastolic}
                        </Text>
                        <Text className='text-placeholder text-xl'>
                            mmHG
                        </Text>
                    </View> 
                    </Card>
                    <Card
                    color='red'
                    title="Heart Rate"
                    icon={icon_vitals.heart_rate}
                    >
                    <View className='flex flex-row items-center justify-center gap-2 ml-2'>
                        <Text className='text-2xl text-darker'>
                            {appointment?.vitals?.pulse}
                        </Text>
                        <Text className='text-placeholder text-xl'>
                            bpm
                        </Text>
                    </View> 
                    </Card>
                </View>
                <View className='flex flex-row gap-2'>
                    <Card
                    color='blue'
                    title="Respiratory Rate"
                    icon={icon_vitals.respiratory}
                    >
                    <View className='flex flex-row items-center justify-center gap-2 ml-2'>
                        <Text className='text-2xl text-darker'>
                            {appointment?.vitals?.respiratory}
                        </Text>
                        <Text className='text-placeholder text-xl'>
                            bpm
                        </Text>
                    </View> 
                    </Card>
                    <Card
                    color='darkorange'
                    title="Temperature"
                    icon={icon_vitals.temperature}
                    >
                    <View className='flex flex-row items-center justify-center gap-2 ml-2'>
                        <Text className='text-2xl text-darker'>
                            {appointment?.vitals?.temperature}
                        </Text>
                        <Text className='text-placeholder text-xl'>
                            °C
                        </Text>
                    </View> 
                    </Card>
                </View>
                <View className='flex flex-row gap-2'>
                    <Card
                    color='green'
                    title="Height"
                    icon={icon_vitals.height}
                    >
                    <View className='flex flex-row items-center justify-center gap-2 ml-2'>
                        <Text className='text-2xl text-darker'>
                            {appointment?.vitals?.height}
                        </Text>
                        <Text className='text-placeholder text-xl'>
                            cm
                        </Text>
                    </View> 
                    </Card>
                    <Card
                    color='brown'
                    title="Weight"
                    icon={icon_vitals.weight}
                    >
                    <View className='flex flex-row items-center justify-center gap-2 ml-2'>
                        <Text className='text-2xl text-darker'>
                            {appointment?.vitals?.weight}
                        </Text>
                        <Text className='text-placeholder text-xl'>
                            kg
                        </Text>
                    </View> 
                    </Card>
                </View>
                <View className='flex flex-row gap-2'>
                    <Card
                    color='blue'
                    title="BMI"
                    icon={icon_vitals.weight}
                    >
                    <View className='flex flex-row items-center justify-center gap-2 ml-2'>
                        <Text className='text-2xl text-darker'>
                            {appointment?.vitals?.bmi}
                        </Text>
                        <Text className='text-placeholder text-xl'>
                            
                        </Text>
                    </View> 
                    </Card>
                    <Card
                    color='red'
                    title="Blood Type"
                    icon={icon_vitals.blood_donation}
                    >
                    <View className='flex flex-row items-center justify-center gap-2 ml-2'>
                        <Text className='text-2xl text-darker'>
                            {appointment?.vitals?.bloody_type == "undifined"
                            ? "N/A"
                            : appointment?.vitals?.bloody_type}
                        </Text>
                        <Text className='text-placeholder text-xl'>
                        </Text>
                    </View> 
                    </Card>
                </View>
                <View className='flex flex-row gap-2'>
                    <Card
                    color='red'
                    title="Covid 19"
                    icon={icon_vitals.swab}
                    >
                    <View className='flex flex-row items-center justify-center gap-2 ml-2'>
                        <Text className='text-2xl text-darker'>
                            {appointment?.vitals?.covid_19}
                        </Text>
                        <Text className='text-placeholder text-xl'>
                        </Text>
                    </View> 
                    </Card>
                    <Card
                    color='orange'
                    title="Tubercolosis"
                    icon={icon_vitals.tuberculosis}
                    >
                    <View className='flex flex-row items-center justify-center gap-2 ml-2'>
                        <Text className='text-2xl text-darker'>
                            {appointment?.vitals?.covid_19}
                        </Text>
                        <Text className='text-placeholder text-xl'>
                        </Text>
                    </View> 
                    </Card>
                </View>
            </View>
        ) : (
        ""
        )}
    </View>
    <UpdateVitalsModal 
    patient={patient}
    appointment={appointment}
    ref={updateVitalsRef} 
    />
    </ScrollView>
    
  )
}

export default PatientVitals