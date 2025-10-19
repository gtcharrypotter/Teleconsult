import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import News from '../components/slides/News'
import useDataTable from '@/hooks/useDatatable';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

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
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View className="flex gap-8">
        <View className="justify-center items-center">
           <News data={data}/>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home