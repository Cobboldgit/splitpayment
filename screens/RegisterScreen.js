import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { appColor, images } from "../constants";
import AppButton from "../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { createUserWithEmail } from "../store/actions/authActions";
import { LinearGradient } from "expo-linear-gradient";

const RegisterScreen = ({ route }) => {
  const [focused, setFocused] = useState("no");
  const [disabled, setDisabled] = useState(true);
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navigate, goBack } = useNavigation();
  const disptach = useDispatch();

  const phone = route.params;
  useEffect(() => {
    if (nickName && password && email) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [nickName, password, email]);

  const handleRegister = async () => {
    if (nickName && password && email) {
      let data = {
        nickName,
        password,
        email,
        phone,
      };
      disptach(createUserWithEmail(data));
      setNickName('')
      setEmail('')
      password('')
    }
  };

  return (
    <ImageBackground
      source={images.gradientBack}
      style={{ flex: 1, backgroundColor: appColor.white }}
    >
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 20 }}
      >
        <View
          style={{
            backgroundColor: appColor.white,
            borderRadius: 20,
            paddingHorizontal: 20,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: appColor.lightGray,
          }}
        >
          <View style={{ height: 70, justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                color: appColor.black,
              }}
            >
              Create account
            </Text>
          </View>
          <View style={{ height: 350, justifyContent: "space-between" }}>
            <Text
              style={{
                color: appColor.black,
                fontSize: 16,
              }}
            >
              Name
            </Text>
            <TextInput
              value={nickName}
              onChangeText={(value) => setNickName(value)}
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
                  focused === "name" ? appColor.black : appColor.gray,
                borderWidth: 1,
                borderBottomWidth: 2,
                borderRadius: 5,
                height: 70,
                paddingHorizontal: 20,
                fontSize: 16,
              }}
            />
            <Text
              style={{
                color: appColor.black,
                fontSize: 16,
              }}
            >
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={(value) => setEmail(value)}
              onFocus={(e) => {
                setFocused("email");
              }}
              onBlur={() => {
                setFocused("no");
              }}
              placeholder="Enter your email"
              placeholderTextColor={
                focused === "email" ? appColor.black : appColor.gray
              }
              style={{
                borderColor:
                  focused === "email" ? appColor.black : appColor.gray,
                borderWidth: 1,
                borderBottomWidth: 2,
                borderRadius: 5,
                height: 70,
                paddingHorizontal: 20,
              }}
            />
            <Text
              style={{
                color: appColor.black,
                fontSize: 16,
              }}
            >
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={(value) => setPassword(value)}
              onFocus={(e) => {
                setFocused("password");
              }}
              onBlur={() => {
                setFocused("no");
              }}
              placeholder="Enter your password"
              placeholderTextColor={
                focused === "password" ? appColor.black : appColor.gray
              }
              style={{
                borderColor:
                  focused === "password" ? appColor.black : appColor.gray,
                borderWidth: 1,
                borderBottomWidth: 2,
                borderRadius: 5,
                height: 70,
                paddingHorizontal: 20,
              }}
            />
          </View>

          {/* sigin with google  */}
          {focused === "no" && !nickName && !email && !password ? (
            <View style={{ height: 150, justifyContent: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    height: 1,
                    backgroundColor: appColor.gray,
                    width: 100,
                  }}
                />
                <Text style={{ color: appColor.gray, marginHorizontal: 10 }}>
                  Or
                </Text>
                <View
                  style={{
                    height: 1,
                    backgroundColor: appColor.gray,
                    width: 100,
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: appColor.red,
                  flexDirection: "row",
                  borderRadius: 10,
                  marginTop: 20,
                }}
              >
                <AntDesign name="google" size={20} color={appColor.white} />
                <Text style={{ color: appColor.white, marginLeft: 5 }}>
                  Sign in with Google
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            // register button
            <View
              style={{
                height: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                disabled={disabled}
                onPress={() => handleRegister()}
              >
                <AppButton
                  title="Register"
                  color={!disabled ? appColor.white : appColor.purple}
                  backgroundColor={{
                    start: !disabled ? appColor.black : appColor.lightpurple,
                    end: !disabled ? appColor.black : appColor.lightpurple,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default RegisterScreen;
