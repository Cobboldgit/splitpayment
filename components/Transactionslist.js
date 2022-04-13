import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { appColor, icons } from "../constants";

const Transactionslist = ({onPress, item}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: appColor.lightpurple,
          paddingVertical: 15,
          paddingHorizontal: 5,
          borderRadius: 10,
          //   height: 70
          marginVertical: 10
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderColor: appColor.gray,
            borderRightWidth: 1,
            paddingHorizontal: 5,
            flex: 1,
            paddingVertical: 10,
          }}
        >
          <Image
            source={icons.user}
            style={{
              height: 20,
              width: 20,
              tintColor: appColor.gray,
              marginRight: 5,
            }}
          />
          <Text style={{ fontSize: 18 }}>5</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 9,
          }}
        >
          <View style={{ paddingHorizontal: 5 }}>
            <Text style={{ marginBottom: 5 }}>Ghc 2000.00</Text>
            <Text>10: 15 PM</Text>
          </View>
          <View style={{ paddingHorizontal: 5 }}>
            <Text style={{ marginBottom: 5 }}>
              <Text style={{ color: appColor.gray }}>Each: </Text>
              Ghc 400.00
            </Text>
            <Text>{''}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Transactionslist;
