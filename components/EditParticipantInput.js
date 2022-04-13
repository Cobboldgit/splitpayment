import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { appColor } from "../constants";
import AppButton from "./AppButton";

const EditParticipantInput = ({ nickName, phoneNumber, handleDone }) => {
  const [focused, setFocused] = useState("no");
  const [name, setName] = useState(nickName);
  const [phone, setPhone] = useState(phoneNumber);

  return (
    <View>
      <View
        style={{
          height: 230,
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <Text
          style={{
            color: appColor.black,
            fontSize: 16,
          }}
        >
          Name
        </Text>
        <TextInput
          value={name}
          onChangeText={(value) => setName(value)}
          onFocus={(e) => {
            setFocused("name");
          }}
          onBlur={() => {
            setFocused("no");
          }}
          placeholder="Enter your name"
          placeholderTextColor={
            focused === "name" ? appColor.black : appColor.gray
          }
          style={{
            borderColor:
              name || focused === "name" ? appColor.purple : appColor.gray,
            borderWidth: 1,
            borderBottomWidth: 2,
            borderRadius: 5,
            height: 50,
            paddingHorizontal: 20,
          }}
        />
        <Text
          style={{
            color: appColor.black,
            fontSize: 16,
          }}
        >
          Phone
        </Text>
        <TextInput
          value={phone}
          onChangeText={(value) => setPhone(value)}
          onFocus={(e) => {
            setFocused("phone");
          }}
          onBlur={() => {
            setFocused("no");
          }}
          placeholder="Enter your phone"
          placeholderTextColor={
            focused === "phone" ? appColor.black : appColor.gray
          }
          style={{
            borderColor:
              phone || focused === "phone" ? appColor.purple : appColor.gray,
            borderWidth: 1,
            borderBottomWidth: 2,
            borderRadius: 5,
            height: 50,
            paddingHorizontal: 20,
          }}
        />

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity onPress={() => handleDone({nickName: name, phone})}>
            <AppButton
              title={"Done"}
              color={appColor.white}
              backgroundColor={{
                start: appColor.purple,
                end: appColor.lightBlue,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditParticipantInput;
