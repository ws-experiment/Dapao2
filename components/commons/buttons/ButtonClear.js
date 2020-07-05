import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "../../../constants/Colors";
import Card from "../Card";

const ButtonClear = (props) => {
  return (
    <TouchableOpacity disabled={props.disabled} onPress={props.onPress}>
      <Card
        style={
          props.disabled
            ? styles.disabledButton
            : props.danger
            ? styles.dangerButton
            : props.safe 
            ? styles.safeButton
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
          {props.title.toUpperCase()}
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 30,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 10
  },
  safeButton: {
    backgroundColor: "#008000",
    paddingVertical: 8,
    paddingHorizontal: 30,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 10,
  },
  dangerButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 30,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 10
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
    color: "white",
    fontSize: 18,
  },
  disabledText: {
    alignSelf: "center",
    color: "#E9D7D7",
    fontSize: 18,
  },
  dangerText: {
    alignSelf: "center",
    color: "white",
    fontSize: 18,
  },
});

export default ButtonClear;
