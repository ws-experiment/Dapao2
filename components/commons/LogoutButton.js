import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Button,
} from "react-native";
import Colors from "../../constants/Colors";
import ClearButton from "./ClearButton";

const LogoutButton = (props) => {
  return (
    <View style={styles.button}>
      <ClearButton title="Log Out" danger onPress={props.onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    marginHorizontal: 10,
  },
});

export default LogoutButton;
