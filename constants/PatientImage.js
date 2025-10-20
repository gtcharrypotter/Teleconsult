import React from 'react';
import { Image } from 'react-native';
import { StyleSheet, View } from 'react-native';

const PatientImage = ({ type, src, name, className="" , ...rest }) => {
    const srcRender = () => {
    if (src && src.length) {
      return { uri: `https://192.168.93.100:80${src}` }; // Update with actual backend URL
    } else {
      switch (type) {
        case "user":
          return {
            uri: `https://api.dicebear.com/7.x/initials/svg?seed=${name}&backgroundType=gradientLinear`,
          };
        default:
          return require("../assets/default-avatar.png"); // Add a local default avatar
      }
    }
  };
    return <Image source={srcRender()} className={className} {...rest} />;
}

export default PatientImage;
