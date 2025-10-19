import { View, Text, ScrollView, Animated, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'

type TabContent ={
    title: string | ((props: { selectedIndex: number; setSelectedIndex: (index: number) => void }) => JSX.Element);
    content: string | ((props: { selectedIndex: number; setSelectedIndex: (index: number) => void }) => JSX.Element);
};
type TabGroupProps = {
    contents: TabContent[];
    tabStyle?: string;
    contentStyle?: string;
    titleChildren?: JSX.Element;
};
const TabGroup: React.FC<TabGroupProps> = ({ contents, tabStyle = "", contentStyle = "", titleChildren }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<ScrollView | null>(null);

    const handleTabPress = (index: number) => {
        setSelectedIndex(index);
        scrollViewRef.current?.scrollTo({ x: index * 300, animated: true });
    };
    return (
    <View className="flex-1">
            <View className="flex-row bg-white py-2">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {contents.map(({ title }, index) => (
                        <TouchableOpacity
                            key={`tab-${index}`}
                            onPress={() => handleTabPress(index)}
                            className={`px-5 py-2 border-b-2 ${selectedIndex === index ? "border-blue-500" : "border-transparent"} ${tabStyle}`}
                        >
                            <Text className={`${selectedIndex === index ? "text-blue-500" : "text-black"}`}>
                                {typeof title === "function" ? title({ selectedIndex, setSelectedIndex }) : title}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    {titleChildren}
                </ScrollView>
            </View>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
            >
                {contents.map(({ content }, index) => (
                    <View key={`content-${index}`} className={`w-[300px] p-5 ${contentStyle}`}>
                        {typeof content === "function" ? content({ selectedIndex, setSelectedIndex }) : content}
                    </View>
                ))}
            </ScrollView>
        </View>
  )
}

export default TabGroup