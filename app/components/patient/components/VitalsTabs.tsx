import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

type Tab = {
  label: string;
  key: string;
};

type TabGroupProps = {
  tabs: Tab[];
  onTabChange?: (key: string) => void;
};

const VitalsTabs: React.FC<TabGroupProps> = ({tabs, children = {}, onTabChange}) => {
    const [activeTab, setActiveTab] = useState(tabs[0]?.key);

    const handlePress = (key: string) => {
        setActiveTab(key);
        onTabChange?.(key);
    }
    return (
    <View className="m-4 flex flex-row gap-4">
        <View className="flex-col gap-4">
        {tabs.map(tab => {
            const isActive = activeTab === tab.key;
            return (
            <TouchableOpacity
                key={tab.key}
                className={`flex-1 p-3 items-center mx-1 justify-center ${isActive ? 'bg-purple-600 rounded-xl' : 'bg-gray-200 rounded-xl'}`}
                onPress={() => handlePress(tab.key)}
                >
                <Text className={`${isActive ? 'text-white font-semibold' : 'text-black'}`}>
                    {tab.label}
                </Text>
                </TouchableOpacity>
            );
        })}
        </View>
    <View className='mt-4'>
        {children[activeTab]}
    </View>
    </View>
    
  )
}

export default VitalsTabs