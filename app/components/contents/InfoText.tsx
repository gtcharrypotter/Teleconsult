import { View, Text, Image } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const InfoText = ({
    className = "",
    valueClassName = "",
    label,
    icon,
    value
}) => {
  return (
    <View className={`flex flex-col ${className}`}>
      {label ? (
        <Text className='text-slate-800 text-3xl capitalize mb-1 text-psemibold'>{label}</Text>
      ) : (
        ""
      )}
      <View className='flex flex-row items-center mb-0 gap-2'>
            <Image source={icons.right_arrow_down} className='w-[24px] h-[24px] text-slate-600 ml-2'/>
            <Text className={`capitalize gap-2 text-slate-900 flex text-2xl font-plight ${valueClassName}`}>{value} &nbsp;</Text>
      </View>
    </View>
  )
}

export default InfoText