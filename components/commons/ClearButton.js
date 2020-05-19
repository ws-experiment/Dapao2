import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";

const ClearButton = (props) => {
  return (
    <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
      <View
        style={
          props.disabled
            ? styles.disabledButton
            : props.danger
            ? styles.dangerButton
            : styles.button
        }
      >
        <Text
          style={[
            props.style,
            props.disabled
              ? styles.disabledText
              : props.danger
              ? styles.dangerText
              : styles.text,
          ]}
        >
          {props.title ? props.title : props.children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F7DCD7",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 30,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  dangerButton: {
    backgroundColor: "#E14545",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 30,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#808080",
    paddingVertical: 8,
    paddingHorizontal: 30,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  text: {
    alignSelf: "center",
    color: Colors.accent,
    fontSize: 18,
  },
  disabledText: {
    alignSelf: "center",
    color: "#E9D7D7",
    fontSize: 18,
  },
  dangerText: {
    alignSelf: "center",
    color: "#F2CBCB",
    fontSize: 18,
  },
});

export default ClearButton;
