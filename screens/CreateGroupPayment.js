import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const CreateGroupPayment = () => {
  const [title, setTitle] = useState("");
  return (
    <View style={{ flex: 1 }}>
      <TextInput
        value={title}
        onChangeText={(value) => setTitle(value)}
        style={{ height: 40, backgroundColor: "gray" }}
      />
    </View>
  );
};

export default CreateGroupPayment;
