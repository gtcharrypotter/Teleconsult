import { View, Text, useWindowDimensions } from 'react-native'
import React from 'react'

export default function useResponsiveTabStyle() {
    const { width } = useWindowDimensions()
  if (width < 768) {
    // sm
    return {
      backgroundColor: "#005d88",
      borderRadius: 40,
      marginHorizontal: 16,
      marginBottom: 24,
      height: 50,
      borderWidth: 1,
      borderColor: "#005d88",
    }
  } else if (width >= 768 && width < 1024) {
    // md
    return {
      backgroundColor: "#005d88",
      borderRadius: 50,
      marginHorizontal: 32,
      marginBottom: 30,
      height: 56,
      borderWidth: 1,
      borderColor: "#005d88",
    }
  } else {
    // lg / xl
    return {
      backgroundColor: "#005d88",
      borderRadius: 60,
      marginHorizontal: 64,
      marginBottom: 40,
      height: 60,
      borderWidth: 1,
      borderColor: "#005d88",
    }
  }
}