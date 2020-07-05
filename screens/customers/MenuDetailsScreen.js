import React from "react";
import { StyleSheet, ScrollView, Image, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import TextReg from "../../components/commons/TextReg";

import Colors from "../../constants/Colors";
import { CURRENCY } from '../../constants/currency';

import * as cartActions from "../../stores/actions/CartAction";

const MenuDetailsScreen = (props) => {
  const menuId = props.navigation.getParam("menuId");
  const menuItemOfTheDay = useSelector(
    (state) => state.menus.menuItemsOfTheDay
  );
  const menuItem = menuItemOfTheDay.find((item) => item.id === menuId);

  const dispatch = useDispatch();
  const selectHandler = (menuItem) => {
    dispatch(cartActions.addCart(menuItem));
    props.navigation.navigate("MenuOverview");
  };

  return (
    <ScrollView>
      <Image source={{ uri: menuItem.imageUrl }} style={styles.image} />
      <Button
        color={Colors.primary}
        title="Add to Carts"
        onPress={() => selectHandler(menuItem)}
      />
      <TextReg style={styles.price}>{CURRENCY} {menuItem.price.toFixed(2)}</TextReg>
      <TextReg style={styles.description}>{menuItem.description}</TextReg>
    </ScrollView>
  );
};

MenuDetailsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("menuTitle"),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 22,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
  },
});

export default MenuDetailsScreen;
