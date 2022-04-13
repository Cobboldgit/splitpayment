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

const ContactList = ({ onScrollBegin, handleSelectedItem }) => {
  const contacts = useSelector((state) => state.contactsReducer.contacts);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={onScrollBegin}
        data={contacts}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <ContactCard onPress={handleSelectedItem} item={item} />
        )}
      />
    </View>
  );
};

export default ContactList;

const ContactCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress({
          name: item?.name,
          phoneNumber: item?.phoneNumbers[0].number,
        });
      }}
      style={{
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        borderColor: appColor.lightGray,
        borderTopWidth: StyleSheet.hairlineWidth,
        // backgroundColor: appColor.white
      }}
    >
      <View>
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: appColor.purple,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 20,
          }}
        >
          <Text style={{ fontSize: 24, color: appColor.white }}>
            {item?.name[0]}
          </Text>
        </View>
      </View>
      <View>
        <Text style={{ fontSize: 16 }}>{item?.name}</Text>
        <Text style={{ color: appColor.gray }}>
          {item?.phoneNumbers[0].number}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
