import { View, Text, StatusBar, Platform, Linking, AppState } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { CameraView } from 'expo-camera'
import Overlay from '../Overlay'
import { Stack, useRouter } from 'expo-router'
import Axios from '@/Service/Axios'

const ScanCode = () => {
  const qrLock = useRef(false)
  const appState = useRef(AppState.currentState)
  const router = useRouter();

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false
      }
      appState.current = nextAppState
    })

    return () => {
      subscription.remove()
    }
  }, [])
  const handleScanned = async (data) => {
    if (!qrLock.current) {
      qrLock.current = true;
      try {
        const response = await Axios.get(`/v1/opd-standalone/scan/${encodeURIComponent(data)}`);
        const appointmentData = response.data?.data;

        if (appointmentData) {
          router.push({
            pathname: '/components/patient/[id]',
            params: { data: encodeURIComponent(JSON.stringify(appointmentData)) },
          });
        } else {
          qrLock.current = false; // Unlock if no data received
        }
      } catch (error) {
        console.log("Invalid or expired QR", error);
        qrLock.current = false;
      }
    }
  };

  return (
    <View className="flex-1 bg-black">
      {/* Hide StatusBar on Android */}
      {Platform.OS === "android" && <StatusBar hidden />}

      {/* Camera Scanner */}
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        // onBarcodeScanned={({ data }) => {
        //   if (data && !qrLock.current) {
        //     console.log("data", data)
        //     qrLock.current = true
        //     setTimeout(async () => {
        //       await Linking.openURL(data)
        //     }, 500)
        //   }
        // }}
        onBarcodeScanned={({ data }) => handleScanned(data)}
      />
      <Overlay />
    </View>
  )
}

export default ScanCode
