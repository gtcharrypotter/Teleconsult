import React from 'react';
import { View, Text, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const SelectInputField = ({
  label,
  placeholder = 'Select an option',
  items = [],
  value,
  onValueChange,
  error = '',
  labelClassName = '',
  pickerClassName = '',
}) => {
  return (
    <View className="my-2 w-full">
      {label && (
        <Text className={`mb-1 text-base text-gray-700 font-medium ${labelClassName}`}>
          {label}
        </Text>
      )}

      <RNPickerSelect
        onValueChange={onValueChange}
        value={value}
        items={items}
        placeholder={{ label: placeholder, value: null }}
        useNativeAndroidPickerStyle={false}
        style={{
          inputIOS: {
            paddingVertical: 12,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: '#d1d5db', // Tailwind border-gray-300
            borderRadius: 8,
            backgroundColor: '#f3f4f6', // Tailwind bg-gray-100
            color: 'black',
            fontSize: 16,
          },
          inputAndroid: {
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderColor: '#d1d5db',
            borderRadius: 8,
            backgroundColor: '#f3f4f6',
            color: 'black',
            fontSize: 16,
          },
        }}
      />

      {error ? (
        <Text className="text-red-500 mt-1 text-sm">{error}</Text>
      ) : null}
    </View>
  );
};

export default SelectInputField;
