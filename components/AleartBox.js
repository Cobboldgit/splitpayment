import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import icons from "../constants/icons";
import { useDispatch, useSelector } from "react-redux";
import { appColor } from "../constants";
import { alertError, deleteGroup, promptToConfirm } from "../store/actions/userActions";
import { useNavigation } from "@react-navigation/native";

const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const Success = ({ message }) => {
  const [visible, setVisible] = React.useState(paymentPending);
  const paymentPending = useSelector(
    (state) => state.userReducers.paymentPending
  );
  useEffect(() => {
    if (paymentPending) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [paymentPending]);
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ModalPoup visible={visible}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <EvilIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={icons.mark}
            style={{ height: 150, width: 150, marginVertical: 10 }}
          />
        </View>

        <Text style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}>
          {message}
        </Text>
      </ModalPoup>
    </View>
  );
};

const Prompt = ({ message, id }) => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation()
  const alertState = useSelector((state) => state.userReducers.alertError);
  const [visible, setVisible] = React.useState(alertState?.state);
  useEffect(() => {
    if (alertState?.state) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [alertState?.state]);
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ModalPoup visible={visible}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.header}>
            {/* <TouchableOpacity onPress={() => setVisible(false)}>
              <EvilIcons name="close" size={24} color="black" />
            </TouchableOpacity> */}
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={icons.error}
            style={{ height: 150, width: 150, marginVertical: 10 }}
          />
        </View>

        <Text style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}>
          {message}
        </Text>
        <View style={{ justifyContent: "space-around", flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => {
              dispatch(promptToConfirm(false));
              let close = {
                state: false,
                text: "",
              };
              dispatch(alertError(close));
            }}
            style={{}}
          >
            <Text style={{ fontSize: 16, color: appColor.black }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(deleteGroup(id));
              navigate("Groups");
              dispatch(promptToConfirm(true));
              let close = {
                state: false,
                text: "",
              };
              dispatch(alertError(close));
            }}
            style={{}}
          >
            <Text style={{ fontSize: 16, color: appColor.black }}>Ok</Text>
          </TouchableOpacity>
        </View>
      </ModalPoup>
    </View>
  );
};
const Error = () => {
  const alertState = useSelector((state) => state.userReducers.alertError);
  const [visible, setVisible] = React.useState(alertState?.state);
  useEffect(() => {
    if (alertState?.state) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [alertState?.state]);
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ModalPoup visible={visible}>
        <View style={{ alignItems: "center" }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <EvilIcons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Image
            source={icons.error}
            style={{ height: 150, width: 150, marginVertical: 10 }}
          />
        </View>

        <Text style={{ marginVertical: 30, fontSize: 20, textAlign: "center" }}>
          {alertState?.text}
        </Text>
      </ModalPoup>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: "100%",
    height: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export { Success, Error, Prompt };
