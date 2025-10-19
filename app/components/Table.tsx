import { useFocusEffect } from 'expo-router';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

const Table = ({
  loading = true,
  columns = [],
  data = [],
  onSort,
  containerClassName = '',
}) => {
  return (
    <ScrollView horizontal>
      <View className={`${containerClassName}`}>
        <View className="flex-row bg-gray-100 border-b border-gray-300 rounded-t-md">
          {columns.map((col, index) => (
            <TouchableOpacity
              key={`header-${index}`}
              style={{ width: col.width }}
              className={`px-3 py-3 ${col.headerClassName || ''}`}
              activeOpacity={onSort && col.sortable ? 0.6 : 1}
              onPress={() => col.sortable && onSort?.(col.key, true)}
            >
              <Text className="text-2xl font-bold text-gray-700">
                {col.header}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {loading ? (
  <View className="py-6 items-center justify-center">
    <ActivityIndicator size="small" color="#999" />
    <Text className="text-gray-500 mt-2">Loading...</Text>
  </View>
          ) : data.length === 0 ? (
            <View className="py-6 items-center">
              <Text className="text-gray-500">No data to display.</Text>
            </View>
          ) : (
            [...data].reverse().map((row, rowIndex) => (
              <View
                key={`row-${rowIndex}`}
                className={`flex-row border-b border-gray-100 ${rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                {columns.map((col, colIndex) => (
                  <View
                    key={`cell-${rowIndex}-${colIndex}`}
                    style={{ width: col.width }}
                    className={`px-3 py-2 justify-center ${col.cellClassName || ''}`}
                  >
                    <Text className="text-xl text-gray-800">
                      {col.cell ? col.cell(row) : row[col.key]}
                    </Text>
                  </View>
                ))}
              </View>
            ))
          )}

      </View>
    </ScrollView>
  );
};

export default Table;
