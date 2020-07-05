import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import Colors from "../../../constants/Colors";

const ButtonOrderNow = (props) => {
  return (
    <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
      <View style={styles.button}>
        <Text
          style={
            props.disabled
              ? { ...styles.disabledText, ...props.style }
              : { ...styles.text, ...props.style }
          }
        >
          {props.title ? props.title : props.children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
  text: {
    alignSelf: "center",
    color: Colors.accent,
    fontSize: 14,
  },
  disabledText: {
    alignSelf: "center",
    color: "#888",
    fontSize: 14,
  },
});

export default ButtonOrderNow;
