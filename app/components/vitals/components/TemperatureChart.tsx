import React, { useEffect, useState, useMemo } from "react";
import { View, Text, Dimensions, PanResponder } from "react-native";
import { Defs, LinearGradient, Stop, Path, Svg } from "react-native-svg";
import Axios from "@/Service/Axios";

const TemperatureChart = ({
  width = Dimensions.get("window").width - 40,
  height = 250,
  patient,
}) => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (patient?.id) {
      getData();
    }
  }, [patient?.id]);

  const getData = async () => {
    try {
      const res = await Axios.get(
        `/v1/clinic/patient-charts/${patient?.id}?chart_type=temperature`
      );
      const _labels = res.data?.labels || [];
      const _values = res.data?.values || [];

      setData(
        _values.map((val, i) => ({
          data: val,
          time: _labels[i],
        }))
      );
    } catch (error) {
      console.error("Failed to fetch temperature chart data:", error);
    }
  };

  const chartPadding = 20;
  const validData = useMemo(() => [...data].reverse(), [data]);

  const generateLinePath = (points) => {
    if (points.length <= 1) return "";

    return points
      .map((point, index) => {
        const x = (index / (points.length - 1)) * (width - chartPadding * 2);
        const y =
          point.data && !isNaN(point.data) && point.data >= 34 && point.data <= 42
            ? ((40 - point.data) / 6) * (height - chartPadding * 2)
            : height - chartPadding * 2;

        return index === 0 ? `M${x},${y}` : `L${x},${y}`;
      })
      .join(" ");
  };

  const handleTouch = (event) => {
    const { locationX } = event.nativeEvent;
    const index = Math.round(
      (locationX / (width - chartPadding * 2)) * (validData.length - 1)
    );
    if (index >= 0 && index < validData.length) setActiveIndex(index);
  };

  const activePoint = activeIndex !== null ? validData[activeIndex] : null;

  return (
    <View className="relative justify-center items-center" style={{ width }}>
      <Svg
        height={height}
        width={width}
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
      >
        <Defs>
          <LinearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
            <Stop offset="0%" stopColor="#8884d8" stopOpacity="0.7" />
            <Stop offset="100%" stopColor="#8884d8" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* Reference line at normal temperature (e.g., 37°C) */}
        <Path
          d={`M0,${((40 - 37) / 6) * (height - chartPadding * 2)} L${width},${
            ((40 - 37) / 6) * (height - chartPadding * 2)
          }`}
          stroke="#f44336"
          strokeDasharray="4"
          strokeWidth={1}
          fill="none"
        />

        {/* Data path */}
        <Path
          d={generateLinePath(validData)}
          stroke="url(#gradient)"
          strokeWidth={2}
          fill="none"
        />
      </Svg>

      {/* Tooltip */}
      {activePoint && (
        <View
          className="absolute bottom-6 px-3 py-2 rounded-lg bg-black bg-opacity-75"
          style={{
            left:
              (activeIndex / (validData.length - 1)) * (width - chartPadding * 2),
            transform: [{ translateX: -50 }],
          }}
        >
          <Text className="text-white text-sm font-bold">
            Temp: {activePoint.data}°C
          </Text>
          <Text className="text-white text-xs">{activePoint.time}</Text>
        </View>
      )}

      {/* Latest result */}
      {validData.length > 0 && (
        <View className="mt-2 items-center">
          <Text className="text-lg font-bold">{validData[0].data}°C</Text>
          <Text className="text-sm text-gray-600">{validData[0].time}</Text>
        </View>
      )}
    </View>
  );
};

export default TemperatureChart;
