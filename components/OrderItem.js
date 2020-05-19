import React from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

import Card from "./commons/Card";
import BoldText from "./commons/BoldText";
import RegText from "./commons/RegText";
import Colors from "../constants/Colors";
import CartItem from "./CartItem";

const OrderItem = (props) => {
  const sameDate =
    moment(new Date(), "MMM DD").format("MMM DD") === moment(props.date, "MMM DD").format("MMM DD");
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summaryContainer}>
        {props.name && (
          <View style={styles.userNameContainer}>
            <Ionicons
              name={Platform.OS === "android" ? "md-people" : "ios-people"}
              size={23}
              color={Colors.accent}
              style={{ marginRight: 10 }}
            />
            <RegText style={styles.userNameText}>{props.name} </RegText>
          </View>
        )}
        <View style={styles.item}>
          {props.cartItem.map((cartItem, index) => (
            <CartItem
              key={index}
              title={cartItem.menuTitle}
              price={cartItem.price}
              quantity={cartItem.quantity}
              sum={cartItem.sum}
            />
          ))}
        </View>
        <View
          style={sameDate ? styles.todaySummaryDetails : styles.summaryDetails}
        >
          <RegText style={styles.dateTimeText}>{props.date}</RegText>
          <BoldText style={styles.totalPriceText}>
            Total RM {props.totalPrice.toFixed(2)}
          </BoldText>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    flex: 1,
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  summaryContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  userNameContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  userNameText: {
    fontSize: 20,
  },
  summaryDetails: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: 50,
    backgroundColor: Colors.primary,
  },
  todaySummaryDetails: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: 50,
    backgroundColor: Colors.accent,
  },
  totalPriceText: {
    fontSize: 18,
    color: "white",
  },
  dateTimeText: {
    color: Colors.primary,
    fontSize: 16,
    color: "white",
  },
  item: {
    width: "100%",
  },
});

export default OrderItem;
