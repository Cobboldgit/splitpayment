import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import React from "react";
import { appColor, images } from "../constants";
import { useNavigation } from "@react-navigation/native";
import ImageSlider from "../components/ImageSlider";


const GetStartedScreen = () => {
  const { navigate, goBack } = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        // paddingHorizontal: 16,
        backgroundColor: appColor.white,
      }}
    >
      <View style={{ flex: 9, paddingVertical: 16 }}>
       <ImageSlider/>
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
