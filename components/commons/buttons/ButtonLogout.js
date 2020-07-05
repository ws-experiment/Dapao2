import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import ButtonClear from "../buttons/ButtonClear";

const ButtonLogout = (props) => {
  return (
    <View style={styles.button}>
      <ButtonClear title="Log Out" danger onPress={props.onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    marginHorizontal: 10,
  },
});

export default ButtonLogout;
