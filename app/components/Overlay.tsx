import React from 'react';
import { Dimensions, View } from 'react-native';

const { width, height } = Dimensions.get('window');
const overlayWidth = width * 0.8;
const overlayHeight = height * 0.4;
const borderSize = 30;

const Overlay = () => {
  const sidePadding = (width - overlayWidth) / 2;
  const verticalPadding = (height - overlayHeight) / 2;

  return (
    <View className="absolute inset-0 z-10">
      {/* Top shaded area */}
      <View
        style={{ height: verticalPadding }}
        className="bg-black/60"
      />

      {/* Middle section with side shades and scan box */}
      <View
        style={{ height: overlayHeight }}
        className="flex-row"
      >
        {/* Left shaded area */}
        <View
          style={{ width: sidePadding }}
          className="bg-black/60"
        />

        {/* Scan box with corner borders */}
        <View style={{ width: overlayWidth, height: overlayHeight }}>
          {/* Corner Borders */}
          {/* Top Left */}
          <View
            className="absolute w-[30px] h-[4px] bg-green-500"
            style={{ top: 0, left: 0 }}
          />
          <View
            className="absolute w-[4px] h-[30px] bg-green-500"
            style={{ top: 0, left: 0 }}
          />

          {/* Top Right */}
          <View
            className="absolute w-[30px] h-[4px] bg-green-500"
            style={{ top: 0, right: 0 }}
          />
          <View
            className="absolute w-[4px] h-[30px] bg-green-500"
            style={{ top: 0, right: 0 }}
          />

          {/* Bottom Left */}
          <View
            className="absolute w-[30px] h-[4px] bg-green-500"
            style={{ bottom: 0, left: 0 }}
          />
          <View
            className="absolute w-[4px] h-[30px] bg-green-500"
            style={{ bottom: 0, left: 0 }}
          />

          {/* Bottom Right */}
          <View
            className="absolute w-[30px] h-[4px] bg-green-500"
            style={{ bottom: 0, right: 0 }}
          />
          <View
            className="absolute w-[4px] h-[30px] bg-green-500"
            style={{ bottom: 0, right: 0 }}
          />
        </View>

        {/* Right shaded area */}
        <View
          style={{ width: sidePadding }}
          className="bg-black/60"
        />
      </View>

      {/* Bottom shaded area */}
      <View
        style={{ height: verticalPadding }}
        className="bg-black/60"
      />
    </View>
  );
};

export default Overlay;
