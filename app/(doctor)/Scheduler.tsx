import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  FlatList,
  Modal,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';
import Axios from '@/Service/Axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreateRoomModal from '../components/modal/CreateRoomModal';

// Time slots from 8:00 AM to 5:00 PM (30-min intervals)
const timeSlots = [
  '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM',
];

const Scheduler = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));
  const [viewMode, setViewMode] = useState('week');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const createRoomRef = useRef();
  const filteredAppointments = appointments.filter(
    (appt) => appt.date === selectedDate
  );
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const res = await Axios.get('/v1/teleconsult-control/schedules', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          // Format appointments to match your frontend model
          const formatted = res.data.data.map((item) => ({
            id: item.id.toString(),
            date: item.date_scheduled,
            time: item.time_scheduled,
            patient: {
              firstname: item.patientData?.firstname || '',
              lastname: item.patientData?.lastname || '',
              middlename: item.patientData?.middle || '',
            },
            doctor: {
              name: item.doctorData?.name || '',
            },
          }));
          console.log('Formatted Appointment Data:', formatted);
          setAppointments(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch schedules", err);
        Alert.alert('Error', 'Failed to load schedules.');
      }
    };
  
    fetchSchedules();
  }, []);
  const renderScheduleGrid = (datesToRender) => (
    
    <ScrollView horizontal>
      <View className="flex-row">
        {/* Time Column */}
        <View className="w-20">
          <View className="h-10" />
          {timeSlots.map((time) => (
            <View key={time} className="h-12 justify-center">
              <Text className="text-xs text-right pr-1">{time}</Text>
            </View>
          ))}
        </View>
  
        {/* Date Columns */}
        {datesToRender.map((day) => {
          const dateStr = day.format('YYYY-MM-DD');
          const label = day.format('ddd DD');
          
          return (
            <View key={dateStr} className="w-44 border-l border-gray-300">
              {/* Date Label */}
              <View className="h-10 items-center justify-center border-b border-gray-300 bg-blue-50">
                <Text className="font-bold text-sm">{label}</Text>
              </View>
  
              {/* Time Slots per Day */}
              {timeSlots.map((slotTime) => {
                  const matchingAppointments = appointments.filter(
                    (appt) =>
                      dayjs(appt.date).format('YYYY-MM-DD') === dateStr &&
                    dayjs(appt.time, 'HH:mm:ss').format('hh:mm A')
                  );

                  return (
                    <View
                      key={`${dateStr}-${slotTime}`}
                      className="h-14 border-b border-gray-200 px-1 justify-center"
                    >
                      {matchingAppointments.map((appt) => (
                      <View key={appt.id} className="rounded p-1 mb-1">
                        <TouchableOpacity
                          onPress={() => {
                            setSelectedAppointment(appt); // optional if needed elsewhere
                            createRoomRef.current?.show(appt); // pass appt to modal
                          }}
                          className="bg-blue-500 px-2 py-1 rounded mt-1 self-start"
                        >
                          <Text className="text-xs font-semibold">
                            {appt.patient.firstname} {appt.patient.lastname}
                          </Text>
                          {appt.doctor?.name && (
                            <Text className="text-[10px] italic text-gray-500">{appt.doctor.name}</Text>
                          )}
                          <Text className="text-white text-xs">Room</Text>
                        </TouchableOpacity>
                      </View>
                    ))}
                    </View>
                  );
                })}

            </View>
          );
        })}
      </View>
    </ScrollView>
  );
  const getDatesForWeek = () => {
    return Array.from({ length: 7 }, (_, i) =>
      dayjs(selectedDate).startOf('week').add(i, 'day')
    );
  };
  const getDatesForDay = () => {
    return [dayjs(selectedDate)];
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-6">
        <Text className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Consultation Schedule
        </Text>

        {/* View Toggle */}
        <View className="flex-row justify-center mb-4 space-x-2">
          {['month', 'week', 'day'].map(mode => (
            <TouchableOpacity
              key={mode}
              onPress={() => setViewMode(mode)}
              className={`px-4 py-2 rounded ${viewMode === mode ? 'bg-blue-500' : 'bg-gray-200'}`}
            >
              <Text className={viewMode === mode ? 'text-white' : 'text-gray-700'}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Calendar View */}
        {viewMode === 'month' && (
          <View>
            <Calendar
              onDayPress={(day) => setSelectedDate(day.dateString)}
              markedDates={{ [selectedDate]: { selected: true, selectedColor: '#00adf5' } }}
              theme={{
                selectedDayBackgroundColor: '#00adf5',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#00adf5',
                arrowColor: '#00adf5',
                monthTextColor: '#00adf5',
              }}
            />
            <View className="w-full flex-row justify-between items-center mb-4">
              <Text className="text-xl font-bold text-gray-800">
                Appointments on {selectedDate || '...'}
              </Text>
              
            </View>
              {selectedDate ? (
              filteredAppointments.length > 0 ? (
                <FlatList
                  data={filteredAppointments}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    console.log('Scheduled Item', item);
                    return (
                      <TouchableOpacity
                        className="w-full bg-blue-100 p-4 mb-2 rounded-lg"
                        onPress={() => {
                          setSelectedAppointment(item); // optional if needed elsewhere
                          createRoomRef.current?.show(item); // pass item to modal
                        }}
                      >
                        <View className='flex flex-row gap-2'>
                        <Text className=" text-2xl font-psemibold">
                          {item.patient?.firstname ?? ''} {item.patient?.middlename ?? ''} {item.patient?.lastname ?? ''} 
                        </Text>
                        <Text className="text-2xl text-gray-600 ml-auto font-psemibold">
                          Time: {item.time}
                        </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  
                />
              ) : (
                <Text className="text-gray-500">
                  No appointments for this day.
                </Text>
              )
            ) : (
              <Text className="text-gray-500">Select a date to view appointments.</Text>
            )}
          </View>
          
        )}
        
        
        {/* Weekly or Daily View */}
        {viewMode === 'week' && renderScheduleGrid(getDatesForWeek())}
        {viewMode === 'day' && renderScheduleGrid(getDatesForDay())}
      </View>
      <CreateRoomModal ref={createRoomRef} appointment={setSelectedAppointment}/>
    </SafeAreaView>
  );
};

export default Scheduler;
