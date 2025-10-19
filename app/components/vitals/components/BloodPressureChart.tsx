import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { Svg, Polyline, Circle, Line } from "react-native-svg";
import Axios from "@/Service/Axios";
import { calculateBPMeasurement } from "@/app/lib/helpers";

const BloodPressureChart = ({ width = Dimensions.get('window').width - 40, height = 250, patient }) => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (patient?.id) {
      getData();
    }
  }, [patient?.id]);

  const getData = () => {
    Axios.get(`/v1/clinic/patient-charts/${patient?.id}?chart_type=blood_pressure`)
      .then((res) => {
        const _labels = res.data?.labels;
        const _values = res.data?.values;

        const formatted = _values.map((item, index) => ({
          systolic: item?.blood_systolic || 0,
          diastolic: item?.blood_diastolic || 0,
          time: _labels[index],
        }));
        setData(formatted.reverse()); // Reverse to match time order
      });
  };

  if (data.length === 0) {
    return (
      <View className="items-center justify-center h-[200px]">
        <Text>No Data</Text>
      </View>
    );
  }

  // Process data for chart
  const maxY = 300;
  const padding = 20;
  const stepX = (width - padding * 2) / (data.length - 1 || 1);

  const systolicPoints = data.map((item, index) => {
    const x = padding + index * stepX;
    const y = padding + ((maxY - item.systolic) / maxY) * (height - padding * 2);
    return `${x},${y}`;
  }).join(" ");

  const diastolicPoints = data.map((item, index) => {
    const x = padding + index * stepX;
    const y = padding + ((maxY - item.diastolic) / maxY) * (height - padding * 2);
    return `${x},${y}`;
  }).join(" ");

  // Handle touch events on the chart
  const handleTouch = (event) => {
    const { locationX } = event.nativeEvent;
    const index = Math.floor((locationX / (width - 40)) * (data.length - 1)); // Calculate index based on touch position
    setActiveIndex(index);
  };

  const activePayload = activeIndex !== null ? data[activeIndex] : null;

  return (
    <View className="p-2">
      <ScrollView horizontal>
        <View style={{ width, height }}>
          <Svg width={width} height={height} onTouchStart={handleTouch}>
            {/* Grid lines */}
            {[0, 50, 100, 150, 200, 250, 300].map((val, idx) => {
              const y = padding + ((maxY - val) / maxY) * (height - padding * 2);
              return (
                <Line
                  key={idx}
                  x1={0}
                  y1={y}
                  x2={width}
                  y2={y}
                  stroke="#ccc"
                  strokeDasharray="5,5"
                />
              );
            })}

            {/* Systolic line */}
            <Polyline
              points={systolicPoints}
              fill="none"
              stroke="red"
              strokeWidth="2"
            />

            {/* Diastolic line */}
            <Polyline
              points={diastolicPoints}
              fill="none"
              stroke="blue"
              strokeWidth="2"
            />

            {/* Dots */}
            {data.map((item, index) => {
              const x = padding + index * stepX;
              const ySys = padding + ((maxY - item.systolic) / maxY) * (height - padding * 2);
              const yDia = padding + ((maxY - item.diastolic) / maxY) * (height - padding * 2);

              return (
                <React.Fragment key={index}>
                  <Circle cx={x} cy={ySys} r={8} fill="red" />
                  <Circle cx={x} cy={yDia} r={8} fill="blue" />
                </React.Fragment>
              );
            })}
          </Svg>

          {/* Legend */}
          <View className="flex-row items-center justify-center gap-4 mt-2">
            <View className="flex-row items-center gap-1">
              <View className="w-14 h-14 rounded-full bg-red-700" />
              <Text>Systolic</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <View className="w-14 h-14 rounded-full bg-blue-700" />
              <Text>Diastolic</Text>
            </View>
          </View>

          {/* Latest result */}
          <View className="items-center mt-2">
            <Text className="text-lg font-bold">
              {data[0]?.systolic} / {data[0]?.diastolic}
            </Text>
            <Text className="text-sm">
              {calculateBPMeasurement(data[0]?.systolic, data[0]?.diastolic)?.result || ""}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Tooltip for Active Payload */}
      {activePayload && (
        <View className="absolute bottom-5 bg-black bg-opacity-70 p-2 rounded-lg opacity-80" style={{ left: (activeIndex / (data.length - 1)) * (width - 40) }}>
          <Text className="text-white text-lg font-bold">
            {activePayload.systolic} / {activePayload.diastolic}
          </Text>
          <Text className="text-white text-sm">{activePayload.time}</Text>
        </View>
      )}
    </View>
  );
};

export default BloodPressureChart;
