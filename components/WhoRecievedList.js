import { View, Text } from "react-native";
import React from "react";
import { appColor } from "../constants";

const WhoRecievedList = () => {
  return (
    <View
      style={{
        backgroundColor: appColor.lightpurple,
        borderRadius: 5,
        height: 50,
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10
      }}
    >
      <Text style={{color: appColor.purple, fontSize: 16}}>Augustine Cobbold</Text>
      <Text style={{color: appColor.purple, fontSize: 16}}>Ghc 400.00</Text>
    </View>
  );
};

export default WhoRecievedList;
