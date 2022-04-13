import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { appColor } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const PhoneNumberScreen = () => {
  const [focused, setFocused] = useState(false);
  const [phone, setPhone] = useState("");
  const { navigate, goBack } = useNavigation();

  const handleContinue = () => {
    if (phone) {
      navigate("Register", phone);
    } else {
      alert("invalid");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: appColor.white }}>
      <View
        style={{ height: 50, justifyContent: "center", paddingHorizontal: 16 }}
      >
        <View>
          <TouchableOpacity onPress={() => goBack()}>
            <MaterialIcons
              name="arrow-back-ios"
              color={appColor.black}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ marginHorizontal: 20 }}>
        <View style={{ height: 80, justifyContent: "center" }}>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", color: appColor.black }}
          >
            Create account
          </Text>
          <LinearGradient
            colors={[appColor.lightBlue, appColor.purple]}
            start={{ x: 1, y: 0.3 }}
            style={{ height: 3, width: 140 }}
          />
        </View>
        <View style={{ height: 80, justifyContent: "space-between" }}>
          <Text style={{ color: appColor.black, fontSize: 16 }}>
            Phone number
          </Text>
          <TextInput
            value={phone}
            onChangeText={(value) => setPhone(value)}
            onFocus={(e) => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            keyboardType="number-pad"
            placeholder="Enter your phone number"
            style={{
              borderColor: focused ? appColor.purple : appColor.gray,
              borderWidth: 1,
              borderBottomWidth: 2,
              borderRadius: 5,
              height: 50,
              paddingHorizontal: 20,
            }}
          />
        </View>
        <View
          style={{
            height: 100,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={handleContinue}
            style={{
              backgroundColor: appColor.purple,
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              width: 200,
              borderRadius: 25,
            }}
          >
            <Text style={{ color: appColor.white }}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PhoneNumberScreen;
