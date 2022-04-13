import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useCallback, useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { appColor, icons } from "../constants";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import GroupCard from "../components/GroupCard";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAddedParticipant,
  getAllGroups,
} from "../store/actions/userActions";
import { getContacts } from "../store/actions/contactsAction";
import * as Contacts from "expo-contacts";
import AppButton from "../components/AppButton";

const GroupsScreen = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const userData = useSelector((state) => state.userReducers.userData);
  const auth = useSelector((state) => state.firebaseReducer.auth);

  useEffect(() => {
    const getallGroups = dispatch(getAllGroups());
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.PHONE_NUMBERS, Contacts.Fields.Name],
        });
        if (data.length > 0) {
          const contact = data;
          dispatch(getContacts(contact));
        }
      }
    })(getallGroups);
  }, []);

  useFocusEffect(
    useCallback(() => {
      dispatch(clearAddedParticipant());
    }, [])
  );

  // Plus button handler
  const handleAddGroup = () => {
    navigate("AddGroup");
  };

  // group card pressed
  const handleGroupPressed = (item) => {
    navigate("GroupDetails", item);
  };

  return (
    <View style={{ flex: 1, backgroundColor: appColor.white }}>
      <View
        style={{
          height: 50,
          backgroundColor: appColor.white,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigate("Profile")}>
              <Image
                source={icons.user}
                style={{ height: 20, width: 20, tintColor: appColor.purple }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 18 }}>Groups</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity onPress={handleAddGroup}>
              {icons.add}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 16 }}
      >
        {/* hello user text  */}
        <View style={{ alignItems: "center", height: 100, marginVertical: 10 }}>
          <Text style={{ color: appColor.black, fontSize: 16 }}>
            Hello {userData[0]?.displayName.split(" ")[0]}!
          </Text>
        </View>

        {/* recent text */}
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{ color: appColor.gray, fontSize: 16, letterSpacing: 1 }}
          >
            RECENT
          </Text>
        </View>

        {/* listing groups  */}
        <View style={{marginBottom: 100}}>
          {userData[0]?.groups?.map((item, index) => {
            console.log(index);
            return (
              <View key={index}>
                <GroupCard
                  groupName={item?.groupName}
                  participants={item?.participants}
                  timestamp={item?.timestamp}
                  id={item?.id}
                  onPress={() => handleGroupPressed(item)}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
      
    </View>
  );
};

export default GroupsScreen;
