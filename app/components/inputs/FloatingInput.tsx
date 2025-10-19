import { Animated, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FlatIcon from '../FlatIcon';

const FloatingInput = ({
  label,
  value,
  onChangeText,
  icon,
  iconRight,
  onIconRightClick,
  error,
  className = "",
  inputClassName = "",
  ...props
}) => {
    const [isFocused, setIsFocused] = useState(false);
  const animatedLabel = new Animated.Value(value ? 1 : 0);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedLabel, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(!!value);
    if (!value) {
      Animated.timing(animatedLabel, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const labelStyle = {
    position: "absolute",
    left: 10,
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [14, -10],
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: isFocused ? "#1877F2" : "#aaa",
    backgroundColor: "white",
    paddingHorizontal: 5,
  };
  return (
    <View className={`relative w-full border-b pb-2 mt-4 ${className}`}>
      <Animated.Text style={labelStyle}>{label}</Animated.Text>
      <View className="relative flex items-center w-full">
        {icon && <View className="absolute left-2">{icon}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`w-full text-lg pt-4 pb-2 text-gray-900 ${
            icon ? "pl-10" : "pl-3"
          } ${inputClassName}`}
          {...props}
        />
        {iconRight && (
          <TouchableOpacity
            onPress={onIconRightClick}
            className="absolute right-2"
          >
            <FlatIcon icon={iconRight} className="text-slate-500" />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="mt-1 text-sm text-red-600">{error}</Text>}
    </View>
  )
}

export default FloatingInput
