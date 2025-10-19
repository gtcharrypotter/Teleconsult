import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import ActionBtn from '../components/button/ActionBtn';
import { useRouter } from 'expo-router';
import { images } from '@/constants/images';
import { useAuth } from '@/hooks/useAuth';
import InputField from '../components/inputs/InputField';
import { icons } from '@/constants/icons';


const Login = () => {
    const [errors, setErrors] = useState([]);
    const [status, setStatus] = useState(null);
    const router = useRouter();
    const { login } = useAuth({
      middleware: "guest",
    });
    const [form, setForm] = useState( {
      email: "",
      password: "",
    });
    const handleLogin =  async () => {
    await login({
      data: { email: form.email, password: form.password },
      setErrors,
      setStatus,
    });

     if (errors.length) {
        Alert.alert("Login Failed", errors.join("\n"));
      }
    };

  return (
      <ScrollView className="flex-1 bg-white">
          <View className="flex-1 bg-white">
            <View className='relative w-full h-[250px]'>
              <View className='flex-1 justify-center items-center gap-4'>
                <Image source={images.logo} className="w-24 h-24" resizeMode='contain' />
                <Text className='text-5xl font-pbold text-primary'>Welcome!</Text>
                <Text className='text-2xl font-pbold'>SIGN IN</Text>
              </View>
            </View>
              
              <View className='p-5'>
                  <InputField 
                  label="Email"
                  placeholder="example@gmail.com"
                  icon={icons.user}
                  value={form.email}
                  errors={errors?.email?.message}
                  autoCapitalize="none"
                  onChangeText={(value) => setForm({ ...form, email: value})}
                  />
                  <InputField 
                  label="Password"
                  placeholder="password"
                  icon={icons.lock}
                  value={form.password}
                  errors={errors?.password?.message}
                   autoCapitalize="none"
                  onChangeText={(value) => setForm({ ...form, password: value})}
                  secureTextEntry={true}
                  />
                  <ActionBtn 
                  title='Login'
                  onPress={handleLogin}
                  className="mt-6 bg-primary rounded-2xl"
                  />
              </View>
            
            
          </View>
        </ScrollView>
  )
}

export default Login
