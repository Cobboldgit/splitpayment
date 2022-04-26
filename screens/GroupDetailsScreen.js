import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { appColor, icons } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import Transactionslist from "../components/Transactionslist";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AppButton from "../components/AppButton";
import BlurViewNext from "../BlurBoxNew";
import { Success } from "../components/AleartBox";
import CheckBox from "../components/CheckBox";
import { useDispatch } from "react-redux";
import {
  addNewTrans,
  addTransactionOffline,
  clearAddedTransactions,
} from "../store/actions/userActions";

const GroupDetailsScreen = ({ route }) => {
  const item = route.params;
  const { goBack, navigate } = useNavigation();
  const [focused, setFocused] = useState("no");
  const [remark, setRemark] = useState("");
  const [amount, setAmount] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAddedTransactions());
    item?.transactions.forEach((item) => {
      dispatch(addTransactionOffline(item));
    });
  }, []);

  // get the last time data was sent to database
  let startDate = new Date(item?.timestamp);
  let currentDate = new Date(Date.now());
  let diffTime = Math.abs(currentDate.valueOf() - startDate.valueOf());
  let days = diffTime / (20 * 60 * 60 * 1000);
  let hours = (days % 1) * 24;
  let minutes = (hours % 1) * 60;
  let secs = (minutes % 1) * 60;
  [days, hours, minutes, secs] = [
    Math.floor(days),
    Math.floor(hours),
    Math.floor(minutes),
    Math.floor(secs),
  ];
  const syncedTime =
    days > 0
      ? `Synced ${days} days ago`
      : hours > 0
      ? `Synced ${hours} hours ago`
      : minutes > 0
      ? `Synced ${minutes} minutes ago`
      : secs > 0 && secs < 20
      ? `Synced now`
      : secs >= 20
      ? `Synced ${secs} seconds ago`
      : `not Synced`;

  // called when a list is checked
  const handleSelectedItem = (item) => {
    selectedMembers.push(item);
  };

  // called when a list is unchecked
  const handleUnchecked = (phone) => {
    const unCheck = selectedMembers.filter((item) => {
      return item?.phone !== phone;
    });
    setSelectedMembers(unCheck);
  };

  //open modal
  const handleOpenModal = () => {
    setModalVisible(!modalVisible);
  };

  // When transaction list is pressed
  const handleTransactionPressed = (item) => {
    navigate("TransactionDetails", item);
  };

  // process to pay
  const ToPaymentScreen = () => {
    if (remark && amount && selectedMembers) {
      let data = {
        remark,
        selectedMembers,
        userData: item,
        amount: +amount,
      };
      setModalVisible(!modalVisible);
      setAmount("");
      setRemark(""), setSelectedMembers([]);
      navigate("Payment", data);
    } else {
      alert("Remark, amount and beneficiary are required");
    }
  };

  // list participants to be check
  const renderParticipants = () => {
    return item?.participants.map((item, index) => {
      return (
        <View key={index}>
          <ListPart
            item={item}
            handleUnchecked={handleUnchecked}
            handleSelectedItem={handleSelectedItem}
          />
        </View>
      );
    });
  };

  // handle edit
  const handleEdit = () => {
    navigate("GroupSettings", item);
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
          <ScrollView>
            <View style={{ paddingHorizontal: 20, paddingVertical: 40 }}>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                  setSelectedMembers([]);
                  setRemark("");
                }}
              >
                <EvilIcons name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                // justifyContent: "space-between",
                // height: 165,
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  color: appColor.black,
                  fontSize: 16,
                  marginVertical: 10,
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
                  marginVertical: 10,
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
              {focused === "amount" ? (
                <View style={{ marginTop: 10 }}>
                  <Text style={{ color: appColor.red }}>
                    NB: The amount you enter will me multiple by the number of
                    beneficiaries you select from here.
                  </Text>
                </View>
              ) : (
                <View></View>
              )}
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
          </ScrollView>
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
              <TouchableOpacity onPress={() => ToPaymentScreen()}>
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

      <View style={{ height: 50, justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => goBack()}>
              <MaterialIcons
                name="arrow-back-ios"
                color={appColor.black}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 2, alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: appColor.black }}>
              GROUP DETAILS
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity onPress={handleEdit}>
              <MaterialIcons name="edit" size={20} color={appColor.black} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        style={{ marginHorizontal: 16, paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ======= CARD ======  */}
        <LinearGradient
          colors={[appColor.lightPink, appColor.lightBlue]}
          end={{ x: 0.7, y: 1.0 }}
          style={{
            height: 140,
            borderRadius: 10,
            padding: 16,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: appColor.white,
              }}
            >
              {item?.groupName}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={icons.user}
                style={{
                  tintColor: appColor.gray,
                  height: 16,
                  width: 16,
                  marginHorizontal: 5,
                }}
              />
              <Text
                style={{
                  color: appColor.white,
                  fontSize: 18,
                  fontWeight: "700",
                }}
              >
                {item?.participants?.length}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ color: appColor.gray, fontSize: 17 }}>
              Last payment
            </Text>
            <Text style={{ color: appColor.white, fontSize: 18 }}>Ghc 0</Text>
          </View>
        </LinearGradient>
        {/* ======= CARD END ======  */}

        {/*====== DATE HEADER =======  */}
        <View
          style={{
            marginTop: 20,
            marginBottom: 10,
            marginHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18 }}>TRANSACTIONS</Text>
          <Text>{syncedTime}</Text>
        </View>
        {/* ===== DATE HEADER END ====== */}

        {/* ======== TRANSACTIONS LISTING =======  */}
        <View>
          {item?.transactions?.length === 0 ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 200,
              }}
            >
              <Text style={{ color: appColor.darkgray, fontSize: 18 }}>
                no transactions
              </Text>
            </View>
          ) : (
            item?.transactions?.map((item, index) => {
              return (
                <View key={index}>
                  <Transactionslist
                    item={item}
                    onPress={() => handleTransactionPressed(item)}
                  />
                </View>
              );
            })
          )}
        </View>
        {/* ======== TRANSACTIONS LISTING END ========  */}
      </ScrollView>
      <View
        style={{
          width: Dimensions.get("screen").width,
          // backgroundColor: appColor.red,
          position: "absolute",
          top: Dimensions.get("screen").height - 100,
          zIndex: 999,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => handleOpenModal()}>
          <AppButton
            title={"Make a payment"}
            color={appColor.white}
            backgroundColor={{ start: appColor.green, end: appColor.green }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ListPart = ({ item, handleSelectedItem, handleUnchecked }) => {
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
            if (!isChecked) {
              handleSelectedItem(item);
            } else {
              handleUnchecked(item?.phone);
            }
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

export default GroupDetailsScreen;
