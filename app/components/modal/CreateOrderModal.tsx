import {
  View, Text, ScrollView, SafeAreaView, Modal, TouchableOpacity, Image, ActivityIndicator, FlatList, Alert, TextInput, Platform,} from 'react-native';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { BlurView } from 'expo-blur';
import { icons } from '@/constants/icons';
import { useForm } from 'react-hook-form';
import ActionBtn from '../button/ActionBtn';
import { formatDate, formatDateYYYYMMDD } from '@/app/lib/helpers';
import { Toast } from 'toastify-react-native'
import Axios from '@/Service/Axios';
import InputField from '../inputs/InputField';

const CreateOrderModal = forwardRef((props, ref) => {
  const { appointment, patient, onSuccess } = props;

  const [showData, setShowData] = useState(null);
  const [visible, setVisible] = useState(false);
  const [tests, setTests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [labType, setLabType] = useState("");
  const [selectedTest, setSelectedTest] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  const show = (data, appointmentData, type = null) => {
    setLoading(false);
    setLabType(type);
    getLaboratoryTests(type);
    setShowData(data);
    setTimeout(() => {
    if (appointmentData?.id) {
      setValue("appointment_id", appointmentData?.id);
    }
    setValue("order_date", formatDateYYYYMMDD(new Date())); // <--- sets to "now"
  }, 200);
    setVisible(true);
  };
  const hide = () => {
    setVisible(false);
    reset({
      laboratory_test_type: '',
      order_date: '',
      patient_id: '',
      appointment_id: '',
    });
    setSearchQuery('');
  };

  const getLaboratoryTests = (type) => {
    setLoading(true);
    Axios.get(`/v1/laboratory/tests/list?type=${type}`)
      .then((res) => {
        setTests(res.data.data);
        setFilteredTests(res.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch laboratory tests", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSearch = (text) => {
    const query = text.toLowerCase();
    setSearchQuery(text);
    const filtered = tests.filter((test) =>
      test.name.toLowerCase().includes(query)
    );
    setFilteredTests(filtered);
  };

  const submit = async (data) => {
  if (!selectedTest?.id) {
    Toast.error("Please select a test.");
    return;
  }

  try {
    let formData = new FormData();
    formData.append("laboratory_test_type", selectedTest.id);
    formData.append("order_date", data?.order_date);
    formData.append("patient_id", patient?.id);
    formData.append("appointment_id", data?.appointment_id);

    setLoading(true);
    console.log("Data:", formData);

    const response = await Axios.post(`/v1/doctor/laboratory-order/store`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response?.data?.success) {
      Toast.success("Order created successfully.");
      onSuccess?.(); 
    } else {
      Toast.error("Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error("Create order error:", error);
    Toast.error("Failed to create order. Please try again.");
  } finally {
    setLoading(false);
  }
};

  

  return (
    <SafeAreaView>
      <Modal visible={visible} transparent animationType="fade">
        <BlurView intensity={100} tint="dark" className="flex-1 justify-center items-center">
          <View className="flex-1 justify-center items-center w-full p-4">
            <View className="bg-white rounded-xl w-full max-h-full">
              <View className="flex flex-col">
                <View className="flex flex-row p-2 border-b">
                  <Text className="text-3xl font-psemibold m-4 mr-auto">
                    Order {labType === 'imaging' ? 'Imaging' : 'Laboratory'}
                  </Text>
                  <TouchableOpacity
                    onPress={hide}
                    activeOpacity={0.7}
                    className="flex-row items-center space-x-2 mb-4 ml-auto"
                  >
                    <Image source={icons.circle_x} tintColor="#CC0000" className="w-8 h-8" />
                  </TouchableOpacity>
                </View>
                <View className='flex flex-col gap-2'>
                  <View className="pl-8 pr-8">
                  
                    <InputField
                      placeholder="Search..."
                      value={searchQuery}
                      onChangeText={handleSearch}
                      className="border border-gray-300 rounded-md px-4 py-2"
                    />
                  </View>
                  <View className="max-h-[40vh] justify-center items-center">
                    {loading ? (
                      <ActivityIndicator size="large" color="#000" />
                    ) : (
                  
                          <FlatList
                            data={filteredTests || []}
                            numColumns={3}
                            renderItem={({ item }) => (
                                <View className="">
                                <TouchableOpacity
                                  onPress={() => {
                                    console.log("Selected Test", item)
                                    setSelectedTest(item);
                                  }}
                                  className={`w-64 h-24 m-2 justify-center p-4 items-center rounded-xl ${
                                    selectedTest?.id === item.id
                                      ? 'border-blue-600 bg-blue-400'
                                      : 'border-gray-300 bg-gray-200'
                                  }`}
                                >
                                  
                                  <Text className="text-center text-lg">{item.name}</Text> 
                                </TouchableOpacity>
                              </View>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            ListEmptyComponent={
                              <Text className="text-center text-gray-500">No tests found.</Text>
                            }
                          />
                    
                    )}
                  </View>
                  <View className='justify-center items-center'>
                    <ActionBtn 
                    title='Submit'
                    onPress={handleSubmit(submit)}
                    className="bg-success rounded-2xl m-2"
                    />
                  </View>
                </View>
                
              </View>
            </View>
          </View>
        </BlurView>
      </Modal>
    </SafeAreaView>
  );
});

export default CreateOrderModal;
