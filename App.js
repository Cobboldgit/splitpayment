import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput,Button } from "react-native";
import { store } from "./store/store";
import React, { useState } from "react";

import { Provider } from "react-redux";
import Screens from "./routes/Screens";
import { SafeAreaView } from "react-native-safe-area-context";
import { appColor } from "./constants";




export default function App() {
 

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
        {/* <GroupsScreen/> */}
        {/* <AddGroupScreen/> */}
        {/* <GroupDetailsScreen/> */}
        {/* <ContactList/> */}
        {/* <TransactionDetailsScreen/> */}
        {/* <GroupSettingsScreen/> */}
        {/* <PhoneNumberScreen/> */}
        {/* <RegisterScreen/> */}
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
