import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React from "react";
import { appColor, icons } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "../store/actions/authActions";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import Loading from "../components/Loading";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const userData = useSelector((state) => state.userReducers.userData);
  const loadingState = useSelector((state) => state.userReducers.Loading);

  const handleSignOut = () => {
    dispatch(signOut());
  };
  return (
    <View style={{ flex: 1, backgroundColor: appColor.white }}>
      {loadingState ? <Loading /> : null}
      {/* body  */}
      <ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        {/* profile details  */}
        <View style={{ height: 300 }}>
          <View style={{ height: "70%", backgroundColor: appColor.lightPink }}>
            <Text
              style={{
                color: appColor.white,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                marginTop: 20,
              }}
            >
              PROFILE
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              height: 250,
              width: Dimensions.get("window").width,
              backgroundColor: appColor.transparent,
              paddingHorizontal: 16,
              paddingVertical: 16,
              justifyContent: "flex-end",
              marginTop: 50,
            }}
          >
            <View
              style={{
                width: "100%",
                height: 220,
                backgroundColor: appColor.white,
                shadowColor: appColor.black,
                shadowOpacity: 0.4,
                shadowRadius: 20,
                shadowOffset: {
                  height: 2,
                  width: 0,
                },
                elevation: 10,
                borderRadius: 20,
                flexDirection: "row",
                paddingVertical: 16,
                paddingHorizontal: 10,
              }}
            >
              <View style={{ flex: 1 }}></View>
              <View
                style={{
                  flex: 8,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: appColor.lightGray,
                    borderRadius: 100,
                    marginBottom: 10,
                  }}
                >
                  <Image
                    source={icons.user}
                    style={{
                      height: 70,
                      width: 70,
                      tintColor: appColor.lightPink,
                      margin: 5,
                    }}
                  />
                </View>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginBottom: 5 }}
                >
                  {userData[0]?.displayName}
                </Text>
                <Text style={{ fontSize: 18, color: appColor.darkgray }}>
                  {userData[0]?.email}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={{ backgroundColor: appColor.white }}>
                  <MaterialIcons
                    name="edit-off"
                    size={24}
                    color={appColor.lightPink}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* profile details end  */}

        {/* buttons  */}
        <View style={{ paddingHorizontal: 16, marginTop: 30 }}>
          <ProfileOption
            title={"Groups"}
            icon={<Ionicons name="list" color={appColor.white} size={30} />}
            onPress={() => goBack()}
          />
          <ProfileOption
            title={"Payment History"}
            icon={
              <MaterialIcons name="payments" color={appColor.white} size={30} />
            }
            onPress={() => alert("payment")}
          />
          <ProfileOption
            title={"Logout"}
            icon={<Ionicons name="log-out" color={appColor.white} size={30} />}
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>
      {/* body end  */}
    </View>
  );
};

const ProfileOption = ({ onPress, title, icon }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 15 }}
    >
      <View style={{ flex: 2 }}>
        <View
          style={{
            borderRadius: 100,
            backgroundColor: appColor.lightPink,
            height: 50,
            width: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </View>
      </View>
      <View style={{ flex: 8 }}>
        <Text
          style={{
            color: appColor.black,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProfileScreen;
