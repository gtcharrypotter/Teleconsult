import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Patient from '@/app/components/patient/Patient'
import Header from '../components/layout/Header'
import { useAuth } from '@/hooks/useAuth'
import UserProfile from '../components/user/UserProfile'
import useDataTable from "@/hooks/useDatatable"


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
  console.log('patient', patients)
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
