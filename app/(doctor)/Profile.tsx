import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import useDataTable from '@/hooks/useDatatable';
import { useAuth } from '@/hooks/useAuth';
import UserProfile from '../components/user/UserProfile';

const Profile = () => {
    const {user, logout} = useAuth({
		middleware: "auth",
		// redirectIfAuthenticated: "/",
	});
  const {
    data: patients,
		setData: setPatients,
		loading,
		page,
		setPage,
		meta,
		filters,
		paginate,
		setPaginate,
		setFilters,
  } = useDataTable({
    url: `/v1/patients`,
  });
  return (
    <ScrollView className="flex-1 bg-white">
      <UserProfile
        user={user} 
        logout={logout}
      />
    </ScrollView>
  )
}

export default Profile