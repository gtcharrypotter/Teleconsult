import { View, Text, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image, TextInput, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '@/constants/icons';

const Checkbox = ({
  labelStyle = '',
  label,
  containerStyle = '',
  inputStyle = '',
  className = '',
  errors = [],
  editable,
  value,
  onValueChange,
  showCheckIcon,
  ...props
}) => {
      const [isChecked, setIsChecked] = useState(value || false);
      useEffect(() => {
        setIsChecked(value || false); // sync external value to local state
      }, [value]);
      const toggleCheckbox = () => {
        if (!editable) return;
        const newValue = !isChecked;
        setIsChecked(newValue);
        if (onValueChange) {
          onValueChange(newValue);
        }
      };
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className='my-2 w-full'>
                    <TouchableOpacity
                        onPress={editable === false ? undefined : toggleCheckbox}
                        disabled={editable === false}
                        className={`flex flex-row items-center gap-x-3 rounded-lg ${containerStyle}`}
                        {...props}
                    >
                        <View className={`w-6 h-6 rounded border  items-center justify-center`}>
                        {isChecked && showCheckIcon && (
                          <Image source={icons.checked} className='size-6' />
                        )}
                        </View>
                        <Text className={`font-pregular text-[15px] ${className}`}>
                        {label}
                        </Text>
                    </TouchableOpacity>
                    
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
  )
}

export default Checkbox