import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { appColor, icons } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../store/actions/contactsAction";
import AddedParticipant from "../components/AddedParticipant";
import { MaterialIcons, EvilIcons } from "@expo/vector-icons";
import {
  addParticipant,
  clearAddedParticipant,
  createGroup,
} from "../store/actions/userActions";
import { useNavigation } from "@react-navigation/native";
import ContactList from "../components/ContactList";

const AddGroupScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [focused, setFocused] = useState(false);
  const [addPart, setAddPart] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const { navigate, goBack } = useNavigation();
  const { participant } = useSelector((state) => state.userReducers);
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState("New group");
  const [nickName, setNickName] = useState("");
  const [phone, setPhone] = useState("");

  // animation value
  const addPartInputFadeIn = useRef(new Animated.Value(0)).current;
  const modalHeight = useRef(
    new Animated.Value(Dimensions.get("screen").height / 2)
  ).current;

  // show add participant input
  const handleShowAddPart = () => {
    setAddPart(true);
  };
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

  //change modal height
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

  // add participant
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

  // Create group
  const handleCreateGroup = () => {
    if (groupName) {
      let data = {
        groupName,
        participant,
      };
      dispatch(createGroup(data));
      dispatch(clearAddedParticipant());
      setPhone("");
      setNickName("");
      setSelectedItem(null);
      setGroupName("New group");
      navigate("Groups");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={{
        flex: 1,
        backgroundColor: appColor.white,
      }}
    >
      {/* modal */}
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
                    alignItems: "center"
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
                    width: "85%"
                  }}
                />
              </View>
              <ContactList handleSelectedItem={handleSelectedItem} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* header  */}
      <LinearGradient
        colors={[appColor.lightPink, appColor.lightBlue]}
        end={{ x: 0.7, y: 1.0 }}
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
              Create Group
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <TouchableOpacity onPress={handleCreateGroup}>
              <MaterialIcons name="done" size={20} color={appColor.white} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* body  */}
      <TouchableWithoutFeedback onPress={() => handleSubmitAddPart()}>
        <ScrollView showsVerticalScrollIndicator={false} style={{}}>
          <View
            style={{
              paddingHorizontal: 16,
              // height: Dimensions.get("window").height - 100,
            }}
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
                    focused || groupName ? appColor.lightPink : appColor.gray,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderRadius: 5,
                  height: 50,
                  paddingHorizontal: 20,
                  borderBottomWidth: 1,
                  fontSize: 16,
                }}
              />
            </View>

            {/* add participants  */}
            <View style={{ marginTop: 10 }}>
              {/* add participant header */}
              <View
                style={{
                  paddingVertical: 5,
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    color: appColor.black,
                    fontSize: 16,
                  }}
                >
                  Members
                </Text>
              </View>

              {/* add participant button  */}

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

              {/* add participant input  */}
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
            </View>

            {/* list added participant  */}
            <View style={{ marginBottom: 50 }}>
              <AddedParticipant />
            </View>
          </View>

          {/* create group button  */}
          {/* <View
            style={{
              paddingHorizontal: 16,
              marginBottom: 20,
            }}
          >
            <TouchableOpacity onPress={() => handleCreateGroup()}>
              <View
                style={{
                  backgroundColor: appColor.lightPink,
                  height: 50,
                  width: "100%",
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: appColor.white, fontSize: 16 }}>
                  Create Group
                </Text>
              </View>
            </TouchableOpacity>
          </View> */}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AddGroupScreen;
