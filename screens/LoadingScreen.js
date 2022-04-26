import { View, Text, Dimensions, Image, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import { appColor, icons } from "../constants";

const LoadingScreen = () => {
  // Animation values
  // const fadeIn = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(fade, {
            toValue: 0.5,
            duration: 1500,
            useNativeDriver: false
          }),
          Animated.timing(fade, {
            toValue: 1,
            useNativeDriver: false
          })
        ])
      ).start()
    }, 1000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appColor.lightPink,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.Image
        source={icons.logo}
        style={{
           height: 100, width: 200, tintColor: appColor.white,
           opacity: fade
          }}
      />
    </View>
  );
};

export default LoadingScreen;
