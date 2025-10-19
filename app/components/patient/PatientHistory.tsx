import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import Collapse from '../contents/Collapse'
import {useForm, Controller} from "react-hook-form";
import {abdomenLib, chestLib, digitalRectalLib, familyHistory, genitourinaryLib, heartLib, heentLib, immunizationAdult, immunizationChildren, immunizationElder, immunizationPregnant, medicalSurgicalHistories, neuroLib, skinLib} from "@/app/lib/appointmentOptions"
import Checkbox from '../inputs/Checkbox';

const PatientHistory = ({ patient }) => {
    const surgicalHistory = patient?.surgical_history || {};
    const familyHist = patient?.family_history || {};
    const immuneChild = patient?.immunization_child || {};
    const immuneAdult = patient?.immunization_adult || {};
    const immuneElder = patient?.immunization_elder || {};
    const immunePregnant = patient?.immunization_pregnant || {};
    const heent = patient?.heent_libraries || {};
    const chest = patient?.chest_libraries || {};
    const heart = patient?.heart_libraries || {};
    const genitou = patient?.genitourinary_libraries || {};
    const digital = patient?.digital_rectal_libraries || {};
    const skin = patient?.skin_libraries || {};
    const abdomen = patient?.abdomen_libraries || {};
    const neuro = patient?.neuro_libraries || {};
    const defaultValues = {};

    const { control} = useForm({ defaultValues });

    console.log("Histories", chest)
  return (
    <ScrollView>
        <View className='flex flex-col gap-2 p-4'>
            <Text className='text-2xl font-psemibold'>Medical Histories</Text>
            <View>
            <View className='flex flex-col gap-2'>
            <Collapse
            title="Medical Surgical History"
            headerClassName="bg-gray-100"
            bodyClassName="bg-white"
            defaultOpen={false}
          >
            {medicalSurgicalHistories.map((item) => {
              const hasAppointmentValue = surgicalHistory[item.name] === 'true';
              return (
                <ScrollView key={item.name}>
                <View className="">
                  <View className="flex-row items-center">
                    <Controller
                      control={control}
                      name={item.name}
                      render={({ field: { onChange, value } }) => (
                        <Checkbox 
                        value={hasAppointmentValue} 
                        onValueChange={onChange} 
                        editable={!hasAppointmentValue}
                        label={item.label}
                        showCheckIcon={hasAppointmentValue}
                        />
                      )}
                    />
                  </View>
                
                </View>
                </ScrollView>
              );
            })}
          </Collapse>
            <Collapse
              title='Family & Personal History'
              headerClassName='bg-gray-100'
              bodyClassName='bg-white'
              defaultOpen={false}
            >
              <View className='flex flex-row gap-40'>
                     <View>
                        {familyHistory.map((item, index) => {
                        const hasAppointmentValue = familyHist[item.name] === 'true';
                        if (index % 2 == 0 )
                            return(
                                    <ScrollView key={item.name}>
                                        <View className="">
                                    <View className="flex-row items-center">
                                        <Controller
                                        control={control}
                                        name={item.name}
                                        render={({ field: { onChange, value } }) => (
                                            <Checkbox 
                                           value={hasAppointmentValue} 
                                            onValueChange={onChange} 
                                            editable={!hasAppointmentValue}
                                            label={item.label}
                                            showCheckIcon={hasAppointmentValue}
                                            />
                                        )}
                                        />
                                    </View>
                                    
                                    </View>
                                    </ScrollView>
                                )
                        })}
                     </View>
                     <View>
                        {familyHistory.map((item, index) => {
                        const hasAppointmentValue = familyHist[item.name] === 'true';
                        if (index % 2 != 0 )
                            return(
                                    <ScrollView key={item.name}>
                                        <View className="">
                                    <View className="flex-row items-center">
                                        <Controller
                                        control={control}
                                        name={item.name}
                                        render={({ field: { onChange, value } }) => (
                                            <Checkbox 
                                            value={hasAppointmentValue} 
                                            onValueChange={onChange} 
                                            editable={!hasAppointmentValue}
                                            label={item.label}
                                            showCheckIcon={hasAppointmentValue}
                                            />
                                        )}
                                        />
                                    </View>
                                    
                                    </View>
                                    </ScrollView>
                                )
                        })}
                     </View>
              </View>
            </Collapse>
            <Collapse
              title='Immunization History'
              headerClassName='bg-gray-100'
              bodyClassName='bg-white'
              defaultOpen={false}
            >
              <View className='flex flex-col gap-4'>
                <View>
                    <Text className='text-xl font-psemibold'>Children</Text>
                    <View className='flex flex-row gap-40'>
                    <View>
                    {immunizationChildren.map((item, index) => {
                    const hasAppointmentValue = immuneChild[item.name] === 'true';
                    if (index % 2 == 0 )
                        return(
                                <ScrollView key={item.name}>
                                    <View className="">
                                <View className="flex-row items-center">
                                    <Controller
                                    control={control}
                                    name={item.name}
                                    render={({ field: { onChange, value } }) => (
                                        <Checkbox 
                                        value={hasAppointmentValue} 
                                        onValueChange={onChange} 
                                        editable={!hasAppointmentValue}
                                        label={item.label}
                                        showCheckIcon={hasAppointmentValue}
                                        />
                                    )}
                                    />
                                </View>
                                
                                </View>
                                </ScrollView>
                            )
                    })}
                    </View>
                    <View>
                    {immunizationChildren.map((item, index) => {
                    const hasAppointmentValue = immuneChild[item.name] === 'true';
                    if (index % 2 != 0 )
                        return(
                                <ScrollView key={item.name}>
                                    <View className="">
                                <View className="flex-row items-center">
                                    <Controller
                                    control={control}
                                    name={item.name}
                                    render={({ field: { onChange, value } }) => (
                                        <Checkbox 
                                        value={hasAppointmentValue} 
                                        onValueChange={onChange} 
                                        editable={!hasAppointmentValue}
                                        label={item.label}
                                        showCheckIcon={hasAppointmentValue}
                                        />
                                    )}
                                    />
                                </View>
                                
                                </View>
                                </ScrollView>
                            )
                    })}
                    </View>
                </View>
                </View>
                <View className='flex flex-row gap-x-40'>
                    <View>
                        <Text className='text-xl font-psemibold'>Adult</Text>
                        {immunizationAdult.map((item) => {
                        const hasAppointmentValue = immuneAdult[item.name] === 'true';
                        return (
                            <ScrollView key={item.name}>
                                <View className="">
                            <View className="flex-row items-center">
                                <Controller
                                control={control}
                                name={item.name}
                                render={({ field: { onChange, value } }) => (
                                    <Checkbox 
                                    value={hasAppointmentValue} 
                                    onValueChange={onChange} 
                                    editable={!hasAppointmentValue}
                                    label={item.label}
                                    showCheckIcon={hasAppointmentValue}
                                    />
                                )}
                                />
                            </View>
                            
                            </View>
                            </ScrollView>
                        );
                        })}
                    </View>
                    <View>
                        <Text className='text-xl font-psemibold'>Elder</Text>
                        {immunizationElder.map((item) => {
                        const hasAppointmentValue = immuneElder[item.name] === 'true';
                        return (
                            <ScrollView key={item.name}>
                                <View className="">
                            <View className="flex-row items-center">
                                <Controller
                                control={control}
                                name={item.name}
                                render={({ field: { onChange, value } }) => (
                                    <Checkbox 
                                   value={hasAppointmentValue} 
                                    onValueChange={onChange} 
                                    editable={!hasAppointmentValue}
                                    label={item.label}
                                    showCheckIcon={hasAppointmentValue}
                                    />
                                )}
                                />
                            </View>
                            
                            </View>
                            </ScrollView>
                        );
                        })}
                    </View>
                    <View>
                        <Text className='text-xl font-psemibold'>Pregnant</Text>
                        {immunizationPregnant.map((item) => {
                        const hasAppointmentValue = immunePregnant[item.name] === 'true';
                        return (
                            <ScrollView key={item.name}>
                                <View className="">
                            <View className="flex-row items-center">
                                <Controller
                                control={control}
                                name={item.name}
                                render={({ field: { onChange, value } }) => (
                                    <Checkbox 
                                    value={hasAppointmentValue}  
                                    onValueChange={onChange} 
                                    editable={!hasAppointmentValue}
                                    label={item.label}
                                    showCheckIcon={hasAppointmentValue}
                                    />
                                )}
                                />
                        </View>
                        
                        </View>
                        </ScrollView>
                    );
                    })}
                </View>
                </View>
              </View>
            </Collapse>
            <Collapse
              title='Pertinent Findings Per System'
              headerClassName='bg-gray-100'
              bodyClassName='bg-white'
              defaultOpen={false}
            >
              <View className='flex flex-col gap-4'>
                <View>
                    <Text className='text-xl font-psemibold'>A. HEENT</Text>
                    <View className='flex flex-row gap-40'>
                    <View>
                    {heentLib.map((item, index) => {
                    const hasAppointmentValue = heent[item.name] === 'true';
                    if (index % 2 == 0 )
                        return(
                                <ScrollView key={item.name}>
                                    <View className="">
                                <View className="flex-row items-center">
                                    <Controller
                                    control={control}
                                    name={item.name}
                                    render={({ field: { onChange, value } }) => (
                                        <Checkbox 
                                        value={hasAppointmentValue}  
                                        onValueChange={onChange} 
                                        editable={!hasAppointmentValue}
                                        label={item.label}
                                        showCheckIcon={hasAppointmentValue}
                                        />
                                    )}
                                    />
                                </View>
                                
                                </View>
                                </ScrollView>
                            )
                    })}
                    </View>
                    <View>
                    {heentLib.map((item, index) => {
                    const hasAppointmentValue = heent[item.name] === 'true';
                    if (index % 2 != 0 )
                        return(
                                <ScrollView key={item.name}>
                                    <View className="">
                                <View className="flex-row items-center">
                                    <Controller
                                    control={control}
                                    name={item.name}
                                    render={({ field: { onChange, value } }) => (
                                        <Checkbox 
                                        value={hasAppointmentValue} 
                                        onValueChange={onChange} 
                                        editable={!hasAppointmentValue}
                                        label={item.label}
                                        showCheckIcon={hasAppointmentValue}
                                        />
                                    )}
                                    />
                                </View>
                                
                                </View>
                                </ScrollView>
                            )
                    })}
                    </View>
                </View>
                </View>
                <View className='flex flex-row gap-40'>
                    <View>
                        <Text className='text-xl font-psemibold'>B. CHEST/BREAST/LUNGS</Text>
                        {chestLib.map((item) => {
                            const hasAppointmentValue = chest[item.name] === 'true';
                            return (
                                <ScrollView key={item.name}>
                                    <View className="">
                                <View className="flex-row items-center">
                                    <Controller
                                    control={control}
                                    name={item.name}
                                    render={({ field: { onChange, value } }) => (
                                        <Checkbox 
                                        value={hasAppointmentValue} 
                                        onValueChange={onChange} 
                                        editable={!hasAppointmentValue}
                                        label={item.label}
                                        showCheckIcon={hasAppointmentValue}
                                        />
                                    )}
                                    />
                            </View>
                            
                            </View>
                            </ScrollView>
                        );
                        })}
                    </View>
                    <View>
                    <Text className='text-xl font-psemibold'>C. HEART</Text>
                    {heartLib.map((item) => {
                       const hasAppointmentValue = heart[item.name] === 'true';
                        return (
                            <ScrollView key={item.name}>
                                <View className="">
                            <View className="flex-row items-center">
                                <Controller
                                control={control}
                                name={item.name}
                                render={({ field: { onChange, value } }) => (
                                    <Checkbox 
                                    value={hasAppointmentValue} 
                                    onValueChange={onChange} 
                                    editable={!hasAppointmentValue}
                                    label={item.label}
                                    showCheckIcon={hasAppointmentValue}
                                    />
                                )}
                                />
                        </View>
                        
                        </View>
                        </ScrollView>
                    );
                    })}
                </View>
                </View>
                <View className='flex flex-row gap-x-36'>
                    <View>
                        <Text className='text-xl font-psemibold'>D. GENITOURINARY</Text>
                        {genitourinaryLib.map((item) => {
                            const hasAppointmentValue = genitou[item.name] === 'true';
                            return (
                                <ScrollView key={item.name}> 
                                    <View className="">
                                <View className="flex-row items-center">
                                    <Controller
                                    control={control}
                                    name={item.name}
                                    render={({ field: { onChange, value } }) => (
                                        <Checkbox 
                                        value={hasAppointmentValue} 
                                        onValueChange={onChange} 
                                        editable={!hasAppointmentValue}
                                        label={item.label}
                                        showCheckIcon={hasAppointmentValue}
                                        />
                                    )}
                                    />
                            </View>
                            
                            </View>
                            </ScrollView>
                        );
                        })}
                    </View>
                    <View>
                    <Text className='text-xl font-psemibold'>E. DIGITAL RECTAL EXAMINATION</Text>
                    {digitalRectalLib.map((item) => {
                        const hasAppointmentValue = digital[item.name] === 'true';
                        return (
                            <ScrollView key={item.name}>
                                <View className="">
                            <View className="flex-row items-center">
                                <Controller
                                control={control}
                                name={item.name}
                                render={({ field: { onChange, value } }) => (
                                    <Checkbox 
                                    value={hasAppointmentValue} 
                                    onValueChange={onChange} 
                                    editable={!hasAppointmentValue}
                                    label={item.label}
                                    showCheckIcon={hasAppointmentValue}
                                    />
                                )}
                                />
                        </View>
                        
                        </View>
                        </ScrollView>
                    );
                    })}
                </View>
                </View>
                
                <View className='flex flex-row gap-x-56'>
                   <View>
                     <Text className='text-xl font-psemibold'>F. SKIN/EXTREMITIES</Text>
                        {skinLib.map((item) => {
                            const hasAppointmentValue = skin[item.name] === 'true';
                            return (
                                <ScrollView key={item.name}>
                                    <View className="">
                                <View className="flex-row items-center">
                                    <Controller
                                    control={control}
                                    name={item.name}
                                    render={({ field: { onChange, value } }) => (
                                        <Checkbox 
                                        value={hasAppointmentValue} 
                                        onValueChange={onChange} 
                                        editable={!hasAppointmentValue}
                                        label={item.label}
                                        showCheckIcon={hasAppointmentValue}
                                        />
                                    )}
                                    />
                            </View>
                            
                            </View>
                            </ScrollView>
                        );
                        })}
                   </View>
                   <View>
                        <Text className='text-xl font-psemibold'>G. ABDOMEN</Text>
                        {abdomenLib.map((item) => {
                            const hasAppointmentValue = abdomen[item.name] === 'true';
                            return (
                                <ScrollView key={item.name}>
                                    <View className="">
                                <View className="flex-row items-center">
                                    <Controller
                                    control={control}
                                    name={item.name}
                                    render={({ field: { onChange, value } }) => (
                                        <Checkbox 
                                        value={hasAppointmentValue}  
                                        onValueChange={onChange} 
                                        editable={!hasAppointmentValue}
                                        label={item.label}
                                        showCheckIcon={hasAppointmentValue}
                                        />
                                    )}
                                    />
                            </View>
                            
                            </View>
                            </ScrollView>
                        );
                        })}
                    </View>
                </View>
                
                <View>
                    <Text className='text-xl font-psemibold'>H. NEUROLOGY</Text>
                    {neuroLib.map((item) => {
                        const hasAppointmentValue = neuro[item.value] === 'true';
                        return (
                            <ScrollView key={item.value}>
                            <View className="">
                            <View className="flex-row items-center">
                                <Controller
                                control={control}
                                name={item.value}
                                render={({ field: { onChange, value } }) => (
                                    <Checkbox 
                                    value={hasAppointmentValue} 
                                    onValueChange={onChange} 
                                    editable={!hasAppointmentValue}
                                    label={item.label}
                                    showCheckIcon={hasAppointmentValue}
                                    />
                                )}
                                />
                            </View>
                        </View>
                        </ScrollView>
                    );
                    })}
                </View>
              </View>
            </Collapse>
          </View>
            </View>
        </View>
    </ScrollView>
  )
}

export default PatientHistory