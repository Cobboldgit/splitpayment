import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addParticipant,
  deleteParticipant,
  editParticipant,
} from "../store/actions/userActions";
import { appColor } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import EditParticipantInput from "./EditParticipantInput";
import AppButton from "../components/AppButton";

const AddedParticipant = () => {
  const dispatch = useDispatch();
  const participant = useSelector((state) => state.userReducers.participant);
  const [modalVisible, setModalVisible] = useState(false);

  // console.log(participant);

  const handleDone = ({ nickName, phone }) => {
    let data = {
      nickName,
      phone,
    };
    dispatch(editParticipant(data));
    setModalVisible(!modalVisible);
  };

  const handleEdit = () => {
    setModalVisible(!modalVisible);
  };

  const handleDelete = (phone) => {
    dispatch(deleteParticipant(phone));
  };

  return (
    <View>
      {participant.map((item, index) => (
        <View
          key={index}
          style={{
            // borderColor: appColor.black,
            // borderBottomWidth: StyleSheet.hairlineWidth,
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 5,
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: appColor.black,
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottomWidth: 1
          }}
        >
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 16, color: appColor.lightPink }}>
                {item?.nickName}
              </Text>
            </View>
            <Text style={{ color: appColor.black }}>{item?.phone}</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity style={{marginRight: 10}} onPress={() => handleEdit()}>
              <MaterialIcons name="edit" color={appColor.lightPink} size={20} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item?.phone)}>
              <MaterialIcons name="delete" color={appColor.red} size={20} />
            </TouchableOpacity>
          </View>
          <Modal
            animated={true}
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <BlurView
              intensity={80}
              tint="dark"
              style={{ flex: 1, justifyContent: "flex-end" }}
            >
              <View
                style={{
                  backgroundColor: appColor.white,
                  height: Dimensions.get("screen").height / 2,
                  backgroundColor: appColor.white,
                  borderTopRightRadius: 20,
                  borderTopLeftRadius: 20,
                  // justifyContent: "center",
                  // alignItems: "center",
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
                <EditParticipantInput
                  nickName={item?.nickName}
                  phoneNumber={item?.phone}
                  handleDone={handleDone}
                />
              </View>
            </BlurView>
          </Modal>
        </View>
      ))}
    </View>
  );
};

export default AddedParticipant;
