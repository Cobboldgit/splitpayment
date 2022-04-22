import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { appColor, icons } from "../constants";
import { LinearGradient } from "expo-linear-gradient";
import Transactionslist from "../components/Transactionslist";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AppButton from "../components/AppButton";

const GroupDetailsScreen = ({ route }) => {
  const item = route.params;
  const { goBack, navigate } = useNavigation();
  
  

  const handleTransactionPressed = () => {
    navigate("TransactionDetails");
  };

  // handle edit
  const handleEdit = () => {
    navigate("GroupSettings", item);
  };

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
          <Text>Synced 2 minutes ago</Text>
        </View>
        {/* ===== DATE HEADER END ====== */}

        {/* ======== TRANSACTIONS LISTING =======  */}
        <View>
          {true ? (
            <View
              style={{ justifyContent: "center", alignItems: "center", height: 200 }}
            >
              <Text style={{color: appColor.darkgray, fontSize: 18}}>no transactions</Text>
            </View>
          ) : (
            item?.transactions?.map((item, index) => {
              return (
                <Transactionslist
                  item={item}
                  onPress={() => handleTransactionPressed()}
                />
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
        <TouchableOpacity onPress={() => navigate("Payment", item)}>
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

export default GroupDetailsScreen;
