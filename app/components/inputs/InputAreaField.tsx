import { View, Text, Keyboard, TextInput, TouchableWithoutFeedback, Platform } from 'react-native';
import React, { useState } from 'react';

const InputAreaField = ({
  label,
  labelStyle,
  containerStyle,
  inputStyle,
  className,
  errors = [],
  ...props
}) => {
  const [inputHeight, setInputHeight] = useState(96); // Default height

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="w-full">
        {/* Label */}
        {label && (
          <Text className={`${labelStyle}`}>
            {label}
          </Text>
        )}

        {/* Input Box */}
        <View className={`rounded-lg  bg-white ${containerStyle}`}>
          <TextInput
            className={`font-pregular text-[15px] text-black ${inputStyle} ${className}`}
            multiline
            style={{ minHeight: 96, height: inputHeight }}
            textAlignVertical="top"
            autoCapitalize="none"
            onContentSizeChange={(e) =>
              setInputHeight(Math.max(96, e.nativeEvent.contentSize.height))
            }
            {...props}
          />
        </View>

        {/* Error Messages */}
        {errors.length > 0 && (
          <View className="mt-2">
            {errors.map((err, idx) => (
              <Text key={idx} className="text-red-500 text-sm">
                {err}
              </Text>
            ))}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InputAreaField;
