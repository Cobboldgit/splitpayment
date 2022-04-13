import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import firebase, {auth} from "../firebase/firebase";

import {
  PhoneNumberScreen,
  RegisterScreen,
  GroupDetailsScreen,
  GroupSettingsScreen,
  GroupsScreen,
  AddGroupScreen,
  TransactionDetailsScreen,
  GetStartedScreen,
  LoginScreen,
  ProfileScreen,
  PaymentScreen,
} from "../screens";

const Stack = createNativeStackNavigator();

const Screens = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && user.uid) {
        setCurrentUser(true)
      } else {
        setCurrentUser(false)
      }
    })

    return () => unsubscribe
  },[])

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      {!currentUser ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="GetStarted" component={GetStartedScreen} />
          <Stack.Screen name="Phone" component={PhoneNumberScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Groups" component={GroupsScreen} />
          <Stack.Screen name="GroupDetails" component={GroupDetailsScreen} />
          <Stack.Screen name="GroupSettings" component={GroupSettingsScreen} />
          <Stack.Screen name="AddGroup" component={AddGroupScreen} />
          <Stack.Screen
            name="TransactionDetails"
            component={TransactionDetailsScreen}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Screens;
