import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import useDataTable from '@/hooks/useDatatable';
import Table from '../Table';
import { icons } from '@/constants/icons';
import { formatDate, formatDateMMDDYYYYHHIIA } from '@/app/lib/helpers';
import SuppliesOrderModal from '../modal/SuppliesOrderModal';

const SuppliesOrder = ({appointment, patient, allowCreate = true,}) => {
    const {user} = useAuth();
    const suppliesOrderRef = useRef();
    const {
        data,
        setData,
        loading,
        setLoading
    } = useDataTable({
        url: `v1/hospital/admission-supplies/${appointment?.id}`,
		defaultFilters: {
			type: [
				"admission",
			],
			appointment_id:appointment?.id,
			// key: uniq_id,
		},
    })
    const isNurse = () => {
    return String(user?.type || '').toLowerCase().includes('nurse')
  }
  return (
    <View className="flex flex-col gap-4">
        <View className='flex flex-row gap-4'>
            <Text className='text-3xl font-psemibold'>Supplies</Text>
            <View>{isNurse() && allowCreate && (
              // <ActionBtn title="Order Test" className="h-6" />
              <TouchableOpacity
              onPress={() => suppliesOrderRef.current?.show(
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
            key: 'type',
            sortable: false,
            width: 500,
            cell: (data) => data?.supply?.name || '—',
          },
           {
            header: 'Quantity',
            key: 'quantity',
            sortable: false,
            width: 100,
          },
          {
            header: 'Status',
            key: 'status',
            sortable: false,
            width: 150,
          },
          // {
          //   header: 'Details',
          //   key: 'details',
          //   sortable: false,
          //   width: 150,
          //   cell: (data) => {
          //       return (
          //           <Text className='w-full flex flex-row items-center'>{data?.details}</Text>
          //       )
          //   },
          // },
 
        ]}
      />
      <SuppliesOrderModal 
      ref={suppliesOrderRef}
      appointment={appointment}
      />
    </View>
  )
}

export default SuppliesOrder