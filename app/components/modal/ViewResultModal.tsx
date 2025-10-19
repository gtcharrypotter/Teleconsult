import { View, Text, ScrollView, SafeAreaView, Modal, TouchableOpacity, Image } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { BlurView } from 'expo-blur';
import { icons } from '@/constants/icons';

const ViewResultModal = forwardRef( (props, ref)=> {
    const {appointment} = props;
    const [showData, setShowData] = useState(null);
    const [visible, setVisible] = useState(false);
    useImperativeHandle(ref, () => ({
            show: show,
            hide: hide,
        }));
    const show = (data) => {
		setShowData(data);
		setVisible(true);
	};
	const hide = () => {
		setVisible(false);
	};
        console.log("Laboratory Result", showData);
    return (
    <ScrollView className='flex-1 bg-white'>
            <SafeAreaView>
                <Modal visible={visible} transparent animationType='fade' >
                    <BlurView intensity={100} tint="dark" className="flex-1 justify-center items-center">
                        <View className='flex-1 justify-center items-center w-full'>
                        <View className='bg-white p-5 rounded-xl w-3/4'>
                         <View className='flex flex-col gap-8'>
                            <View className='flex flex-row p-2 border-b'>
                            <Text className='text-3xl font-psemibold mb-4 mr-auto'>Laboratory Result</Text>
                            <TouchableOpacity
                            onPress={() => setVisible(false)}
                            activeOpacity={0.7}
                            className='flex-row items-center space-x-2 mb-4 ml-auto'
                            >
                            <Image source={icons.circle_x} tintColor="#CC0000" className='w-8 h-8'/>
                            </TouchableOpacity>
                            </View>
                            <View className='flex flex-col'>
                                {["GLUCOSE- FBS", "GLUCOSE- RBS"].includes(showData?.type?.name) && (
                                    <View className='flex flex-col gap-8'> 
                                        {/* header */}
                                        {/* <View className='flex flex-row gap-x-32'> 
                                            <Text className='text-lg font-psemibold'>Test</Text>
                                            <Text className='text-lg font-psemibold'>Result</Text>
                                            <Text className='text-lg font-psemibold'>Unit</Text>
                                            <Text className='text-lg font-psemibold'>Normal Value</Text>
                                        </View> */}
                                        {/* body */}
                                        <View className='flex flex-row gap-x-32'> 
                                            <Text className='text-lg font-psemibold'>{showData?.type?.name}</Text>
                                            <Text className='text-lg font-psemibold'>{showData?.fbs || showData?.rbs || '—'}</Text>
                                            <Text className='text-lg font-psemibold'>-</Text>
                                            <Text className='text-lg font-psemibold'>&lt; 99 mg/dL</Text>
                                        </View>
                                    </View>
                                )}
                            </View>
                         </View>
                            
                            
                        </View>
                        </View>
                    </BlurView>
                </Modal>
            </SafeAreaView>
        </ScrollView>
  )
});

export default ViewResultModal