import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { Defs, LinearGradient, Stop, Path, Svg, Line } from "react-native-svg";
import Axios from "@/Service/Axios";

const RespirationChart = ({ width = Dimensions.get('window').width - 40, height = 250, patient }) => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (patient?.id) getData();
  }, [patient?.id]);

  const getData = () => {
    Axios.get(`/v1/clinic/patient-charts/${patient?.id}?chart_type=respiratory`)
      .then((res) => {
        const labels = res.data?.labels || [];
        const values = res.data?.values || [];
        const formatted = values.map((item, index) => ({
          data: item,
          time: labels[index],
        }));
        setData(formatted);
      });
  };

  const chartPadding = 20;
  const chartHeight = height - 60;
  const chartWidth = width - 40;

  const generateLinePath = (points) => {
    if (points.length <= 1) return "";
    return points.map((point, index) => {
      const x = (index / (points.length - 1)) * chartWidth;
      const y = point.data && !isNaN(point.data)
        ? ((1 - (point.data - 10) / 20) * chartHeight)
        : chartHeight;
      return index === 0 ? `M${x},${y}` : `L${x},${y}`;
    }).join(" ");
  };

  const handleTouch = (event) => {
    const { locationX } = event.nativeEvent;
    const index = Math.round((locationX / chartWidth) * (data.length - 1));
    const clampedIndex = Math.max(0, Math.min(index, data.length - 1));
    setActiveIndex(clampedIndex);
  };

  const reversedData = [...data].reverse();
  const activePayload = activeIndex !== null ? [reversedData[activeIndex]] : [];

  return (
    <View className="items-center w-full px-4">
      <Svg height={chartHeight} width={chartWidth} onTouchStart={handleTouch}>
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#8884d8" stopOpacity="0.8" />
            <Stop offset="100%" stopColor="#8884d8" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* Background grid lines */}
        {[10, 15, 20, 25].map((val) => {
          const y = ((1 - (val - 10) / 20) * chartHeight);
          return (
            <Line
              key={val}
              x1="0"
              y1={y}
              x2={chartWidth}
              y2={y}
              stroke="#e0e0e0"
              strokeDasharray="4"
              strokeWidth="1"
            />
          );
        })}

        {/* Line path */}
        <Path
          d={generateLinePath(reversedData)}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={2}
        />
      </Svg>

      {/* Tooltip */}
      {activePayload.length > 0 && (
        <View
          className="absolute bottom-5 bg-black bg-opacity-70 p-2 rounded-md"
          style={{
            left: Math.min(Math.max((activeIndex / (data.length - 1)) * chartWidth - 50, 0), chartWidth - 100),
          }}
        >
          <Text className="text-white text-sm font-semibold">
            Respiration: {activePayload[0]?.data} bpm
          </Text>
          <Text className="text-white text-xs">{activePayload[0]?.time}</Text>
        </View>
      )}

      {/* Latest result display */}
      {data.length > 0 && (
        <View className="mt-4">
          <Text className="text-lg font-semibold text-gray-800">
            Latest: {data[0]?.data} bpm
          </Text>
          <Text className="text-xs text-gray-500">{data[0]?.time}</Text>
        </View>
      )}
    </View>
  );
};

export default RespirationChart;
