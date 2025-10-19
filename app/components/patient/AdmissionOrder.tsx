import { View, Text } from 'react-native'
import React, { useState } from 'react'
import InputAreaField from '../inputs/InputAreaField'
import SelectInputField from '../inputs/SelectInputField';
import ActionBtn from '../button/ActionBtn';
import Table from '../Table';

const AdmissionOrder = () => {
    const [remarks, setRemarks] = useState("");
    const [selected, setSelected] = useState([]);
    const headers = ['Item Information', 'Quantity'];
    const rows = [
        ['Paracetamol 500mg Tablet', '10'],
        ['Amoxicillin 250mg Capsule', '5'],
        ['Cefalexin 500mg Capsule', '3'],
    ];
  return (
    <View className='flex flex-col gap-8'>
      <InputAreaField
        label="Course on the Ward"
        placeholder="Enter your remarks here..."
        value={remarks}
        onChangeText={setRemarks}
        />
        <ActionBtn 
        title="Select Medicines" 
        // onPress={() => {
        //   router.push("/auth/Login");
        //  }}
        bgType="success"
        />
        <Table
            headers={headers}
            rows={rows}
            zebra
            columnStyles={['w-3/4', 'w-1/4']} // 👈 control column width here
        />
        <ActionBtn 
        title="Select Supplies" 
        // onPress={() => {
        //   router.push("/auth/Login");
        //  }}
        bgType="success"
        />
        <Table
            headers={headers}
            rows={rows}
            zebra
            columnStyles={['w-3/4', 'w-1/4']} // 👈 control column width here
        />
    </View>
    
  )
}

export default AdmissionOrder