import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Switch,
  Modal,
  StyleSheet,
  Pressable
} from "react-native";
import React, { useEffect, useState } from "react";
import { appColor, icons } from "../constants";
import Uuid from "../components/Uuid";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import AppButton from "../components/AppButton";
import { BlurView } from "expo-blur";
import { EvilIcons } from "@expo/vector-icons";
import CheckBox from "../components/CheckBox";

import BlurViewNext from "../BlurBoxNew";
import { useSelector } from "react-redux";

const PaymentScreen = ({ route }) => {
  const [focused, setFocused] = useState("no");
  const [remark, setRemark] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [a, setA] = useState(false);
  const [accountNumber, setAccountNumber] = useState("")
  const item = route.params;
  const userData = useSelector((state) => state.userReducers.userData)

  // console.log("===============>", userData);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const proceedToPay = () => {
    if (accountNumber) {
      setModalVisible(!modalVisible);
    } else {
      alert("Enter sender number")
    }
  };

  useEffect(() => {
    if (isEnabled) {
      setAccountNumber(userData[0]?.phoneNumber)
    } else {
      setAccountNumber("")
    }
  },[isEnabled])
 

  const renderParticipants = () => {
    const handleIsChecked = () => {
    
    }
    return item?.participants.map((item, index) => {
      return (
        <Pressable key={index}>
          <View
          style={{
            borderColor: appColor.black,
            borderWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: 1,
            borderRadius: 5,
            height: 50,
            alignItems: "center",
            paddingHorizontal: 16,
            marginVertical: 10,
            flexDirection: "row"
          }}
        >
            <CheckBox
              size={24}
              color={appColor.black}
              onPress={() => setSelectedItem(item)}
              isChecked={selectedItem}
            />
            <View style={{ marginLeft: 10 }}>
              <Text>{item?.nickName}</Text>
              <Text style={{ color: appColor.darkgray }}>{item?.phone}</Text>
            </View>
        </View>
        </Pressable>
      );
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: appColor.white }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <BlurViewNext tint={"default"} intensity={320} style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <EvilIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: "space-between",
              height: 170,
              paddingHorizontal: 20,
            }}
          >
            <Text
              style={{
                color: appColor.black,
                fontSize: 16,
              }}
            >
              Remark
            </Text>
            <TextInput
              value={remark}
              onChangeText={(value) => setRemark(value)}
              onFocus={(e) => {
                setFocused("remark");
              }}
              onBlur={() => {
                setFocused("no");
              }}
              placeholder="Enter Remark"
              placeholderTextColor={
                focused === "remark" ? appColor.black : appColor.gray
              }
              style={{
                borderColor:
                  focused === "remark" ? appColor.black : appColor.gray,
                borderWidth: StyleSheet.hairlineWidth,
                borderBottomWidth: 1,
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
              Amount
            </Text>
            <TextInput
              value={amount}
              onChangeText={(value) => setAmount(value)}
              onFocus={(e) => {
                setFocused("amount");
              }}
              onBlur={() => {
                setFocused("no");
              }}
              placeholder="Enter Amount"
              placeholderTextColor={
                focused === "amount" ? appColor.black : appColor.gray
              }
              style={{
                borderColor:
                  focused === "amount" ? appColor.black : appColor.gray,
                borderWidth: StyleSheet.hairlineWidth,
                borderBottomWidth: 1,
                borderRadius: 5,
                height: 50,
                paddingHorizontal: 20,
                fontSize: 16,
              }}
            />
          </View>
          <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
            <Text
              style={{
                color: appColor.black,
                fontSize: 16,
              }}
            >
              Who should recieve?
            </Text>
            <View>{renderParticipants()}</View>
          </View>
        </BlurViewNext>
      </Modal>

      {/* header */}
      <LinearGradient
        colors={[appColor.purple, appColor.lightBlue]}
        start={{ x: 1, y: 0 }}
        style={{
          height: Dimensions.get("window").height / 3,
        }}
      ></LinearGradient>
      <View
        style={{
          marginTop: 20,
          paddingHorizontal: 20,
          height: 80,
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: appColor.black,
            fontSize: 16,
          }}
        >
          account number
        </Text>
        <TextInput
          value={accountNumber}
          onChangeText={(value) => setAccountNumber(value)}
          onFocus={(e) => {
            setFocused("remark");
          }}
          onBlur={() => {
            setFocused("no");
          }}
          placeholder="Enter number. eg: 0541231231"
          placeholderTextColor={
            focused === "remark" ? appColor.black : appColor.gray
          }
          style={{
            borderColor: focused === "remark" ? appColor.black : appColor.gray,
            borderWidth: StyleSheet.hairlineWidth,
            borderBottomWidth: 1,
            borderRadius: 5,
            height: 50,
            paddingHorizontal: 20,
            fontSize: 16,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ color: appColor.black }}>Use my number</Text>
        <Switch
          trackColor={{ false: appColor.black, true: appColor.purple }}
          thumbColor={isEnabled ? appColor.white : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View
        style={{
          position: "absolute",
          top: Dimensions.get("window").height - 100,
          width: Dimensions.get("window").width,
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => proceedToPay()}>
          <AppButton
            color={appColor.white}
            title="Next"
            backgroundColor={{
              start: appColor.purple,
              end: appColor.lightBlue,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentScreen;
