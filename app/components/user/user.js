import { Image } from 'react-native';
import React from 'react';

export default function UserImage({ type = "user", src, name = "User", className="", ...rest }) {
  const srcRender = () => {
    if (src && typeof src === "string" && src.length) {
      return { uri: `https://192.168.93.100:80${src}` };
    }

    switch (type) {
      case "user":
        return {
          uri: `https://api.dicebear.com/7.x/initials/png?seed=${name}&backgroundType=gradientLinear`,
        };
      default:
        return null; // safer fallback than an empty string
    }
  };

  const imageSource = srcRender();
  if (!imageSource) return null;

  return <Image source={imageSource} className={className} {...rest} />;
}
