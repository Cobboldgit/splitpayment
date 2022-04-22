import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { appColor, icons } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import {
  addParticipant,
  clearAddedParticipant,
  deleteGroup,
  editGroup,
  editParticipant,
} from "../store/actions/userActions";
import AddedParticipant from "../components/AddedParticipant";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ContactList from "../components/ContactList";

const GroupSettingsScreen = ({ route }) => {
  const item = route.params;
  const dispatch = useDispatch();
  const { participant, transactions } = useSelector(
    (state) => state.userReducers
  );
  const [focused, setFocused] = useState(false);
  const { goBack, navigate } = useNavigation();
  const [groupName, setGroupName] = useState(item?.groupName);
  const [addPart, setAddPart] = useState(false);
  const [nickName, setNickName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const addPartInputFadeIn = useRef(new Animated.Value(0)).current;
  const modalHeight = useRef(
    new Animated.Value(Dimensions.get("screen").height / 2)
  ).current;

  useEffect(() => {
    dispatch(clearAddedParticipant());
    item.participants.forEach((item) => {
      dispatch(addParticipant(item));
    });
  }, []);

  useEffect(() => {
    if (addPart) {
      Animated.timing(addPartInputFadeIn, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(addPartInputFadeIn, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [addPart]);

  const handleShowAddPart = () => {
    setAddPart(true);
  };

  const handleModalHeight = () => {
    if (modalVisible) {
      Animated.timing(modalHeight, {
        toValue: Dimensions.get("screen").height / 2 + 200,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      modalHeight.setValue(Dimensions.get("screen").height / 2);
    }
  };

  // handle selected contact
  const handleSelectedItem = (item) => {
    setSelectedItem(item);
    setModalVisible(false);
    setNickName(item?.name);
    setPhone(item?.phoneNumber);
  };

  const handleSubmitAddPart = () => {
    if ((phone && nickName) || selectedItem) {
      let data = {
        nickName: nickName || selectedItem?.name,
        phone: phone || selectedItem?.phoneNumber,
      };
      dispatch(addParticipant(data));
      setAddPart(false);
      setNickName("");
      setPhone("");
      setSelectedItem(null);
    } else {
      setAddPart(false);
      setSelectedItem(null);
    }
  };
  const handleSave = () => {
    let data = {
      groupName,
      id: item?.id,
      participant,
      transactions,
    };
    dispatch(editGroup(data));
    dispatch(clearAddedParticipant());
    setPhone("");
    setNickName("");
    setSelectedItem(null);
    setGroupName("New group");
    goBack();
  };
  const handleDeleteGroup = () => {
    let id = item.id
    dispatch(deleteGroup(id));
    navigate("Groups")
  };

  return (
    <View
      style={{
        backgroundColor: appColor.white,
        flex: 1,
      }}
    >
      <Modal
        animated={true}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            setModalVisible(!modalVisible);
            modalHeight.setValue(Dimensions.get("screen").height / 2);
          }}
          style={{ flex: 1 }}
        >
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <View
              style={{
                backgroundColor: appColor.white,
                flex: 1,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  // alignItems: "center",,
                  paddingHorizontal: 20,

                  height: 100,
                }}
              >
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <MaterialIcons
                    name="arrow-back-ios"
                    size={24}
                    color={appColor.darkgray}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ paddingHorizontal: 20, flexDirection: "row" }}>
                <View
                  style={{
                    height: 50,
                    backgroundColor: appColor.white,
                    borderColor: appColor.gray,
                    borderLeftWidth: StyleSheet.hairlineWidth,
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                    borderTopWidth: StyleSheet.hairlineWidth,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    width: "15%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialIcons
                    name="search"
                    size={24}
                    color={appColor.darkgray}
                  />
                </View>
                <TextInput
                  placeholder="Search contact"
                  style={{
                    height: 50,
                    backgroundColor: appColor.white,
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                    borderTopWidth: StyleSheet.hairlineWidth,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderRightWidth: StyleSheet.hairlineWidth,
                    borderColor: appColor.gray,
                    width: "85%",
                  }}
                />
              </View>
              <ContactList handleSelectedItem={handleSelectedItem} />
            </View>
          </View>
        </TouchableWithoutFeedback>
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
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: appColor.black }}>
              Edit Group
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity onPress={handleSave}>
              <MaterialIcons name="done" size={20} color={appColor.black} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* group name  */}
        <View style={{ marginVertical: 10, paddingHorizontal: 16 }}>
          <View
            style={{
              // backgroundColor: appColor.lightGray,
              paddingVertical: 5,
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                color: appColor.black,
                fontSize: 16,
              }}
            >
              Group name
            </Text>
          </View>
          <TextInput
            value={groupName}
            onChangeText={(value) => setGroupName(value)}
            onFocus={(e) => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
            style={{
              // borderColor:
              //   focused || groupName ? appColor.black : appColor.gray,
              // borderWidth: StyleSheet.hairlineWidth,
              borderRadius: 5,
              height: 50,
              paddingHorizontal: 20,
              // borderBottomWidth: 1,
              fontSize: 16,
              backgroundColor: appColor.lighterPink,
              // shadowColor: "#000",
              // shadowOffset: {
              //   width: 0,
              //   height: 4,
              // },
              // shadowOpacity: 0,
              // shadowRadius: 4.65,
              // elevation: 8,
              color: appColor.inputText,
            }}
          />
        </View>

        {/* participants  */}
        <View style={{ marginBottom: 50, paddingHorizontal: 16 }}>
          <View
            style={{
              paddingVertical: 5,
              marginBottom: 5,
            }}
          >
            <Text style={{ fontSize: 16 }}>Members</Text>
          </View>
          <View
            style={{
              paddingBottom: 15,
              borderColor: appColor.lightPink,
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          >
            <TouchableOpacity
              onPress={() => handleShowAddPart()}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              {icons.add}
              <Text
                style={{
                  color: appColor.lightPink,
                  fontSize: 16,
                  marginLeft: 10,
                }}
              >
                Add Member
              </Text>
            </TouchableOpacity>
          </View>
          {addPart ? (
            <Animated.View style={{ opacity: addPartInputFadeIn }}>
              {/* participant nickname  */}
              <View style={{ marginVertical: 5 }}>
                <TextInput
                  value={nickName}
                  onChangeText={(value) => setNickName(value)}
                  returnKeyType="done"
                  returnKeyLabel="done"
                  placeholder="Type participant's nickname"
                  style={{
                    fontSize: 16,
                    backgroundColor: appColor.lighterPink,
                    color: appColor.inputText,
                    borderRadius: 5,
                    height: 50,
                    paddingHorizontal: 20,
                  }}
                />
              </View>

              {/* participant phone  */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginVertical: 5,
                }}
              >
                <TextInput
                  value={phone}
                  onChangeText={(value) => setPhone(value)}
                  returnKeyType="done"
                  returnKeyLabel="done"
                  placeholder="Type participant's phone"
                  keyboardType="number-pad"
                  style={{
                    fontSize: 16,
                    backgroundColor: appColor.lighterPink,
                    color: appColor.inputText,
                    height: 50,
                    paddingHorizontal: 20,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    flex: 9,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: appColor.lighterPink,
                    color: appColor.inputText,
                    height: 50,
                    paddingVertical: 7,
                    paddingHorizontal: 20,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    {icons.contact}
                  </TouchableOpacity>
                </View>
              </View>

              {/* button  */}
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() => handleSubmitAddPart()}
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: appColor.lightPink,
                    height: 50,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: appColor.white, fontSize: 16 }}>
                    Add participant
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          ) : null}
          <View>
            <AddedParticipant />
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: "absolute",
          transform: [{ translateY: Dimensions.get("window").height - 100 }],
          width: Dimensions.get("window").width,
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => handleDeleteGroup()}
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: 50,
            width: "100%",
            backgroundColor: appColor.red,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: appColor.white }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GroupSettingsScreen;
