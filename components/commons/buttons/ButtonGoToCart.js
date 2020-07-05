import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { CURRENCY } from "../../../constants/currency";
import TextBold from "../TextBold";
import TextReg from "../TextReg";

const ButtonGoToCart = (props) => {
  return (
    <View style={{...props.style, ...styles.buttonContainer}}>
      <TouchableOpacity onPress={props.clicked}>
        <View style={styles.button}>
          <TextReg style={styles.text}>VIEW CART</TextReg>
          <TextReg style={styles.text}>{props.itemCount} items</TextReg>
          <TextBold style={styles.text}>
            {CURRENCY} {props.totalPrice}
          </TextBold>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 5,
    shadowRadius: 2,
    shadowOffset:{
        width: 0,
        height: -1
    },
    shadowColor: '#000000',
    elevation: 1,
  },
  button: {
    backgroundColor: "#008000",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    margin: 15,
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});

export default ButtonGoToCart;
