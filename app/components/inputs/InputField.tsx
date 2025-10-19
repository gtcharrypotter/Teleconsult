import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Image, TextInput, Platform, Keyboard } from 'react-native'
import React from 'react'

const InputField = ({ 
  labelStyle, 
  label, 
  icon, 
  secureTextEntry = false, 
  containerStyle, 
  inputStyle, 
  iconStyle, 
  className, 
  errors = [],
  ...props
 }) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className='my-2 w-full'>
                <Text className={`text-lg font-pregular mb-3 ${labelStyle}`}>{label}</Text>
                <View className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-lg border border-neutral-100 focus:border-primary ${containerStyle}`}>
                    {icon && <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`}/>}
                    <TextInput
                    className={`rounded-lg p-4 font-pregular text-[15px] flex-1 ${inputStyle} text-left ${className}`}
                    secureTextEntry={secureTextEntry}
                    autoCapitalize='none'
                    {...props}
                    />
                    {errors.map((err) => {
                      return <Text className='text-red-700'>{err}</Text>
                    })}
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default InputField