import { View, Text, SafeAreaView, TouchableOpacity, Image, TextInput, Modal, ActivityIndicator, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { BlurView } from 'expo-blur';
import { icons } from '@/constants/icons';
import Axios from '@/Service/Axios';
import ActionBtn from '../button/ActionBtn';
import { useForm } from 'react-hook-form';
import InputField from '../inputs/InputField';
import { Toast } from 'toastify-react-native';


const SuppliesOrderModal = forwardRef((props, ref) => {
  const {appointment, patient, onSuccess} = props;
    const [showData, setShowData] = useState(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedSupplies, setSelectedSupplies] = useState([]);
    const [filterSupplies, setFilterSupplies] = useState([]);
    const [supplies, setSupplies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [quantity, setQuantity] = useState('');
    const [sig, setSig] = useState('');
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
    
      const show = (data) => {
        setLoading(false);
        getSupplies(data);
        setVisible(true);
      };
      const hide = () => {
        setVisible(false);
        setSearchQuery('');
    };
    const getSupplies = () => {
		let health_unit_id =
			appointment?.bhs_id > 0 ? appointment?.bhs_id : appointment?.rhu_id;
		Axios.get(`v1/supplies-inventory?location_id=${health_unit_id}`).then(
			(res) => {
				setSupplies(res.data.data);
        setFilterSupplies(res.data.data);
			}
		);
	};
   const handleSearch = (text) => {
    const query = text.toLowerCase();
    setSearchQuery(text);
    const filtered = supplies.filter((supplies) =>
      supplies.name.toLowerCase().includes(query)
    );
    setFilterSupplies(filtered);
  };
  const submit = async () => {
    setLoading(true);
    if (!selectedSupplies || !quantity || parseInt(quantity) <= 0) {
    alert('Please select a medicine and enter a valid quantity.');
    setLoading(false);
    return;
  }
    try {
    let formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("appointment_id", appointment?.id);
    formData.append("supply[]", selectedSupplies?.id); 
    formData.append("code[]", selectedSupplies?.code);
    formData.append("quantity[]", quantity);
    formData.append("sig[]", sig); 
    console.log("Data:", formData);

    const response = await Axios.post(`/v1/hospital/admitted-supplies/${appointment?.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response?.data?.success) {
          Toast.success("Order created successfully.");
          onSuccess?.();
          setSelectedSupplies(null);
          setQuantity('');
          hide();
        } else {
          Toast.error("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.log('Submit error:', error);
        Toast.error("Failed to submit order. Please try again.");
      } finally {
        setLoading(false);
      }
  }
  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : 'height'}>
          <Modal visible={visible} transparent animationType="fade">
         <BlurView intensity={100} tint="dark" className="flex-1 justify-center items-center">
            <View className="flex-1 justify-center items-center w-full p-2">
                <View className="bg-white rounded-xl w-full max-h-full">
                    <View className="flex flex-col">
                    <View className="flex flex-row p-2 border-b">
                      <Text className="text-3xl font-psemibold m-4 mr-auto">
                        Order Supplies
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
                              placeholder="Search supply..."
                              value={searchQuery}
                              onChangeText={handleSearch}
                              className="border border-gray-300 rounded-md px-4 py-2"
                            />
                        </View>
                        <View className='flex-col gap-4'>
                          <View className="max-h-[40vh] justify-center items-center">
                              {loading ? (
                                <ActivityIndicator size="large" color="#000" />
                              ) : (
                                <FlatList
                                  data={filterSupplies || []}
                                  numColumns={3}
                                  renderItem={({ item }) => (
                                      <View className="">
                                      <TouchableOpacity
                                        onPress={() => {
                                          console.log("Selected Supply", item)
                                          setSelectedSupplies(item);
                                        }}
                                        className={`w-64 h-24 m-2 justify-center p-4 items-center rounded-xl ${
                                          selectedSupplies?.id === item.id
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
                          <View className="justify-center items-center">
                              <Text className="text-xl font-pmedium mb-2">Quantity</Text>
                              <View className="flex-row items-center justify-center space-x-4">
                                  <TouchableOpacity
                                  onPress={() => {
                                      setQuantity((prev) => {
                                      const newVal = Math.max(parseInt(prev || '0', 10) - 1, 0);
                                      return String(newVal);
                                      });
                                  }}
                                  className="w-10 h-10 items-center justify-center bg-gray-200 rounded-full"
                                  >
                                  <Text className="text-2xl font-bold">-</Text>
                                  </TouchableOpacity>
                                  <TextInput
                                  value={quantity}
                                  onChangeText={(text) => {
                                      const numericText = text.replace(/[^0-9]/g, '');
                                      setQuantity(numericText);
                                  }}
                                  keyboardType="numeric"
                                  inputMode="numeric"
                                  className="w-16 border border-gray-300 rounded-md px-3 py-2 text-center text-xl mx-2"
                                  />
                                  <TouchableOpacity
                                  onPress={() => {
                                      setQuantity((prev) => {
                                      const newVal = parseInt(prev || '0', 10) + 1;
                                      return String(newVal);
                                      });
                                  }}
                                  className="w-10 h-10 items-center justify-center bg-gray-200 rounded-full"
                                  >
                                  <Text className="text-2xl font-bold">+</Text>
                                  </TouchableOpacity>
                              </View>
                          </View>
                          <View className='justify-center items-center'>
                              <View className= "flex-row gap-2 items-center justify-center">
                                <Text className="text-lg font-pmedium">Sig:</Text>
                                <TextInput
                                  value={sig}
                                  onChangeText={setSig}
                                  placeholder="notes..."
                                  className="w-1/2 border border-gray-300 rounded-md px-3 py-2 text-xl"
                                />
                              </View>
                          </View>
                        </View>
                        
                        <View className='justify-center items-center'>
                          <ActionBtn 
                          title='Submit'
                          onPress={handleSubmit(submit)}
                          className="bg-success rounded-2xl m-4"
                          />
                        </View>
                    </View>
                    
                    </View>
                </View>
            </View>
         </BlurView>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
})

export default SuppliesOrderModal