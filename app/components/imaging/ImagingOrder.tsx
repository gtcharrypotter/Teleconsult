import { Image, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import useDataTable from '@/hooks/useDatatable'
import ContentTitle from '../contents/ContentTitle'
import ActionBtn from '../button/ActionBtn'
import Table from '../Table'
import { formatDateMMDDYYYYHHIIA } from '@/app/lib/helpers'
import { icons } from '@/constants/icons'
import CreateOrderModal from '../modal/CreateOrderModal'
import ViewResultModal from '../modal/ViewResultModal'

const ImagingOrder = ({
  appointment,
  patient,
  showTitle = true,
  laboratory_test_type,
  allowCreate = true,
  onUploadLabResultSuccess,
  order_id,
}) => {
  const { user } = useAuth()
  const createLabRef = useRef();
  const viewResultRef = useRef();
  const {
    loading,
    data,
    setFilters,
    reloadData
  } = useDataTable({
    url: `/v1/doctor/laboratory-order/patient/${patient?.id}`,
    defaultFilters: {
      ...(order_id ? { order_id } : {}),
      ...(laboratory_test_type ? { laboratory_test_type } : {}),
      ...(appointment?.id > 0 ? { appointment_id: appointment?.id } : {}),
    },
  })

  useEffect(() => {
    if (order_id) {
      setFilters(prev => ({
        ...prev,
        order_id,
      }))
    }
  }, [order_id])

  const isDoctor = () => {
    return String(user?.type || '').toLowerCase().includes('doctor')
  }

  return (
    <View className="flex flex-col gap-4">
      {showTitle && (
        
        <View className='flex flex-row gap-4'>
        <Text className='text-3xl font-psemibold'>{laboratory_test_type === 1 ? 'Imaging Order' : 'Laboratory Order'}</Text>
        <View>{isDoctor() && allowCreate && (
            // <ActionBtn title="Order Test" className="h-6" />
            <TouchableOpacity
            onPress={() => createLabRef.current?.show(
                                        patient, 
                                        appointment, 
                                        laboratory_test_type == 1
										? "imaging"
										: "laboratory-test"
                                    )}
            activeOpacity={0.7}
            disabled={loading}
            >
                <Image source={icons.add} className='size-10 -top-2' tintColor='#15b0f9'/>
            </TouchableOpacity>
          )}</View>
        </View>

      )}

     <Table
        loading={loading}
        data={[...data].reverse()}
        containerClassName="w-full"
        columns={[
          {
            header: 'Date',
            key: 'order_date',
            sortable: true,
            width: 200,
            cell: (item) => formatDateMMDDYYYYHHIIA(new Date(item?.order_date)),
          },
          {
            header: 'Laboratory Order',
            key: 'type',
            sortable: false,
            width: 400,
            cell: (item) => item?.type?.name || '—',
          },
          {
                      header: 'Status',
                      key: 'order_status',
                      sortable: true,
                      width: 150,
                      cell: (item) => {
                        const status = item?.order_status?.toLowerCase();
                        if (status === 'for-result-reading' || status === 'done') {
                          return (
                            <TouchableOpacity
                              onPress={() => viewResultRef.current?.show(item)}
                              activeOpacity={0.7}
                              disabled={loading}
                              className="flex-row items-center space-x-2"
                            >
                              {/* <Image source={icons.add} className="size-5" tintColor="#15b0f9" /> */}
                              <Text className="text-[#15b0f9] text-lg font-psemibold">View Result</Text>
                            </TouchableOpacity>
                          );
                        } else if (status === 'pending') {
                          return <Text className="text-gray-500">Pending</Text>;
                        } else if (status === 'not-performed') {
                          return <Text className="text-gray-500">Not Performed</Text>;
                        } else {
                          return <Text className="text-gray-700 capitalize">{item?.order_status || '—'}</Text>;
                        }
                      },
                    }
        ]}
      />


      <CreateOrderModal 
      ref={createLabRef} 
      appointment={appointment}
      patient={patient}
      onSuccess={() => {
	    	reloadData();
	    }}
      />
      <ViewResultModal 
      ref={viewResultRef}
      appointment={appointment}
      onSuccess={() => {
			onUploadLabResultSuccess();
			reloadData();
		}}
      />
    </View>
  )
}

export default ImagingOrder
