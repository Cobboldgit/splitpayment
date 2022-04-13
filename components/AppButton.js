import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { appColor } from "../constants";

const AppButton = ({color, title, backgroundColor }) => {
  return (
    <LinearGradient
    colors={[backgroundColor.start, backgroundColor.end]}
    start={{x: 1, y: 0}}
      style={{
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 200,
        borderRadius: 25,
      }}
    >
      <Text style={{ color: color, fontSize: 16 }}>{title}</Text>
    </LinearGradient>
  );
};

export default AppButton;
