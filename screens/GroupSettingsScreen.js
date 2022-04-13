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
  const { participant } = useSelector((state) => state.userReducers);
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
    };
    dispatch(editGroup(data));
    dispatch(clearAddedParticipant());
    setPhone("");
    setNickName("");
    setSelectedItem(null);
    setGroupName("New group");
    goBack();
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
            <Animated.View
              style={{
                height: modalHeight,
                backgroundColor: appColor.white,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                overflow: "hidden",
                shadowColor: appColor.black,
                shadowOpacity: 0.35,
                shadowOffset: {
                  height: -4,
                  width: 0,
                },
                shadowRadius: 5,
                elevation: 10,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: 40,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    modalHeight.setValue(Dimensions.get("screen").height / 2);
                  }}
                >
                  <View style={{ height: "100%", justifyContent: "center" }}>
                    <View
                      style={{
                        height: 4,
                        width: 50,
                        backgroundColor: appColor.gray,
                        borderRadius: 3,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <ContactList
                handleSelectedItem={handleSelectedItem}
                onScrollBegin={() => handleModalHeight()}
              />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
            <TouchableOpacity onPress={() => goBack()}>
              <MaterialIcons
                name="arrow-back-ios"
                color={appColor.white}
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ fontSize: 18, color: appColor.white }}>
              Edit Group
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity onPress={handleSave}>
              <MaterialIcons name="done" size={20} color={appColor.white} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
      <ScrollView
        style={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* group name  */}
        <View style={{ marginVertical: 10 }}>
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
              borderColor:
                focused || groupName ? appColor.purple : appColor.gray,
              borderWidth: StyleSheet.hairlineWidth,
              borderRadius: 5,
              height: 50,
              paddingHorizontal: 20,
              borderBottomWidth: 1,
              fontSize: 16,
            }}
          />
        </View>

        {/* participants  */}
        <View style={{ marginBottom: 50 }}>
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
              borderColor: appColor.purple,
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
                  color: appColor.purple,
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
                    borderBottomColor: appColor.black,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    color: appColor.black,
                    fontSize: 16,
                    paddingVertical: 5,
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
                    borderBottomColor: appColor.black,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    color: appColor.black,
                    fontSize: 16,
                    paddingVertical: 5,
                    flex: 9,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    marginLeft: 10,
                    paddingVertical: 7,
                    alignItems: "center",
                    borderBottomColor: appColor.black,
                    borderBottomWidth: StyleSheet.hairlineWidth,
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
                    backgroundColor: appColor.purple,
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
          <AddedParticipant />
        </View>
      </ScrollView>

      {/* <View
        style={{
          height: 150,
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          width: Dimensions.get("screen").width - 30,
          transform: [{ translateY: Dimensions.get("window").height - 150 }],
          backgroundColor: appColor.white,
          zIndex: 999,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => alert("Transaction Deleted")}
          style={{
            backgroundColor: appColor.purple,
            borderRadius: 5,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            margin: 2,
          }}
        >
          <Text style={{ color: appColor.white }}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert("Transaction Deleted")}
          style={{
            backgroundColor: appColor.red,
            borderRadius: 5,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            margin: 2,
          }}
        >
          <Text style={{ color: appColor.white }}>Delete</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default GroupSettingsScreen;
