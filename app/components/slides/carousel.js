import { View, ScrollView, Image, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'


const Carousel = ({data}) => {
    const [newData] = useState([
        {key: 'spacer-left'},
        ...data,
        {key: 'spacer-right'}
    ])
    const {width} = useWindowDimensions();
    const SIZE = width * 0.7;
  return (
    <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false}
    bounces={false}
    scrollEventThrottle={16}
    snapToInterval={SIZE}
    decelerationRate="fast"
    >
      {data.map((item, index) => {
        return(
            <View >
                <View className='rounded-lg overflow-hidden'>
                    <Image source={item.image} className='w-full aspect-1'/>
                </View>
            </View>
        )
      })}
    </ScrollView>
  )
}

export default Carousel