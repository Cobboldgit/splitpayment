import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { appColor } from "../constants";
import { useNavigation } from "@react-navigation/native";

const GetStartedScreen = () => {
  const { navigate, goBack } = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: appColor.white,
      }}
    >
      <View style={{ flex: 9 }}>
        <View style={{ flex: 7,}}></View>
        <View style={{ flex: 3, }}>
          <View style={{ flex: 3, }}>
            <Text
              style={{
                fontSize: 40,
                fontWeight: "bold",
                color: appColor.black,
              }}
            >
              Create.
            </Text>
          </View>
          <View style={{ flex: 7,}}>
            <Text style={{ color: appColor.black, fontSize: 18 }}>
              Easily create a group, add members either from your contacts and use it any time
            </Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            onPress={() => navigate("Login")}
            style={{
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              borderColor: appColor.black,
              borderWidth: 1,
              borderRadius: 25,
              width: 150,
            }}
          >
            <Text style={{ color: appColor.black }}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate("Phone")}
            style={{
              height: 50,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: appColor.black,
              borderRadius: 25,
              width: 150,
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
