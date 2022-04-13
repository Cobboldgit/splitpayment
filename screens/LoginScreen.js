import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { appColor, icons } from "../constants";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AppButton from "../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";


const LoginScreen = () => {
  const [focused, setFocused] = useState("no");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const { navigate, goBack } = useNavigation();

  useEffect(() => {
    if (password && email) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, email]);

  const handleLogin = () => {
    navigate("Groups");
  };

  return (
    <View style={{ flex: 1, backgroundColor: appColor.white}}>
      <View style={{height: 50, justifyContent: "center", paddingHorizontal: 16}}>
        <View>
          <TouchableOpacity onPress={() => goBack()}>
        <MaterialIcons name="arrow-back-ios" color={appColor.black} size={20}/>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: 20 }}
      >
        <View style={{ height: 50, justifyContent: "center" }}>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", color: appColor.black }}
          >
            Login
          </Text>
          <LinearGradient
            colors={[appColor.lightBlue, appColor.purple]}
            start={{ x: 1, y: 0.3 }}
            style={{ height: 3, width: 50 }}
          />
        </View>
        <View style={{ height: 170, justifyContent: "space-between" }}>
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
            placeholderTextColor={appColor.gray}
            style={{
              borderColor:
                focused === "email" || email ? appColor.purple : appColor.gray,
              borderWidth: 1,
              borderBottomWidth: 2,
              borderRadius: 5,
              height: 50,
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
            placeholderTextColor={appColor.gray}
            style={{
              borderColor:
                focused === "password" || password
                  ? appColor.purple
                  : appColor.gray,
              borderWidth: 1,
              borderBottomWidth: 2,
              borderRadius: 5,
              height: 50,
              paddingHorizontal: 20,
              fontSize: 16,
            }}
          />
        </View>

        {/* sigin with google  */}
        {focused === "no" && !email && !password ? (
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
            <TouchableOpacity disabled={disabled} onPress={() => handleLogin()}>
              <AppButton
                title="Login"
                color={!disabled ? appColor.white : appColor.purple}
                backgroundColor={{
                  start: !disabled ? appColor.lightBlue : appColor.lightpurple,
                  end: !disabled ? appColor.purple : appColor.lightpurple,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default LoginScreen;
