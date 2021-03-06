import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import firebase, { auth } from "../firebase/firebase";

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
  LoadingScreen,
  PaymentTest,
  CreateGroupPayment,
} from "../screens";
import * as Network from "expo-network";

const Stack = createNativeStackNavigator();
const Screens = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const network = await Network.getNetworkStateAsync();
    let unsubscribe;
    if (network.isConnected === true) {
      unsubscribe = auth.onAuthStateChanged((user) => {
        if (user && user.uid) {
          setTimeout(() => {
            setCurrentUser(true);
            setLoading(false);
          }, 1000);
        } else {
          setCurrentUser(false);
          setLoading(false);
        }
      });
    } else {
      alert("Bad network connection")
    }

    return () => unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {loading ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="loading" component={LoadingScreen} />
        </Stack.Navigator>
      ) : !currentUser && !loading ? (
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
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Payment" component={PaymentTest} />
          <Stack.Screen
            name="GroupPaymentData"
            component={CreateGroupPayment}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Screens;
