import { View, Text,Dimensions,StyleSheet } from 'react-native'
import React from 'react'
import { BlurView } from "expo-blur";
import LottieView from 'lottie-react-native';

const Loading = () => {
  return (
    <BlurView
    tint="light"
    intensity={100}
      style={{
        position: "absolute",
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        zIndex: 999,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <LottieView
      style={{height: 200, width: 200}}
      source={require("../assets/lf30_editor_vb8lahjg.json")}
      autoPlay
      loop
      />
    </BlurView>
  )
}

export default Loading