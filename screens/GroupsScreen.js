import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
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


const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};


const GroupsScreen = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation();
  const userData = useSelector((state) => state.userReducers.userData);
  const auth = useSelector((state) => state.firebaseReducer.auth);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    const getallGroups = dispatch(getAllGroups());
    return () => {
      getallGroups
    }
  }, [refreshing])

  // Get phone contact
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

  // Clear participants state anytime this Screen is focused
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
                style={{ height: 20, width: 20, tintColor: appColor.black }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ color: appColor.black, fontSize: 16 }}>
              Hello {userData[0]?.displayName.split(" ")[0]}!
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity onPress={handleAddGroup}>
              {icons.add}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }
        stickyHeaderIndices={[2, 3]}
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 16 }}
      >
        <View style={{ alignItems: "center", paddingVertical: 20 }}>
          <Image source={icons.team1} style={{ height: 250, width: 250 }} />
        </View>
        <View
          style={{
            justifyContent: "center",
            backgroundColor: appColor.white,
            paddingVertical: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                backgroundColor: appColor.lightPink,
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 20,
                height: 100,
                flex: 1,
                marginRight: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderRadius: 30,
                  backgroundColor: appColor.white,
                  height: 40,
                  width: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: appColor.lightPink,
                  }}
                >
                  {userData[0]?.groups?.length}
                </Text>
              </View>
              <Text
                style={{
                  color: appColor.white,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Groups
              </Text>
            </View>
            <View
              style={{
                marginLeft: 20,
                backgroundColor: appColor.lightBlue,
                borderRadius: 20,
                paddingHorizontal: 16,
                paddingVertical: 20,
                height: 100,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderRadius: 30,
                  backgroundColor: appColor.white,
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 5,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ color: appColor.lightBlue, fontSize: 16 }}>
                  Ghc 0
                </Text>
              </View>
              <Text
                style={{
                  color: appColor.white,
                  fontSize: 16,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Total Amount Spent
              </Text>
            </View>
          </View>
        </View>

        {/* recent text */}
        <View style={{ paddingVertical: 10, backgroundColor: appColor.white }}>
          <Text
            style={{ color: appColor.gray, fontSize: 16, letterSpacing: 1 }}
          >
            RECENT
          </Text>
        </View>

        {/* listing groups  */}
        <View style={{ marginBottom: 100 }}>
          {userData[0]?.groups?.length === 0 ||
          userData[0]?.groups === undefined ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 300,
              }}
            >
              <Text style={{color: appColor.darkgray, fontSize: 18}}>No group</Text>
            </View>
          ) : (
            userData[0]?.groups?.map((item, index) => {
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
            })
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default GroupsScreen;
