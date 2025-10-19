import { Modal, View as RNView, Pressable, Animated, Text } from 'react-native'
import { useEffect, useRef } from 'react'

const CustomAlert = ({ visible, onClose }) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <RNView className="flex-1 bg-black/60 justify-center items-center">
        <Animated.View
          style={{ transform: [{ scale: scaleAnim }] }}
          className="bg-white p-8 rounded-2xl items-center w-[80%]"
        >
          <Text className="text-3xl font-pextrabold text-red-600 mb-4">
            ⚠️ Operation Alert
          </Text>
          <Text className="text-xl font-pmedium text-center mb-6">
            The operation will start in 5 minutes. Please prepare the patient and the team.
          </Text>
          <Pressable
            onPress={onClose}
            className="bg-red-600 px-6 py-2 rounded-full"
          >
            <Text className="text-white font-psemibold">Dismiss</Text>
          </Pressable>
        </Animated.View>
      </RNView>
    </Modal>
  );
};
export default CustomAlert