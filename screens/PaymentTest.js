import {
  View,
  Text,
  Button,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { PayWithFlutterwave } from "flutterwave-react-native";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewTrans,
  addTransactionOffline,
} from "../store/actions/userActions";
import { appColor } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

// Object {
//   "status": "failed",
//   "transaction_id": "null",
//   "tx_ref": "MC-1650735248984",
// }

// https://api.flutterwave.com/v3/transfers

const PaymentTest = ({ route }) => {
  const [redirectData, setRedirectData] = useState(null);
  const [verifyData, setVerifyData] = useState(null);
  const [verified, setVerified] = useState(false);
  const [retryVerify, setRetryVerify] = useState(false);
  const [transferRes, setTransferRes] = useState(null);
  const [transferStatus, setTransferStatus] = useState(null);
  const [reciepentData, setReciepentData] = useState([]);
  const { remark, selectedMembers, userData, amount } = route.params;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userReducers.userData);
  const { navigate, goBack } = useNavigation();
  const amountToSend = amount * selectedMembers.length;
  const transData = useSelector((state) => state.userReducers.transactions);

  const paymentOptions = {
    tx_ref: `MC-${Date.now()}`,
    authorization: "FLWPUBK_TEST-10adddb232cce02041f3a81f94a5ac4b-X",
    customer: {
      email: userInfo[0].email,
    },
    amount: amountToSend,
    currency: "GHS",
    payment_options: "mobilemoneyghana",
  };

  useEffect(() => {}, []);

  //beneficiaries data
  useEffect(() => {
    selectedMembers.map((item) => {
      const data = {
        account_bank: "MTN",
        account_number: item.phone,
        amount: amount,
        narration: "New GHS momo transfer",
        currency: "GHS",
        reference: `momofr_${Date.now()}`,
        beneficiary_name: item.nickName,
      };
      setReciepentData(data);
    });
  }, []);

  // on redirect after payment
  const handleOnRedirect = (data) => {
    setRedirectData(data);
    if (data.status === "successful") {
      axios({
        method: "get",
        url: `https://api.flutterwave.com/v3/transactions/${data.transaction_id}/verify`,
        headers: {
          Authorization: "FLWSECK_TEST-47131ada4da99bdab2f40199eaa86cb9-X",
        },
      })
        .then((res) => {
          let data = res.data;
          let sendToTransData = {
            title: remark,
            groupName: userData.groupName,
            beneficiary: selectedMembers,
            paymentInfo: data,
          };
          if (
            res.data ===
            "upstream connect error or disconnect/reset before headers. reset reason: connection failure"
          ) {
            setVerified(false);
          }
          if (data.status === "success") {
            setVerifyData(sendToTransData);
            dispatch(addTransactionOffline(sendToTransData));
            setVerified(true);
          } else {
            setVerified(false);
          }
        })
        .catch((err) => {
          setTimeout(() => {
            setRetryVerify(true);
          }, 3000);
        });
    }
  };

  //retry verify
  useEffect(() => {
    if (retryVerify) {
      handleOnRedirect(redirectData);
    }
  }, [retryVerify]);

  //transfer
  useEffect(() => {
    if (verified) {
      // axios({
      //   method: "post",
      //   url: "https://api.flutterwave.com/v3/transfers",
      //   headers: {
      //     Authorization: "Bearer FLWSECK_TEST-47131ada4da99bdab2f40199eaa86cb9-X",
      //   },
      //   data: {
      //     account_bank: "044",
      //     account_number: "0690000040",
      //     amount: 5500,
      //     narration: "Akhlm Pstmn Trnsfr xx007",
      //     currency: "GHS",
      //     reference: `bc-${Date.now()}`,
      //     callback_url: "https://webhook.site/625519f4-342e-4ee4-a32f-16f3611e0dfd",
      //     debit_currency: "GHS",
      //   },
      // })
      //   .then((res) => {
      //     console.log("transfer ==> ", res.data);
      //     setTransferRes(res.data)
      //     setVerified(false);
      //   })
      //   .catch((err) => {
      //     console.log("transfer err ==> ", err);
      //   });

      // const dBdata = {
      //   groupName: userData.groupName ,
      //   id: userData.id,
      //   participants: userData.participants,
      //   transaction: verifyData
      // };
      const dBdata = {
        groupName: userData.groupName,
        id: userData.id,
        participants: userData.participants,
        transaction: transData,
      };

      dispatch(addNewTrans(dBdata));
      navigate('GroupsScreen')
      // axios({
      //   method: "post",
      //   url: "http://192.168.43.18:3001/transfer/momo",
      //   data: {
      //     title: remark,
      //     bulk_data: reciepentData,
      //   },
      // })
      //   .then((res) => {
      //     console.log("rn ==> sent ", res);
      //     setTransferStatus("Sent");
      //   })
      //   .catch((err) => {
      //     console.log("transfer errors 2 ==> ", err);
      //     setTransferStatus("pending");
      //   });
    }
  }, [verified]);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: appColor.white,
      }}
    >
      <View style={{ height: 50, justifyContent: "center" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
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
          <View style={{ flex: 2, alignItems: "center" }}></View>
          <View style={{ flex: 1, alignItems: "flex-end" }}></View>
        </View>
      </View>
      <ScrollView>
        <View style={{}}>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 9 }}>
              <View
                style={{
                  backgroundColor: appColor.white,
                  borderRadius: 5,
                  paddingVertical: 20,
                }}
              >
                <View
                  style={{
                    marginVertical: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: appColor.black,
                    }}
                  >
                    Remark
                  </Text>
                  <Text style={{ color: appColor.gray, fontSize: 16 }}>
                    {remark}
                  </Text>
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: appColor.black,
                      fontWeight: "bold",
                    }}
                  >
                    Amount
                  </Text>
                  <Text style={{ fontSize: 16, color: appColor.gray }}>
                    Ghc {amount.toFixed(2)}
                  </Text>
                </View>
                <View
                  style={{
                    marginVertical: 10,
                    // justifyContent: 'space-between',
                    // flexDirection: "row"
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: appColor.black,
                      fontWeight: "bold",
                    }}
                  >
                    Beneficiaries
                  </Text>
                  <View
                    style={{
                      marginTop: 10,
                    }}
                  >
                    {selectedMembers.map((item, index) => {
                      return (
                        <View
                          style={{
                            marginBottom: 10,
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                          key={index}
                        >
                          <Text>{item.nickName}</Text>
                          <Text style={{ fontSize: 16, color: appColor.gray }}>
                            {item.phone}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>

                <View style={{ marginBottom: 10 }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: appColor.black,
                      fontWeight: "bold",
                    }}
                  >
                    Your email address{" "}
                    <Text style={{ fontSize: 13, color: appColor.gray }}>
                      (your reciept will be sent to this address)
                    </Text>
                  </Text>
                  <Text style={{ fontSize: 16, color: appColor.gray }}>
                    {userInfo[0].email}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: appColor.black,
                    }}
                  >
                    Total Amount
                  </Text>
                  <Text style={{ fontSize: 16, color: appColor.gray }}>
                    Ghc {amountToSend.toFixed(2)}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 10,
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: appColor.black,
                    }}
                  >
                    Note
                  </Text>
                  <Text style={{ fontSize: 14, color: appColor.red }}>
                    Make sure beneficiary account number is an MTN mobile money
                    number
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <PayWithFlutterwave
                onRedirect={(data) => handleOnRedirect(data)}
                options={paymentOptions}
                customButton={(props) => (
                  <TouchableOpacity
                    style={{
                      backgroundColor: appColor.green,
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 5,
                    }}
                    onPress={props.onPress}
                    isBusy={props.isInitializing}
                    disabled={props.disabled}
                  >
                    <Text style={{ color: appColor.white }}>Pay</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PaymentTest;
