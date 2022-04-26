import { View, Text } from "react-native";
import React from "react";
import { appColor } from "../constants";

const WhoRecievedList = ({name, phone}) => {
  return (
    <View
      style={{
        borderRadius: 5,
        height: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{flex: 1}}>
        <View style={{height: 10, width: 10, borderRadius: 10, borderWidth: 2, borderColor: appColor.gray}}/>
      </View>
      <View style={{flex: 9, flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
      <Text style={{color: appColor.black, fontSize: 16}}>{name}</Text>
      <Text style={{color: appColor.gray, fontSize: 16}}>{phone}</Text>
      </View>
    </View>
  );
};

export default WhoRecievedList;
