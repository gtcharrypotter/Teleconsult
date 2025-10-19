import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  LayoutChangeEvent,
} from 'react-native';
import { icons } from '@/constants/icons';

const Collapse = ({
  title = "",
  children,
  headerClassName = "",
  bodyClassName = "",
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const [contentHeight, setContentHeight] = useState(0);
  const animation = useRef(new Animated.Value(defaultOpen ? 1 : 0)).current;

  const toggle = () => {
    const toValue = open ? 0 : 1;
    setOpen(!open);
    Animated.timing(animation, {
      toValue,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;
    if (height !== contentHeight) {
      setContentHeight(height);
    }
  };

  const height = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, contentHeight],
  });

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View className="border border-blue-300 rounded-xl overflow-hidden">
      <TouchableOpacity
        className={`flex-row items-center p-4 ${headerClassName}`}
        onPress={toggle}
        activeOpacity={0.8}
      >
        <Text className="flex-1 text-base font-bold">{title}</Text>
        <Animated.Image
          source={icons.arrow_down}
          className="size-6"
          style={{ transform: [{ rotate }] }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Animated.View style={{ height }} className="overflow-hidden">
        <View
          className={`p-4 ${bodyClassName}`}
          onLayout={handleLayout}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, opacity: 0 }}
          pointerEvents="none"
        >
          {children}
        </View>
        <View className={`p-4 ${bodyClassName}`}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

export default Collapse;
