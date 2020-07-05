import React, { useEffect, useCallback, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import Card from "../../components/commons/Card";
import TextReg from "../../components/commons/TextReg";
import TextBold from "../../components/commons/TextBold";
import Colors from "../../constants/Colors";
import ButtonOrderNow from "../../components/commons/buttons/ButtonOrderNow";
import CartItem from "../../components/CartItem";

import * as cartActions from "../../stores/actions/CartAction";
import * as orderActions from "../../stores/actions/OrderAction";
import * as userActions from "../../stores/actions/UserAction";

import defaultStyles from "../../constants/defaultStyles";
import { CURRENCY } from "../../constants/currency";

const CartScreen = (props) => {
  //#region states
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalPrice = useSelector((state) => state.cart.totalAmount);
  const currentUser = useSelector((state) => state.user.currentUser);
  const [isLoading, setIsLoading] = useState(false);

  //#endregion states

  const dispatch = useDispatch();

  const loadCurrentUser = useCallback(async() => {
    console.log("loadCurrentUser");
    setIsLoading(true);
    await dispatch(userActions.setCurrentUser()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  /**
   * No need another useEffect to fetchUser because have been fetched during login
  */
   useLayoutEffect(()=>{
    const focusSub = props.navigation.addListener("willFocus", loadCurrentUser);
    return () => {
      focusSub.remove();
    };
  },[loadCurrentUser]);

  //#region handlers
  const sendOrderHandler = () => {
    if (currentUser.balance < totalPrice) {
      Alert.alert(
        "Invalid Order",
        "Your balance is insufficient. Please contact admin for top-up.",
        [{ text: "Okay", style: "destructive" }]
      );
      return;
    }
    dispatch(orderActions.addOrder(cartItems, totalPrice, currentUser.name));
    dispatch(userActions.deductBalance(totalPrice));
    props.navigation.goBack();
  };

  const removeCartHandler = (itemId) => {
    dispatch(cartActions.removeFromCart(itemId));
  };
  //#endregion handlers

  if (isLoading) {
    return (
      <View style={defaultStyles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.cardContainer}>
        <TextReg style={styles.total}>Total: </TextReg>
        <TextBold style={styles.price}>{CURRENCY} {totalPrice.toFixed(2)}</TextBold>
        <ButtonOrderNow
          title="ORDER NOW"
          disabled={cartItems.length === 0}
          onPress={sendOrderHandler}
        />
      </Card>
      <View style={styles.flatList}>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <CartItem
              title={itemData.item.menuTitle}
              price={itemData.item.price}
              quantity={itemData.item.quantity}
              sum={itemData.item.sum}
              delete
              onRemove={removeCartHandler.bind(this, itemData.item.id)}
            />
          )}
        />
      </View>
      <View style={styles.balanceContainer}>
        <TextReg style={styles.balanceTitle}>Remaining Balance</TextReg>
        <Card style={styles.cardContainer}>
          <Ionicons
            name={Platform.OS === "android" ? "md-cash" : "ios-cash"}
            color="green"
            size={26}
            style={{ marginLeft: 10 }}
          />
          <TextBold style={styles.balance}>
            {CURRENCY} {currentUser.balance.toFixed(2)}
          </TextBold>
        </Card>
      </View>
    </View>
  );
};

CartScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "My Cart",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "stretch",
    margin: 20,
  },

  total: {
    marginLeft: 10,
  },
  price: {
    fontSize: 20,
    color: Colors.primary,
  },
  balanceTitle: {
    padding: 10,
    margin: 5,
  },
  balance: {
    fontSize: 20,
  },
  flatList: {
    height: "70%",
    marginTop: 10
  },
  balanceContainer: {
    height: "100%",
  },
  cardContainer: {
    height: "10%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default CartScreen;
