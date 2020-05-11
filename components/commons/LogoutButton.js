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

const LogoutButton = (props) => {
  return (
    <View style={styles.button}>
      <Button title="logout" color="red" onPress={props.onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
      justifyContent: "center",
      marginHorizontal: 10
  },
});

export default LogoutButton;
