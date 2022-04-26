import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { appColor, icons } from "../constants";
import WhoRecievedList from "../components/WhoRecievedList";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons/";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const TransactionDetailsScreen = () => {
  const { goBack, navigate } = useNavigation();
  const route = useRoute();
  const item = route.params;

  const Newtime = new Date(
    item?.paymentInfo?.data?.created_at
  ).toLocaleTimeString();
  const time = Newtime.split(":");
  const hour = time[0];
  const minute = time[1];
  const period = hour > 12 ? "PM" : "AM";
  const dateStr = `${hour}: ${minute} ${period}`;

  const Newdate = new Date(item?.paymentInfo?.data?.created_at).toDateString();
  const date = Newdate.split(" ");
  const day = date[0];
  const month = date[1];
  const dayNum = date[2];
  const year = date[3];
  const finalDate = `${dayNum} ${month} ${year}`;

  return (
    <View style={{ flex: 1, backgroundColor: appColor.white }}>
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
          <View style={{ flex: 1, alignItems: "center" }}>
            {/* <Text style={{ fontSize: 18, color: appColor.black }}>Codetrain</Text> */}
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            {/* <TouchableOpacity onPress={() => alert("deleted")}>
            <MaterialIcons name="delete" size={20} color={appColor.black} />
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 16 }}
      >
        <View
          style={{
            height: 100,
            borderBottomColor: appColor.gray,
            borderBottomWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 24 }}>
            Ghc {item?.paymentInfo?.data?.amount_settled.toFixed(2)}
          </Text>
          <Text style={{ fontSize: 24 }}>
            {item?.title}
          </Text>
        </View>
        {/* date  */}
        <View
          style={{
            justifyContent: "space-between",
            paddingVertical: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={{ color: appColor.black, fontSize: 16 }}>Date</Text>
          </View>
          <View>
            <Text style={{ color: appColor.darkgray, fontSize: 16 }}>
              {finalDate} - {dateStr}
            </Text>
          </View>
        </View>

        {/* transaction fee  */}
        <View
          style={{
            justifyContent: "space-between",
            paddingVertical: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                color: appColor.black,
                fontSize: 16,
              }}
            >
              Transaction Fee
            </Text>
          </View>
          <Text style={{ fontSize: 16, color: appColor.darkgray }}>
            Ghc {item?.paymentInfo?.data?.app_fee.toFixed(2)}
          </Text>
        </View>

        
        {/* each beneficiary */}
        <View
          style={{
            justifyContent: "space-between",
            paddingVertical: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                color: appColor.black,
                fontSize: 16,
              }}
            >
              Amount per beneficiary
            </Text>
          </View>
          <Text style={{ fontSize: 16, color: appColor.darkgray }}>
            Ghc {(item?.paymentInfo?.data?.amount_settled / item?.beneficiary.length).toFixed(2)}
          </Text>
        </View>

        {/* payment METHOD  */}
        <View
          style={{
            justifyContent: "space-between",
            paddingVertical: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                color: appColor.black,
                fontSize: 16,
              }}
            >
              Payment Method
            </Text>
          </View>
          <Text style={{ fontSize: 16, color: appColor.darkgray }}>
            {item?.paymentInfo?.data?.payment_type}
          </Text>
        </View>

        {/* status  */}
        <View
          style={{
            justifyContent: "space-between",
            paddingVertical: 20,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                color: appColor.black,
                fontSize: 16,
              }}
            >
              Status
            </Text>
          </View>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            {item?.paymentInfo?.status === "success" ? (
              <View
                style={{
                  height: 6,
                  width: 6,
                  borderRadius: 6,
                  backgroundColor: appColor.green,
                  margin: 3
                }}
              />
            ) : (
              <View
                style={{
                  height: 6,
                  width: 6,
                  borderRadius: 6,
                  backgroundColor: appColor.red,
                  margin: 3
                }}
              />
            )}
            <Text style={{ fontSize: 16, color: appColor.darkgray }}>
              {item?.paymentInfo?.status === 'success' ? "completed": "pending"}
            </Text>
          </View>
        </View>

        {/* beneficiaries */}
        <View
          style={{
            paddingVertical: 10,
          }}
        >
          <View>
            <Text
              style={{
                color: appColor.black,
                fontSize: 16,
              }}
            >
              Beneficiaries
            </Text>
          </View>
          <View>
            {item?.beneficiary.map((item, index) => {
              return (
                <View key={index}>
                  <WhoRecievedList name={item.nickName} phone={item.phone} />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TransactionDetailsScreen;

// {/* card  */}
// {item?.paymentInfo?.data?.payment_type === "card" ? (
//   <View
//     style={{

//     }}
//   >

//     <View style={{}}>
//       <Text
//         style={{
//           color: appColor.black,
//           fontSize: 16,
//         }}
//       >
//         CARD
//       </Text>
//     </View>

//     <View style={{ flexDirection: "row" }}>
//       <View style={{ flex: 1 }}>
//         <AntDesign
//           name="creditcard"
//           size={24}
//           color={appColor.lightPink}
//         />
//       </View>
//       <View style={{ flex: 9 }}>
//         <Text style={{ color: appColor.black }}>
//           {item?.paymentInfo?.data?.card?.type}
//         </Text>
//         <Text style={{ color: appColor.gray }}>
//           *** {item?.paymentInfo?.data?.card?.last_4digits}{" "}
//           {item?.paymentInfo?.data?.card?.issuer}
//         </Text>
//       </View>
//     </View>
//   </View>
// ) : null}

// <View
// style={{
//   height: 150,
//   justifyContent: "center",
//   position: "absolute",
//   width: Dimensions.get("screen").width,
//   transform: [{ translateY: Dimensions.get("screen").height - 150 }],
//   backgroundColor: appColor.transparent,
//   zIndex: 999,
//   paddingHorizontal: 16
// }}
// >
// <TouchableOpacity
//   onPress={() => alert("Transaction Deleted")}
//   style={{
//     backgroundColor: appColor.red,
//     borderRadius: 5,
//     height: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   }}
// >
//   <Text style={{ color: appColor.white }}>Delete</Text>
// </TouchableOpacity>
// </View>
