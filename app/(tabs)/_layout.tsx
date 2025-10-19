import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Tabs } from 'expo-router'
import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
const TabIcon = ({ focused, icon, title, badgeCount = 0 }) => {
  return (
    <View className="relative justify-center items-center">
      {focused ? (
        <ImageBackground
          source={images.highlight3}
          className="flex flex-col flex-1 min-w-[190px] min-h-16 justify-center items-center rounded-full overflow-hidden"
        >
          <Image source={icon} tintColor="#FCFDFF" className="size-8" />
          <Text className="text-base font-semibold text-white">{title}</Text>
        </ImageBackground>
      ) : (
        <View className="size-full justify-center items-center rounded-full">
          <Image source={icon} tintColor="#15b0f9" className="size-7" />
        </View>
      )}

      {badgeCount > 0 && (
        <View className="absolute -top-1 -right-1 bg-red-600 rounded-full w-4 h-4 items-center justify-center z-50">
          <Text className="text-white text-xs font-bold">{badgeCount}</Text>
        </View>
      )}
    </View>
  );
};

const _layout = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {
    // fetch unread messages count from your API or socket
    setUnreadCount(5); // example
  }, []);
  return (
    <Tabs screenOptions={{ 
      tabBarShowLabel: false,
      tabBarItemStyle: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      },
      tabBarStyle: {
        borderRadius: 50,
        marginHorizontal: 20,
        marginBottom: 10,
        height: 60,
        position: "absolute",
        overflow: 'hidden',

    },
     }}>
        <Tabs.Screen 
        name='Home'
        options={{ 
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              // <FlatIcon focused={focused} icon={icons.home} color="#121010" className="size-5"/>
              <TabIcon focused={focused} icon={icons.home} title="Home"/>
            )
        }}
        />
        <Tabs.Screen 
        name='Records'
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.hospital_records} title="Records"/>
            )
        }}
        />
        <Tabs.Screen 
        name='Messages'
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
            focused={focused}
            icon={icons.messages}
            title="Messages"
            badgeCount={3} // Replace 3 with your actual unread message count
          />
            )
        }}
        />
        <Tabs.Screen 
        name='Profile'
        options={{ 
            headerShown: false,
             tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} icon={icons.user} title="Profile"/>
            )
        }}
        />
    </Tabs>
  )
}

export default _layout

