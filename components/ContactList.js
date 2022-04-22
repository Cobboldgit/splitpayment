import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { appColor } from "../constants";

const ContactList = ({ handleSelectedItem }) => {
  const contacts = useSelector((state) => state.contactsReducer.contacts);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={contacts}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <ContactCard onPress={handleSelectedItem} item={item} />
        )}
        style={{paddingTop: 20}}
      />
    </View>
  );
};

export default ContactList;

const ContactCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (item?.phoneNumbers) {
          onPress({
            name: item?.name,
            phoneNumber: item?.phoneNumbers[0]?.number,
          });
        }else{
          alert("no phone number")
        }
      }}
      style={{
        // height: 60,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        borderColor: appColor.gray,
        borderBottomWidth: StyleSheet.hairlineWidth,
        // backgroundColor: appColor.white
        
        paddingVertical: 10
      }}
    >
      <View>
        <View
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
            backgroundColor: appColor.lightPink,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
        >
          <Text style={{ fontSize: 16, color: appColor.white }}>
            {item?.name[0]}
          </Text>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 14 }}>{item?.name}</Text>
        <Text style={{ color: appColor.gray, fontSize: 14 }}>
          {item?.phoneNumbers ? item?.phoneNumbers[0]?.number : "no number"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
