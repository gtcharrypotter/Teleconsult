//@ts-ignore
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Header from '../components/layout/Header'
import { SafeAreaView } from 'react-native-safe-area-context'
import News from '../components/slides/News'
import { icons } from '@/constants/icons'
import { useRouter } from 'expo-router'
import useDataTable from '@/hooks/useDatatable'
import { useAuth } from '@/hooks/useAuth'

const Home = () => {
   const {user} = useAuth({
      middleware: "auth",
      // redirectIfAuthenticated: "/",
    });
    const router = useRouter();
    const data = [
      {
        image: require('../../assets/slides/img1.jpg')
      },
      {
        image: require('../../assets/slides/img2.jpg')
      },
      {
        image: require('../../assets/slides/img3.jpg')
      },
      {
        image: require('../../assets/slides/img4.jpg')
      }
      ,
      {
        image: require('../../assets/slides/img5.jpg')
      }
      ,
      {
        image: require('../../assets/slides/img6.jpg')
      }
      ,
      {
        image: require('../../assets/slides/img7.jpg')
      }
    ];
    const {
      data: patients,
      setData: setPatients,
      loading,
      page,
      setPage,
      meta,
      filters,
      paginate,
      setPaginate,
      setFilters,
    } = useDataTable({
      url: `/v1/patients`,
    });
    console.log('patient', user)
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className="flex gap-8">
        <View className="justify-center items-center">
           <News data={data}/>
        </View>
        <View className="flex flex-row gap-2 justify-center items-center">
          <Text className='text-4xl font-pextrabold'>What</Text>
          <Text className='text-4xl font-pextrabold text-sky-500'>Assistance</Text>
          <Text className='text-4xl font-pextrabold'>Can We</Text>
          <Text className='text-4xl font-pextrabold text-sky-500'>Provide?</Text>
        </View>
        <View className='flex gap-2'>
          <View className='flex flex-row gap-2 justify-center m-2'>
            <TouchableOpacity
              className='rounded-xl bg-blue-500 w-full justify-center items-center'
              onPress={() => router.push("/components/teleconsult/VideoConsultationForm")}
            >
               <View className='flex gap-4 justify-center items-center p-4'>
               <View>
               <Text className="text-center text-3xl text-white font-pbold">Video Consultation</Text>
               <Text className="text-center text-xl text-white font-plight">Schedule video Consulation</Text>
               </View>
                <Image source={icons.consultation_doctor} className="w-24 h-24"/>
              </View>
            </TouchableOpacity>
          </View>
          <View className='flex flex-row gap-2 m-2 justify-center'>
          {/* <TouchableOpacity
              className='rounded-lg bg-teal-500 w-52 justify-center items-center'
              onPress={() => router.push("/components/teleconsult/HomeDoctorForm")}
            >
              <View className='flex justify-center items-center p-2'>
              <View>
               <Text className="text-center text-xl text-white font-pbold">Report Crime</Text>
               <Text className="text-center text-lg text-white font-plight">Call a Police</Text>
               </View>
              <Image source={icons.house_doctor} className=" w-12 h-12" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className='rounded-lg bg-orange-500 w-52 justify-center items-center'
              onPress={() => router.push("/components/teleconsult/HomeNurseForm")}
            >
               <View className='flex gap-4 justify-center items-center p-2'>
               <View>
               <Text className="text-center text-xl text-white font-pbold">Report Fire</Text>
               <Text className="text-center text-lg text-white font-plight">Call Firefighter</Text>
               </View>
                <Image source={icons.nurse} className="w-12 h-12"/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              className='rounded-lg  bg-rose-500 w-52 justify-center items-center'
              onPress={() => router.push("/components/teleconsult/AmbulanceForm")}
            >
              <View className='flex gap-4 justify-center items-center p-2'>
              <View>
               <Text className="text-center text-xl text-white font-pbold">Report waste</Text>
               <Text className="text-center text-lg text-white font-plight">Call Waste Management</Text>
               </View>
              <Image source={icons.ambulance} className=" w-12 h-12" />
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              className='rounded-lg  bg-rose-500 w-full justify-center items-center'
              onPress={() => router.push("/components/teleconsult/AmbulanceForm")}
            >
              <View className='flex gap-4 justify-center items-center p-2'>
              <View>
               <Text className="text-center text-3xl text-white font-pbold">Call Ambulance</Text>
               <Text className="text-center text-lg text-white font-plight">Call ambulance for emergency</Text>
               </View>
              <Image source={icons.ambulance} className=" w-12 h-12" />
              </View>
            </TouchableOpacity>
            
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home