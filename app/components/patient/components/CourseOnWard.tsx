import { View, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { icons } from '@/constants/icons'
import { formatDate } from '@/app/lib/helpers'
import Axios from '@/Service/Axios'
import CourseOnWardModal from '../../modal/CourseOnWardModal'

const CourseOnWard = ({ appointment, patient, allowCreate = true }) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState([])
  const wardNotesRef = useRef();

  const isDoctor = () => {
    return String(user?.type || '').toLowerCase().includes('doctor')
  }

  const wardNotes = async () => {
    try {
      setLoading(true)
      const res = await Axios.get(`v1/hospital/ward-notes/${appointment?.id}`)
      setCourses(res.data.data || [])
    } catch (error) {
      console.error("Error fetching ward notes", error)
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (appointment?.id) {
      wardNotes()
    }
  }, [appointment?.id])

  return (
    <View className='flex flex-col gap-8'>
      <View className='flex flex-row border-b gap-2 items-center'>
        <Text className='text-3xl font-psemibold'>Course on the Ward</Text>
        {isDoctor() && allowCreate && (
          <TouchableOpacity
            onPress={() => wardNotesRef.current?.show(
                        patient,
                        appointment,
                      )}
            activeOpacity={0.7}
            disabled={loading}
          >
            <Image source={icons.add} className='size-10 -top-2' tintColor='#15b0f9' />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <View className='mt-8 items-center'>
          <ActivityIndicator size="large" color="#15b0f9" />
        </View>
      ) : courses.length > 0 ? (
        <View className='flex flex-col gap-4'>
          {courses.map((course, index) => (
            <View key={index} className='flex flex-col p-4 border rounded-lg bg-white shadow-sm'>
              <Text className='text-lg text-gray-500'>{formatDate(course?.created_at)}</Text>
              <Text className='text-xl font-pmedium mt-2'>{course?.course_on_the_ward}</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text className='text-center text-gray-400 mt-4'>No course on the ward entries yet.</Text>
      )}
      <CourseOnWardModal 
      appointment={appointment}
      ref={wardNotesRef} 
      />
    </View>
  )
}

export default CourseOnWard
