import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { appColor } from "../constants";
import { useNavigation } from "@react-navigation/native";

const GetStartedScreen = () => {

    const {navigate, goBack} = useNavigation()

  return (
    <View style={{ flex: 1, paddingHorizontal: 16, backgroundColor: appColor.white }}>
      <View style={{ flex: 9 }}></View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-around",}}>
          <TouchableOpacity
          onPress={() => navigate("Login")}
            style={{
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: appColor.white,
              borderColor: appColor.purple,
              borderWidth: 1,
              borderRadius: 25,
              width: 150
            }}
          >
            <Text style={{ color: appColor.purple }}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={() => navigate('Phone')}
            style={{
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: appColor.purple,
              borderRadius: 25,
              width: 150
            }}
          >
            <Text style={{ color: appColor.white }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GetStartedScreen;
