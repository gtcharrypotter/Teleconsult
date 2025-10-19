import { images } from "@/constants/images";

import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { router, useNavigation } from "expo-router";
import ActionBtn from "../components/button/ActionBtn";

const Welcome = () =>  {
  return (
    <SafeAreaView className='flex-1 bg-primary'>
        <View className="flex-1 justify-start items-center  gap-4">
          <Image source={images.background2} className="w-full opacity-45 z-0" resizeMode="contain"/>
            <View className="flex flex-col justify-center items-center gap-2">
              <Text className="text-white font-pblack text-3xl">Welcome!</Text>
              <View className="flex flex-col justify-center items-center gap-2">
                  <Text className="text-white font-pextrabold text-2xl">S H I M S</Text>
                  <Text className="text-white text-center font-pregular text-xl">Sarangani Hospital Information {"\n"} <Text>Management System</Text></Text>
                <ActionBtn
                title="Login to Hospital App" 
                onPress={() => {
                  router.push("/(auth)/Login");
                 }}
                bgType="success"
                />
              </View>
            </View>
        </View>
      
    </SafeAreaView>
    
  );
}
export default Welcome;