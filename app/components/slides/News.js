import { View, Text, Image, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, {
    interpolate, 
    useAnimatedScrollHandler, 
    useAnimatedStyle, 
    useSharedValue,
    scrollTo,
    withTiming,
    runOnJS,
} from 'react-native-reanimated'

const News = ({ data }) => {
    const [newData] = useState([
        { key: 'spacer-left' },
        ...data,
        { key: 'spacer-right' }
    ]);

    const { width, height  } = useWindowDimensions();
    const SIZE = width;
    const SPACER = (width - SIZE) / 2;
    const x = useSharedValue(0);
    const scrollRef = React.useRef(null);

    const totalItems = data.length;
    const intervalDuration = 2000; // 2 seconds
    const scrollPosition = useSharedValue(0);

    const startAutoScroll = () => {
        return setInterval(() => {
            scrollPosition.value += SIZE;

            if (scrollPosition.value > (totalItems - 1) * SIZE) {
                scrollPosition.value = 0; // Loop back to the beginning
            }

            if (scrollRef.current) {
                scrollTo(scrollRef, scrollPosition.value, 0, true);
            }
        }, intervalDuration);
    };

    useEffect(() => {
        const intervalId = startAutoScroll();

        return () => clearInterval(intervalId);
    }, [totalItems, SIZE]);

    const onScroll = useAnimatedScrollHandler({
        onScroll: event => {
            x.value = event.contentOffset.x;        
            scrollPosition.value = event.contentOffset.x;
        },
    });

    return (
        <Animated.ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            scrollEventThrottle={16}
            snapToInterval={SIZE}
            decelerationRate="fast"
            onScroll={onScroll}
            contentContainerStyle={{ alignItems: 'center' }}
        >
            {newData.map((item, index) => {
                const style = useAnimatedStyle(() => {
                    const scale = interpolate(
                        x.value,
                        [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
                        [0.9, 1, 0.9],
                    );
                    return {
                        transform: [{ scale }],
                    };
                });

                if (!item.image) {
                    return <View style={{ width: SPACER }} key={index} />;
                }

                return (
                    <View style={{ width: SIZE }} key={index}>
                        <Animated.View className='rounded-2xl overflow-hidden h-[40vh] p-2' style={style}>
                            <Image source={item.image} className='w-full h-full aspect-1' />
                        </Animated.View>
                    </View>
                );
            })}
        </Animated.ScrollView>
    );
}

export default News;
