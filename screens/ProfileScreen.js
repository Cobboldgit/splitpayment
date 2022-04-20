import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet
} from "react-native";
import React from "react";
import { appColor, icons } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "../store/actions/authActions";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { goBack } = useNavigation();
  const userData = useSelector((state) => state.userReducers.userData);
  console.log(userData);
  const handleSignOut = () => {
    dispatch(signOut());
  };
  return (
    <View style={{ flex: 1, backgroundColor: appColor.white }}>
      <View style={{ height: 50, justifyContent: "center" }}>
        <LinearGradient
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            height: "100%",
            paddingHorizontal: 16,
            // borderColor: appColor.white,
            // borderBottomWidth: StyleSheet.hairlineWidth,
          }}
          colors={[appColor.lightPink, appColor.lightBlue]}
          end={{ x: 0.7, y: 1.0 }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => goBack()}>
              <MaterialIcons
                name="arrow-back-ios"
                color={appColor.white}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ color: appColor.white, fontSize: 16 }}>Profile</Text>
          </View>
          <View style={{ flex: 1 }}></View>
        </LinearGradient>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={[appColor.lightPink, appColor.lightBlue]}
          end={{ x: 0.7, y: 1.0 }}
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            height: 250,
            paddingVertical: 25,
           
          }}
        >
          <View
            style={{
              borderColor: appColor.white,
              borderWidth: 2,
              backgroundColor: appColor.white,
              height: 120,
              width: 120,
              borderRadius: 200,
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Image
              source={icons.user}
              style={{
                tintColor: appColor.lightBlue,
                height: "92%",
                width: "92%",
              }}
            />
          </View>
          <Text
            style={{ fontSize: 24, color: appColor.white, fontWeight: "bold" }}
          >
            {userData[0]?.displayName}
          </Text>
          <Text style={{ fontSize: 18, color: appColor.white }}>
            {userData[0]?.phoneNumber}
          </Text>
        </LinearGradient>
        <View style={{ paddingHorizontal: 16, paddingTop: 50 }}>
          <View
            style={{
              height: 55,
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: appColor.black,
              }}
            >
              Name
            </Text>
            <View
              style={{
                borderColor: appColor.black,
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text style={{ fontSize: 18 }}>{userData[0]?.displayName}</Text>
            </View>
          </View>
          <View
            style={{
              height: 55,
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: appColor.black,
              }}
            >
              Email
            </Text>
            <View
              style={{
                borderColor: appColor.black,
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text style={{ fontSize: 18 }}>{userData[0]?.email}</Text>
            </View>
          </View>
          <View
            style={{
              height: 55,
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: appColor.black,
              }}
            >
              Phone
            </Text>
            <View
              style={{
                borderColor: appColor.black,
                borderBottomWidth: 1,
                paddingBottom: 5,
              }}
            >
              <Text style={{ fontSize: 18 }}>{userData[0]?.phoneNumber}</Text>
            </View>
          </View>
        </View>
        <View style={{paddingHorizontal: 16, marginTop: 30, marginBottom: 30, height: 120, justifyContent: "space-between"}}>
          <TouchableOpacity
            style={{
              borderRadius: 25,
              height: 50,
              width: "100%",
              backgroundColor: appColor.lightPink,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{color: appColor.white, fontSize: 18,}}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
          onPress={handleSignOut}
            style={{
              borderRadius: 25,
              height: 50,
              width: "100%",
              backgroundColor: appColor.transparent,
              borderColor: appColor.gray,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text style={{color: appColor.red, fontSize: 18,}}>Sign out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
