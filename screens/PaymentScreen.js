import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Switch,
  Modal,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { appColor, icons } from "../constants";
import Uuid from "../components/Uuid";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import AppButton from "../components/AppButton";
import { BlurView } from "expo-blur";
import { EvilIcons, MaterialIcons, Ionicons } from "@expo/vector-icons";
import CheckBox from "../components/CheckBox";
import { Success } from "../components/AleartBox";
import BlurViewNext from "../BlurBoxNew";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { alertPending } from "../store/actions/userActions";

const PaymentScreen = ({ route }) => {
  const [focused, setFocused] = useState("no");
  const [remark, setRemark] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const item = route.params;
  const userData = useSelector((state) => state.userReducers.userData);
  const { goBack } = useNavigation();
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const dispatch = useDispatch();

  const handleSelectedItem = (item) => {
    selectedMembers.push(item);
  };

  const proceedToPay = () => {
    if (accountNumber) {
      setModalVisible(!modalVisible);
    } else {
      alert("Enter sender number");
    }
  };

  const handleProceedToPrev = () => {
    setModalVisible(!modalVisible);
    // dispatch(alertPending(true));
    // setTimeout(() => dispatch(alertPending(false)), 2000);
  };

  useEffect(() => {
    if (isEnabled) {
      setAccountNumber(userData[0]?.phoneNumber);
    } else {
      setAccountNumber("");
    }
  }, [isEnabled]);

  const renderParticipants = () => {
    return item?.participants.map((item, index) => {
      return (
        <View key={index}>
          <ListPart item={item} handleSelectedItem={handleSelectedItem} />
        </View>
      );
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: appColor.white }}>
      {/* alert box  */}
      <Success />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <BlurViewNext tint={"default"} intensity={320} style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 20, paddingVertical: 40 }}>
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
          <View
            style={{
              position: "absolute",
              width: Dimensions.get("window").width,
              transform: [
                { translateY: Dimensions.get("window").height - 100 },
              ],
              paddingHorizontal: 16,
            }}
          >
            <TouchableOpacity onPress={() => handleProceedToPrev()}>
              <View
                style={{
                  backgroundColor: appColor.green,
                  height: 50,
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: appColor.white }}>Proceed</Text>
              </View>
            </TouchableOpacity>
          </View>
        </BlurViewNext>
      </Modal>

      {/* header */}
      <LinearGradient
        colors={[appColor.lightPink, appColor.lightBlue]}
        start={{ x: 1, y: 0 }}
        style={{
          height: Dimensions.get("window").height / 3 - 50,
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 16,
            alignSelf: "flex-start",
          }}
        >
          <TouchableOpacity onPress={() => goBack()}>
            <MaterialIcons
              name="arrow-back-ios"
              size={20}
              color={appColor.white}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: appColor.lightGray,
            height: 100,
            width: 100,
            borderRadius: 100,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 30,
            paddingHorizontal: 20,
          }}
        >
          <Image source={icons.mtn} style={{ height: "100%", width: "100%" }} />
        </View>
      </LinearGradient>
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
          style={{
            borderRadius: 5,
            height: 50,
            paddingHorizontal: 20,
            fontSize: 16,
            backgroundColor: appColor.lighterPink,
            color: appColor.inputText,
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
          trackColor={{ false: appColor.black, true: appColor.lightPink }}
          thumbColor={isEnabled ? appColor.white : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 18, color: appColor.gray }}>
          Please make sure all reciepent numbers Mtn momo number.
        </Text>
        <Text style={{ fontSize: 18, color: appColor.gray }}></Text>
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
              start: appColor.lightPink,
              end: appColor.lightBlue,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ListPart = ({ item, handleSelectedItem }) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Pressable>
      <View
        style={{
          borderRadius: 5,
          height: 50,
          alignItems: "center",
          paddingHorizontal: 16,
          marginVertical: 10,
          flexDirection: "row",
        }}
      >
        <CheckBox
          size={24}
          color={appColor.black}
          onPress={() => {
            setIsChecked(!isChecked);
            handleSelectedItem(item);
          }}
          isChecked={!isChecked}
        />
        <View style={{ marginLeft: 10 }}>
          <Text>{item?.nickName}</Text>
          <Text style={{ color: appColor.darkgray }}>{item?.phone}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default PaymentScreen;
