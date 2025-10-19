import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import useDataTable from '@/hooks/useDatatable';
import Table from '../Table';
import MedicineOrderModal from '../modal/MedicineOrderModal';
import { icons } from '@/constants/icons';
import { formatDate, formatDateMMDDYYYYHHIIA } from '@/app/lib/helpers';
import MedicineTakeModal from '../modal/MedicineTakeModal';
import MedicineNurseNotesModal from '../modal/MedicineNurseNotesModal';

const MedicinesOrder = ({appointment, patient, allowCreate = true,}) => {
    const {user, checkUserType} = useAuth();
    const medicinesOrderRef = useRef();
    const medicinesTakeRef = useRef();
    const medicinesNotesRef = useRef();
    const {
        data,
        setData,
        loading,
        setLoading
    } = useDataTable({
        url: `v1/hospital/admission-medicines/${appointment?.id}`,
		defaultFilters: {
			type: [
				"admission",
			],
			appointment_id:appointment?.id,
			// key: uniq_id,
		},
    })
    const isDoctor = () => {
    return String(user?.type || '').toLowerCase().includes('doctor')
    }
    console.log("Doctor Specialty", user)
  return (
    <View className="flex flex-col gap-4">
        <View className='flex flex-row gap-4'>
                    <Text className='text-3xl font-psemibold'>Medicines</Text>
                    <View>{isDoctor() && allowCreate && (
                      // <ActionBtn title="Order Test" className="h-6" />
                      <TouchableOpacity
                      onPress={() => medicinesOrderRef.current?.show(
                        patient,
                        appointment,
                      )}
                      activeOpacity={0.7}
                      disabled={loading}
                      >
                          <Image source={icons.add} className='size-10 -top-2' tintColor='#15b0f9'/>
                      </TouchableOpacity>
                    )}</View>
                </View>
        <Table
        loading={loading}
        data={data}
        containerClassName="w-full"
        columns={[
          {
            header: 'Date',
            key: 'order_date',
            sortable: true,
            width: 150,
            cell: (data) => formatDate(new Date(data?.updated_at)),
          },
          {
            header: 'Generic Name',
            key: 'name',
            sortable: false,
            width: 500,
            cell: (data) => data?.item?.name || '—',
          },
          {
            header: 'Ordered',
            key: 'quantity',
            sortable: false,
            width: 100,
            cell: (data) => data?.quantity || '0',
          },
          {
            header: 'Taken',
            key: 'taken',
            sortable: false,
            width: 100,
            cell: (data) => data?.taken || '0',
          },
          {
            header: 'Action',
            key: 'action',
            sortable: true,
            width: 150,
            cell: (data) => {
              const status = data?.status?.toLowerCase();
              if (status == null) {
                return (
                  <View>
                    {checkUserType('NURSE') ? (
                      <TouchableOpacity
                        onPress={() => medicinesTakeRef.current?.show(data)}
                        activeOpacity={0.7}
                        disabled={loading}
                        className="flex-row items-center space-x-2"
                      >
                        <View className='flex-row gap-2'>
                          <Image source={icons.assessment} className="size-6" tintColor="#15b0f9" />
                          <Text className="text-[#15b0f9] text-xl font-psemibold">View</Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => medicinesNotesRef.current?.show(data)}
                        activeOpacity={0.7}
                        disabled={loading}
                        className="flex-row items-center space-x-2"
                      >
                        <View className='flex-row gap-2'>
                          <Image source={icons.notebook} className="size-6" tintColor="#05d67f" />
                          <Text className="text-[#05d67f] text-xl font-psemibold">Check</Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                );
              } else if (status == 'finished') {
                return (
                  <View>
                    {checkUserType('DOCTOR') ? (
                      <TouchableOpacity
                        onPress={() => medicinesNotesRef.current?.show(data)}
                        activeOpacity={0.7}
                        disabled={loading}
                        className="flex-row items-center space-x-2"
                      >
                        <View className='flex-row gap-2'>
                          <Image source={icons.notebook} className="size-6" tintColor="#05d67f" />
                          <Text className="text-[#05d67f] text-xl font-psemibold">Check</Text>
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <View>
                        {data?.status === 'finished' ? (
                            <Text className="text-2xl font-pregular text-orange-500">Finish</Text>
                        ) : (
                            <Text className="text-2xl font-pregular">{medicineData?.status ?? 'Pending'}</Text>
                        )}
                      </View>
                    )}
                  </View>
                );
              } else {
                return <Text className="text-gray-500">-</Text>;
              } 
            },
          }
        ]}
      />
      <MedicineOrderModal 
      ref={medicinesOrderRef}
      appointment={appointment}
      />
      <MedicineTakeModal 
      ref={medicinesTakeRef} 
      appointment={appointment}
      />
      <MedicineNurseNotesModal 
      ref={medicinesNotesRef}
      />
    </View>
  )
}

export default MedicinesOrder