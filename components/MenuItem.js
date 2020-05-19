import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

import Card from "./commons/Card";
import BoldText from "./commons/BoldText";
import RegText from "./commons/RegText";

const MenuItem = (props) => {
  return (
    <Card style={styles.card}>
      <TouchableOpacity disabled={props.disabled} style={styles.touchable} onPress={props.onPress}>
        <View>
          <Image source={{ uri: props.imageSource }} style={styles.image} />
          <View style={styles.details}>
            <View style={styles.detailTitleContainer}>
              <BoldText numberOfLines={1} style={styles.detailTitle}>{props.title}</BoldText>
            </View>
            <RegText style={styles.detailPrice}>
              RM {props.price.toFixed(2)}
            </RegText>
          </View>
          {props.children}
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 10,
    overflow: "hidden",
  },
  card: {
    height: 340,
    margin: 20,
  },
  image: {
    width: "100%",
    height: "65%",
  },
  details: {
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  detailTitleContainer: {
    width: "60%",
  },
  detailTitle: {
    fontSize: 20,
    marginVertical: 2,
  },
  detailPrice: {
    fontSize: 16,
    color: "#888",
  },
  buttonContainer: {
    height: "20%",
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});

export default MenuItem;
