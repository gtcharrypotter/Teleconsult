import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { icons } from '@/constants/icons'
import OperationScheduleModal from '../modal/OperationScheduleModal'
import * as Notifications from 'expo-notifications';
import * as Haptics from 'expo-haptics';
import { Audio } from 'expo-av';
import CustomAlert from './CustomAlert'


const PatientOperation = ({ appointment, patient }) => {
  const { user } = useAuth()
  const operationSchedRef = useRef();
  const [timeLeft, setTimeLeft] = useState('')
  const [timerActive, setTimerActive] = useState(true)
  const [hasAlerted, setHasAlerted] = useState(false);
  const [showCustomAlert, setShowCustomAlert] = useState(false);

  const calculateTimeLeft = () => {
    if (!appointment?.operation_date || !appointment?.operation_time) {
      return ''
    }

    const operationDateTime = new Date(`${appointment.operation_date}T${appointment.operation_time}`)
    const now = new Date()
    const difference = operationDateTime.getTime() - now.getTime()

    if (appointment?.surgery_time_out !== null || appointment?.delivery_time_out !== null) {
      setTimerActive(false)
      return 'Operation Done'
    }

    if (difference <= 0) {
      setTimerActive(false)
      return 'Operation Started'
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return `${days}d ${hours}h ${minutes}m ${seconds}s`
  }
  const sendFiveMinuteAlert = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Operation Reminder',
        body: 'Operation will start in 5 minutes!',
        sound: true,
      },
      trigger: null, // Send immediately
    });
  };
  const playAlertSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../../assets/sounds/sound_alert.mp3') // Add a short alert sound in your assets folder
      );
      await sound.playAsync();
    } catch (error) {
      console.warn('Failed to play sound', error);
    }
  };

  const showAlarmAlert = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    playAlertSound(); // optional sound
    setShowCustomAlert(true);
  };
  useEffect(() => {
      if (!timerActive) return;

      setTimeLeft(calculateTimeLeft());

      const timer = setInterval(() => {
        if (!timerActive) {
          clearInterval(timer);
        } else {
          const newTimeLeft = calculateTimeLeft();
          setTimeLeft(newTimeLeft);

          const operationDateTime = new Date(`${appointment.operation_date}T${appointment.operation_time}`);
          const now = new Date();
          const differenceInSeconds = Math.floor((operationDateTime.getTime() - now.getTime()) / 1000);

          if (differenceInSeconds === 300 && !hasAlerted) {
            sendFiveMinuteAlert();
            showAlarmAlert();
            setHasAlerted(true);
          }
        }
      }, 1000);

      return () => clearInterval(timer);
    }, [
      appointment?.operation_date,
      appointment?.operation_time,
      appointment?.surgery_time_out,
      appointment?.delivery_time_out,
      timerActive,
      hasAlerted,
  ]);


  return (
    <View className="flex flex-col mt-4">
      <View className="flex-col justify-center items-center">
        <Text className="text-2xl font-psemibold">
          Remaining Time Before Operation Start
        </Text>
        <View className="flex-row">
          <Text className="text-3xl font-pextrabold text-red-700">
            {timeLeft}
          </Text>
        </View>
      </View>
      <OperationScheduleModal ref={operationSchedRef}/>
      <CustomAlert visible={showCustomAlert} onClose={() => setShowCustomAlert(false)} />
    </View>
  )
}

export default PatientOperation
