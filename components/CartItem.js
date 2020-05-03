import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";

import Card from "./commons/Card";
import BoldText from "./commons/BoldText";
import RegText from "./commons/RegText";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const CartItem = (props) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.titleContainer}>
        <RegText numberOfLines={1} style={styles.number}>{props.title}</RegText>
      </View>
      <RegText style={styles.number}>{props.price.toFixed(2)}</RegText>
      <View style={styles.quantityContainer}>
        <RegText style={styles.quantity}>x{props.quantity}</RegText>
      </View>
      <View style={styles.sumContainer}>
      <BoldText style={styles.number}>{props.sum.toFixed(2)}</BoldText>
      </View>
      {props.delete && (
        <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color="red"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 5,
    padding: 5,
  },
  titleContainer: {
    width: "40%",
  },
  number: {
    fontSize: 18,
  },
  quantityContainer: {
    borderWidth: 1,
    borderColor: Colors.accent,
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  quantity: {
    color: Colors.accent,
    fontSize: 20,
  },
  sumContainer: {
    width: "15%"
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default CartItem;
