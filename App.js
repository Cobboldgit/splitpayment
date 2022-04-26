import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  LogBox,
  Platform,
  UIManager,
  TextInput,
} from "react-native";
import { store } from "./store/store";
import React, { useState } from "react";

import { Provider } from "react-redux";
import Screens from "./routes/Screens";
import { SafeAreaView } from "react-native-safe-area-context";
import { appColor } from "./constants";

// ignore yellow errors
LogBox.ignoreLogs([
  "Setting a timer for a long period of time, i.e. multiple minutes, is a performance and correctness issue on Android as it keeps the timer module awake, and timers can only be called when the app is in the foreground. See https://github.com/facebook/react-native/issues/12981 for more info.",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  "Cannot connect to Metro."
]);

// to make the animations work on android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Change input cursor color
TextInput.defaultProps.selectionColor = appColor.lightPink;

// Main app
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <Screens />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.white,
  },
});
