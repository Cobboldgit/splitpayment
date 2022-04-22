import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import { appColor, icons } from "../constants";

const LoadingScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appColor.lightPink,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image source={icons.logo} style={{height: 100, width: 200, tintColor: appColor.white}}/>
    </View>
  );
};

export default LoadingScreen;
