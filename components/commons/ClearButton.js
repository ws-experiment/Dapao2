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
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={{...styles.text, ...props.style}}>
          {props.title ? props.title : props.children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
  text: {
    alignSelf: "center",
    color: Colors.accent,
    fontSize: 18,
  },
});

export default ClearButton;
