import { View, Text, Pressable } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CheckBox = ({ isChecked, onPress, size, color }) => {
  console.log(isChecked);
  const iconName = isChecked ? "checkbox-marked" : "checkbox-blank-outline";
  
  return (
    <View>
      <Pressable onPress={onPress}>
        <MaterialCommunityIcons name={iconName} size={size} color={color} />
      </Pressable>
    </View>
  );
};

export default CheckBox;
