import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { appColor, images } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { Error } from "../components/AleartBox";
import { useDispatch } from "react-redux";
import { alertError } from "../store/actions/userActions";

const PhoneNumberScreen = () => {
  const [focused, setFocused] = useState(false);
  const [phone, setPhone] = useState("");
  const { navigate, goBack } = useNavigation();
  const dispatch = useDispatch()

  const handleContinue = () => {
    if (phone) {
      navigate("Register", phone.trim());
    } else {
      let open = {
        state: true,
        text: "Your phone number is required",
      };
      let close = {
        state: false,
        text: "",
      };
      dispatch(alertError(open));
      setTimeout(() => dispatch(alertError(close)), 4000);
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
      <ScrollView style={{ marginHorizontal: 20 }}>
        <View
          style={{
            backgroundColor: appColor.white,
            borderRadius: 20,
            paddingHorizontal: 30,
          }}
        >
          <View style={{ height: 80, justifyContent: "center" }}>
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
          <View style={{ height: 80, justifyContent: "space-between" }}>
            <Text style={{ color: appColor.black, fontSize: 16 }}>
              Phone number
            </Text>
            <TextInput
              value={phone}
              onChangeText={(value) => setPhone(value)}
              onFocus={(e) => {
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
              }}
              keyboardType="number-pad"
              placeholder="Enter your phone number"
              style={{
                borderColor: focused ? appColor.black : appColor.gray,
                borderWidth: 1,
                borderBottomWidth: 2,
                borderRadius: 5,
                height: 50,
                paddingHorizontal: 20,
              }}
            />
          </View>
          <View
            style={{
              height: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={handleContinue}
              style={{
                backgroundColor: appColor.black,
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                width: 200,
                borderRadius: 25,
              }}
            >
              <Text style={{ color: appColor.white }}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default PhoneNumberScreen;
