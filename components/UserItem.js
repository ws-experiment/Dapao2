import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

import Card from "./commons/Card";
import TextBold from "./commons/TextBold";
import TextReg from "./commons/TextReg";
import { Ionicons } from "@expo/vector-icons";

const UserItem = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelectItem}>
      <Card style={styles.container}>
        <View style={styles.nameContainer}>
          <TextReg numberOfLines={1} style={styles.name}>
            {props.name}
          </TextReg>
        </View>
        <View style={styles.activeContainer}>
          <TextReg
            style={props.status == "Active" ? styles.greenText : styles.redText}
          >
            {props.status}
          </TextReg>
        </View>

        <View style={styles.balanceContainer}>
          <Ionicons
            name={Platform.OS === "android" ? "md-cash" : "ios-cash"}
            color="green"
            size={26}
            style={{ marginRight: 10 }}
          />
          <TextBold styles={styles.balance}>
            {props.balance.toFixed(2)}
          </TextBold>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
    height: 40,
  },
  nameContainer: {
    width: "50%"
  },  
  name: {
    fontSize: 14,
  },
  activeContainer: {
    width: "15%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  balanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginLeft: 10,
    width: "20%",
  },
  balance: {
    fontSize: 18,
  },
  redText: {
    color: "red",
  },
  greenText: {
    color: "green",
  },
});

export default UserItem;
