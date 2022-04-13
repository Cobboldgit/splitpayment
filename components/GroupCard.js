import { View, Text, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { appColor, icons } from "../constants";
import React from "react";

const GroupCard = ({ onPress, groupName, participants, id, timestamp }) => {

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{ marginVertical: 10 }}
    >
      <LinearGradient
        colors={[appColor.purple, appColor.lightBlue]}
        end={{ x: 0.7, y: 1.0 }}
        style={{
          height: 116,
          borderRadius: 10,
          padding: 16,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: appColor.white,
            }}
          >
            {groupName}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={icons.user}
              style={{
                tintColor: appColor.gray,
                height: 16,
                width: 16,
                marginHorizontal: 5,
              }}
            />
            <Text
              style={{
                color: appColor.white,
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              {participants.length}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ color: appColor.gray, fontSize: 12 }}>
            Last edited
          </Text>
          <Text style={{ color: appColor.white, fontSize: 16 }}>
            {new Date(timestamp).toLocaleString().split(" ")[1] +
              " " +
              new Date(timestamp).toLocaleString().split(" ")[3]}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GroupCard;
