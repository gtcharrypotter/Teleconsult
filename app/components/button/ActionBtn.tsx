
import { ButtonProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FlatIcon from '../FlatIcon';
const getBgVariantStyle = (type: ButtonProps["bgType"]) => {
    switch (type) {
			case "primary":
				return `bg-primary-dark hover:bg-primary-darker focus:bg-primary-dark text-white`;
			case "secondary":
				return `bg-indigo-700 hover:bg-indigo-900 focus:bg-indigo-900 text-white`;

			case "teal":
				return `bg-teal-700 hover:bg-teal-900 focus:bg-teal-900 text-white`;

			case "indigo":
				return `bg-indigo-800  hover:bg-indigo-900 focus:bg-indigo-900 text-white`;

			case "primary-dark":
				return `bg-primary-darker hover:bg-blue-700 focus:bg-blue-700 text-white`;

			case "disabled":
				return `bg-slate-500 hover:bg-slate-700 focus:bg-slate-500 !text-black pointer-events-none`;

			case "foreground":
				return `bg-slate-100 hover:bg-slate-300 focus:bg-slate-300 text-slate-500`;
			case "foreground-dark":
				return `bg-slate-200 hover:bg-slate-400 focus:bg-slate-400 text-slate-600`;
			case "success":
				return `bg-green-600 hover:bg-green-700 focus:bg-green-700 text-white`;

			case "danger":
				return `bg-red-600 hover:bg-red-700 focus:bg-red-700 text-white`;

			default:
				return `bg-primary hover:bg-primary-darker focus:bg-primary-dark text-white`;
		}
};
const getTextVariantStyle = (color: ButtonProps["textStyles"]) => {
  switch (color) {
    case "primary":
      return "text-black"
    case "secondary":
      return "text-gray-100"
    case "danger":
      return "text-red-100"
    case "success":
      return "text-green-100"
    default:
      return "text-white"
  }
}
const ActionBtn = ({ onPress, bgType= "primary", textStyles = "default", isLoading, title, className, IconLeft, IconRight, ...props } : ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`rounded-xl px-6 py-4 ${className} ${getBgVariantStyle(bgType)} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      {IconLeft && <FlatIcon />}
      <Text className={`text-center font-pbold ${getTextVariantStyle(textStyles)}`}>{title}</Text>
      {IconRight && <FlatIcon />}
    </TouchableOpacity>
  )
}

export default ActionBtn