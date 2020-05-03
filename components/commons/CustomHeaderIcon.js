import React from "react";
import { Platform, View, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../constants/Colors";

const CustomHeaderIcon = (props) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name={props.name}
        size={26}
        color={Platform.OS === "android" ? "white" : Colors.primary}
      />
      {props.badgeCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.text}>{props.badgeCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginRight: 20,
    marginTop: 5,
  },
  badge: {
    position: "absolute",
    right: 0,
    top: -3,
    backgroundColor: "red",
    borderRadius: 6,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
});

export default CustomHeaderIcon;
