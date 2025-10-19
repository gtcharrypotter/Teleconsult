import React, { useEffect, useState } from "react";
import { View, Text, Dimensions } from "react-native";
import { Defs, LinearGradient, Stop, Path, Svg } from "react-native-svg";
import Axios from "@/Service/Axios";


const GlucoseChart = ({ width = Dimensions.get('window').width - 40, height = 250, patient }) => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (patient?.id) {
      getData();
    }
  }, [patient?.id]);

  const getData = () => {
    Axios.get(`/v1/clinic/patient-charts/${patient?.id}?chart_type=glucose`).then(
      (res) => {
        let _labels = res.data?.labels;
        let _values = res.data?.values;
        setData(
          _values?.map((item, index) => ({
            name: _labels[index],
            data: _values[index],
          }))
        );
      }
    );
  };

  // Generate path for the line chart
  const generateLinePath = (data) => {
    if (data.length <= 1) return ''; // Prevent errors if the data length is 1 or less

    return data
      .map((point, index) => {
        const x = (index / (data.length - 1)) * (width - 40); // scaling x based on data points
        const y = (point.data && !isNaN(point.data) && point.data >= 0 && point.data <= 10) // Validate y data
          ? (1 - point.data / 10) * 250
          : 250; // Default to max height if invalid data

        // Return path coordinates
        return index === 0 ? `M${x},${y}` : `L${x},${y}`;
      })
      .join(" ");
  };

  // Function to handle touch events on the chart
  const handleTouch = (event) => {
    const { locationX } = event.nativeEvent;
    const index = Math.floor((locationX / (width - 40)) * (data.length - 1)); // Calculate index based on touch position
    setActiveIndex(index);
  };

  const activePayload = activeIndex !== null ? [data[activeIndex]] : [];

  return (
    <View className="flex justify-center items-center">
      <Svg
        height={height - 200}
        width={width - 200}
        onTouchStart={handleTouch} // Add touch event for activation
      >
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="rgba(136, 132, 216, 0.7)" />
            <Stop offset="100%" stopColor="rgba(136, 132, 216, 0)" />
          </LinearGradient>
        </Defs>

        {/* Line path */}
        <Path
          d={generateLinePath(data.reverse())}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth={2}
        />
        <Path
          d={`M0,${(1 - (100 - 40) / 80) * 250} L${width - 40},${(1 - (100 - 40) / 80) * 250}`}
          fill="none"
          stroke="#f44336"
          strokeWidth={1}
          strokeDasharray="4"
        />
      </Svg>

      {/* Tooltip */}
      {activePayload.length > 0 && (
        <View className="absolute bottom-5 bg-black bg-opacity-70 p-2 rounded-lg opacity-80" style={{ left: (activeIndex / (data.length - 1)) * (width - 40) }}>
          <Text className="text-white text-lg font-bold">Glucose: {activePayload[0].data} mg/dL</Text>
          <Text className="text-white text-sm">{activePayload[0].name}</Text>
        </View>
      )}

      {/* Latest result */}
      {data.length > 0 && (
        <View className="mt-2">
          <Text className="text-lg font-bold">{data[0]?.data} mg/dL</Text>
          <Text className="text-sm">{data[0]?.name}</Text>
        </View>
      )}
    </View>
  );
};

export default GlucoseChart;
