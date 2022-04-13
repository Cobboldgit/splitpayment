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
import {MaterialIcons} from "@expo/vector-icons/"
import { useNavigation } from "@react-navigation/native";

const TransactionDetailsScreen = () => {

  const {goBack, navigate} = useNavigation()

  return (
    <View style={{flex: 1 }}>
        <LinearGradient
        colors={[appColor.purple, appColor.lightBlue]}
        start={{ x: 0.6, y: 0.3 }}
        style={{ height: 50, justifyContent: "center" }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
        >
          <View style={{ flex: 1 }}>
            <TouchableOpacity
            onPress={() => goBack()}
            >
            <MaterialIcons name="arrow-back-ios" color={appColor.white} size={20}/>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: appColor.white }}>Codetrain</Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity onPress={() => alert("deleted")}>
            <MaterialIcons name="delete" size={20} color={appColor.white} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 16 }}
      >
        <View style={{ height: 100, justifyContent: "center", }}>
          <Text style={{fontSize: 18}}>2 Feb 2022</Text>
          <Text>10:16 PM</Text>
        </View>
        <View style={{ height: 80,}}>
          <View
            style={{
              backgroundColor: appColor.gray,
              padding: 5,
              marginVertical: 10,
            }}
          >
            <Text>HOW MUCH WAS PAYED?</Text>
          </View>
          <Text style={{fontSize: 18}}>Ghc 2000.00</Text>
        </View>
        <View style={{}}>
          <View
            style={{
              backgroundColor: appColor.gray,
              padding: 5,
              marginVertical: 10,
            }}
          >
            <Text>WHO RECIEVED?</Text>
          </View>
          <WhoRecievedList />
          <WhoRecievedList />
          <WhoRecievedList />
          <WhoRecievedList />
          <WhoRecievedList />
          <WhoRecievedList />
          <WhoRecievedList />
          <WhoRecievedList />
          <WhoRecievedList />
          <WhoRecievedList />
        </View>
      </ScrollView>
     
    </View>
  );
};

export default TransactionDetailsScreen;


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