import { View, Text } from 'react-native'
import React from 'react'

const AppointmentStatus = ({customStatus = null, forResult = false, appointment}) => {
    const renderStatus = () => {
        if (customStatus) {
            return <Text className='text-orange-500'>{customStatus}</Text>
        }
        if (appointment?.status == "pending" && appointment?.vital_id == null) {
            return (
                <Text className='text-orange-500'> Pending for Patient Vitals</Text>
            )
        }
        if (appointment?.status == "pending" && appointment?.vital_id != null) {
            return (
                <Text className='text-orange-600'> Pending for Service</Text>
            )
        }
        if (appointment?.status == "in-service-consultation") {
			return (
				<Text className="text-orange-600">
					CONSULTATION WITH DOCTOR
				</Text>
			);
		}
        if (appointment?.status == "in-service-admission") {
			return (
				<Text className="text-orange-600">
					ADMITTED
				</Text>
			);
		}
        if (appointment?.status == "pending-for-surgery") {
			return (
				<Text className="text-red-600">
					PENDING FOR SURGERY
				</Text>
			);
		}
        if (appointment?.status == "pending-for-delivery") {
			return (
				<Text className="text-red-600">
					PENDING FOR DELIVERY
				</Text>
			);
		}
        if (appointment?.status == "in-service-delivery") {
			return (
				<Text className="text-red-600">
					DELIVERY IN
				</Text>
			);
		}
        if (appointment?.status == "in-service-surgery") {
			return (
				<Text className="text-red-600">
					SURGERY IN
				</Text>
			);
		}
    }
    return renderStatus();
}

export default AppointmentStatus