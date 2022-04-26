import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { appColor, icons, images } from "../constants";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import AppButton from "../components/AppButton";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/actions/authActions";
import Loading from "../components/Loading";
import { Error } from "../components/AleartBox";
import { alertError } from "../store/actions/userActions";

const LoginScreen = () => {
  const [focused, setFocused] = useState("no");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { navigate, goBack } = useNavigation();
  const dispatch = useDispatch();
  const isloading = useSelector((state) => state.userReducers.loading);

  useEffect(() => {
    if (password && email) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password, email]);

  const handleLogin = () => {
    if (email && password) {
      let trimEmail = email.toLowerCase().trim();
      let trimPassword = password.trim();
      dispatch(loginUser(trimEmail, trimPassword));
    } 
  };

  return (
    <ImageBackground
      source={images.gradientBack}
      style={{
        flex: 1,
        backgroundColor: appColor.white,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
      }}
    >
      <Error />
      {isloading ? <Loading /> : null}
      <View
        style={{
          height: 50,
          justifyContent: "center",
          paddingHorizontal: 16,
        }}
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
              Login
            </Text>
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
                  focused === "email" || email ? appColor.black : appColor.gray,
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
            <View style={{ flexDirection: "row" }}>
              <TextInput
                secureTextEntry={!passwordVisible}
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
                      ? appColor.black
                      : appColor.gray,
                  height: 50,
                  paddingLeft: 20,
                  fontSize: 16,
                  borderTopLeftRadius: 5,
                  borderBottomLeftRadius: 5,
                  borderLeftWidth: 1,
                  borderBottomWidth: 2,
                  borderTopWidth: 1,
                  flex: 9,
                }}
              />
              <View
                style={{
                  height: 50,
                  borderRightWidth: 1,
                  borderTopRightRadius: 5,
                  borderBottomRightRadius: 5,
                  borderTopWidth: 1,
                  borderBottomWidth: 2,
                  paddingRight: 16,
                  borderColor:
                    focused === "password" || password
                      ? appColor.black
                      : appColor.gray,
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  style={{ marginTop: 10 }}
                >
                  <Image
                    source={passwordVisible ? icons.eye : icons.disabledEye}
                    style={{
                      width: 22,
                      height: 22,
                      top: -5,
                      tintColor: appColor.black,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* // register button */}
          <View
            style={{
              height: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity disabled={false} onPress={() => handleLogin()}>
              <AppButton
                title="Login"
                color={!disabled ? appColor.white : appColor.purple}
                backgroundColor={{
                  start: !disabled ? appColor.black : appColor.lightpurple,
                  end: !disabled ? appColor.black : appColor.lightpurple,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default LoginScreen;
