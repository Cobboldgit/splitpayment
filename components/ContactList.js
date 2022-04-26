import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { appColor } from "../constants";
import {MaterialIcons} from "@expo/vector-icons"

const ContactList = ({ handleSelectedItem }) => {
  const [search, setSearch] = useState("");
  const contacts = useSelector((state) => state.contactsReducer.contacts);
  const [filteredContacts, setFilterContacts] = useState(contacts);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = contacts.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterContacts(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilterContacts(contacts);
      setSearch(text);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 20, flexDirection: "row" }}>
        <View
          style={{
            height: 50,
            backgroundColor: appColor.white,
            borderColor: appColor.gray,
            borderLeftWidth: StyleSheet.hairlineWidth,
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: StyleSheet.hairlineWidth,
            width: "15%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MaterialIcons name="search" size={24} color={appColor.darkgray} />
        </View>
        <TextInput
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          placeholder="Search contact"
          style={{
            height: 50,
            backgroundColor: appColor.white,
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderRightWidth: StyleSheet.hairlineWidth,
            borderColor: appColor.gray,
            width: "85%",
          }}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filteredContacts}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <ContactCard onPress={handleSelectedItem} item={item} />
        )}
        style={{ paddingTop: 20 }}
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
        } else {
          alert("no phone number");
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

        paddingVertical: 10,
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
